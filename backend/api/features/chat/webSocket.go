package chat

import (
	"fmt"
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
	Clients     map[string][]*models.Client
	Mutex       sync.RWMutex
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (h *WebSocketManager) addClient(chatRoomId string, client *models.Client) {
	h.Mutex.Lock()
	h.Mutex.Unlock()

	h.Clients[chatRoomId] = append((h.Clients[chatRoomId]), client)

	go h.deliverMessage(client)
	go h.listenMessage(chatRoomId, client)
	go h.sendPingLoop(client)

}

//not sure if i want this to be seprete or in websocket
// func (h *WebSocketManager) initialMessage(chatRoomId string, client *models.Client, limit int) {
// 	messages, err := h.ChatStorage.GetMessages(chatRoomId, limit, 0)
// 	if err != nil {
// 		return
// 	}
// 	for _, message := range messages {
// 		client.Messagech <- message.Message
// 	}
// }

func (h *WebSocketManager) removeClient(chatRoomId string, userId string) {
	h.Mutex.Lock()
	defer h.Mutex.Unlock()

	clients, ok := h.Clients[chatRoomId]
	if !ok {
		return
	}

	var updatedClients []*models.Client
	for _, client := range clients {
		if client.Id != userId {
			updatedClients = append(updatedClients, client)
		} else {
			if client.Messagech != nil {
				close(client.Messagech)
			}
		}
	}

	if len(updatedClients) == 0 {
		delete(h.Clients, chatRoomId)
	} else {
		h.Clients[chatRoomId] = updatedClients
	}
}

func (h *WebSocketManager) listenMessage(roomId string, client *models.Client) {
	for {
		messageType, p, err := client.Conn.ReadMessage()
		if err != nil {
			client.Closech <- struct{}{}
			break
		}

		if messageType != websocket.BinaryMessage {
			continue
		}

		//add protobuf here and yeah messagetype should be binary
		// message := models.Message{}
		// err = json.Unmarshal(p,&message)
		// if err != nil{
		//   client.Closech<-struct{}{}
		//   break
		// }

		protoMessage := protomodels.ChatMessage{}
		err = proto.Unmarshal(p, &protoMessage)

		if err != nil {
			log.Println(err.Error())
			return
		}

		message := models.MessageModel{
			RoomId:   roomId,
			Text:     protoMessage.Content,
			SenderId: client.Id,
		}

		err = h.ChatStorage.AddMessage(message)

		if err != nil {
			log.Println(err.Error())
			return
		}

		h.broadcastMessage(roomId,protoMessage.Content, client)
	}
}

func (h *WebSocketManager) broadcastMessage(roomId string, text string, client *models.Client) {
	h.Mutex.RLock()
	defer h.Mutex.RUnlock()

	clients, ok := h.Clients[roomId]
	if !ok {
		return
	}

	message := models.MessageModel{
		RoomId:   roomId,
		Text:     text,
		SenderId: client.Id,
	}

	for _, client := range clients {
		if client.Messagech != nil {
			client.Messagech <- message
		}
	}

}

func (h *WebSocketManager) deliverMessage(client *models.Client) {

	for message := range client.Messagech {
		sendMessageSchema := &protomodels.ChatMessage{
			Type:      protomodels.MessageType_TEXT,
			Content:   message.Text,
			UserId:    message.SenderId,
			Timestamp: message.CreatedAt.Unix(),
		}

		sendMessage, err := proto.Marshal(sendMessageSchema)

		log.Println("sennding message")
		if err != nil {
			log.Println("unable to marshal protocol buffer")
			continue
		}

		err = client.Conn.WriteMessage(websocket.BinaryMessage, []byte(sendMessage))
		if err != nil {
			fmt.Println("Error sending message to client", client.Messagech, err)
			return
		}
	}

}

func (h *WebSocketManager) sendPingLoop(client *models.Client) {

	client.Conn.SetPongHandler(func(appData string) error {
		log.Println("Pong received")
		return nil
	})

	ticker := time.NewTicker(30 * time.Second)
	defer ticker.Stop()

	for {
		log.Println("Sending ping")

		err := client.Conn.WriteMessage(websocket.PingMessage, []byte("ping"))
		if err != nil {
			log.Println("Ping failed:", err)
			client.Closech <- struct{}{}
			return
		}

		<-ticker.C
	}
}

func (h *WebSocketManager) WebsocketAddClient(conn *websocket.Conn, chatRoomId string, stringUserId string) {

	client := &models.Client{
		Id:        stringUserId,
		Conn:      conn,
		Messagech: make(chan models.MessageModel),
		Closech:   make(chan struct{}),
	}

	h.addClient(chatRoomId, client)

	<-client.Closech
	conn.Close()
	h.removeClient(chatRoomId, stringUserId)
}
