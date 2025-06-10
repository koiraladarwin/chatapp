package chat

import (
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/batmanboxer/chatapp/models"
	"github.com/batmanboxer/chatapp/protomodels"
	"github.com/gorilla/websocket"
	"google.golang.org/protobuf/proto"
)

type WebSocketManager struct {
	ChatStorage ChatStorage
	Clients     map[string]*models.Client
	Mutex       sync.RWMutex
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (h *WebSocketManager) WebsocketAddClient(conn *websocket.Conn, stringUserId string) {
	client := &models.Client{
		Id:        stringUserId,
		Conn:      conn,
		Messagech: make(chan models.MessageModel),
		Closech:   make(chan struct{}),
	}

	h.addClient(client)
	<-client.Closech
	conn.Close()
	h.removeClient(client)
}

func (h *WebSocketManager) addClient(client *models.Client) {
	h.Mutex.Lock()
	h.Mutex.Unlock()

	h.Clients[client.Id] = client

	go h.deliverMessage(client)
	go h.listenMessage(client)
	go h.sendPingLoop(client)

}

func (h *WebSocketManager) removeClient(client *models.Client) {
	h.Mutex.Lock()
	defer h.Mutex.Unlock()

	client, ok := h.Clients[client.Id]

	if !ok {
		return
	}

	delete(h.Clients, client.Id)
}

func (h *WebSocketManager) listenMessage(client *models.Client) {
	for {
		log.Print("got a message")
		messageType, p, err := client.Conn.ReadMessage()
		if err != nil {
			log.Print(err)
			client.Closech <- struct{}{}
			break
		}

		if messageType != websocket.BinaryMessage {
			continue
		}

		protoMessage := protomodels.ChatMessage{}
		err = proto.Unmarshal(p, &protoMessage)

		if err != nil {
			return
		}

		//validate if rooom id is valid and that user is in thier

		message := models.MessageModel{
			RoomId:   protoMessage.RoomId,
			Text:     protoMessage.Content,
			SenderId: client.Id,
		}
    
		err = h.ChatStorage.AddMessage(message)
		if err != nil {
			return
		}

		h.broadcastMessage(message.RoomId, message.Text, client)
	}
}

func (h *WebSocketManager) broadcastMessage(roomId string, text string, senderClient *models.Client) {
	clients, err := h.ChatStorage.GetUserIDsByChatRoomID(roomId)
	if err != nil {
		return
	}

	message := models.MessageModel{
		RoomId:   roomId,
		Text:     text,
		SenderId: senderClient.Id,
	}

	for _, userID := range clients {
		c, ok := h.Clients[userID]
		if !ok {
			log.Print("not ok")
			continue
		}
		if c.Messagech != nil {
			c.Messagech <- message
		}
	}
}
func (h *WebSocketManager) deliverMessage(client *models.Client) {

	for message := range client.Messagech {
		sendMessageSchema := &protomodels.ChatMessage{
			RoomId:    message.RoomId,
			Type:      protomodels.MessageType_TEXT,
			Content:   message.Text,
			UserId:    message.SenderId,
			Timestamp: message.CreatedAt.Unix(),
		}
		sendMessage, err := proto.Marshal(sendMessageSchema)

		if err != nil {
			continue
		}
    log.Print(sendMessage)
		err = client.Conn.WriteMessage(websocket.BinaryMessage, []byte(sendMessage))
		if err != nil {
			client.Closech <- struct{}{}
			return
		}
	}

}

func (h *WebSocketManager) sendPingLoop(client *models.Client) {

	client.Conn.SetPongHandler(func(appData string) error {
		return nil
	})

	ticker := time.NewTicker(30 * time.Second)
	defer ticker.Stop()

	for {
		err := client.Conn.WriteMessage(websocket.PingMessage, []byte("ping"))
		if err != nil {
			client.Closech <- struct{}{}
			return
		}

		<-ticker.C
	}
}
