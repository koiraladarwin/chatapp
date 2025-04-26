package handlers

import (
	"errors"
	"log"
	"net/http"
	"strconv"

	"github.com/batmanboxer/chatapp/common"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (h *Handlers) WebsocketHandler(w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	chatroomId := vars["id"]
	userId := r.Context().Value(common.CONTEXTUSERIDKEY)
	stringUserId, ok := userId.(string)

	if !ok {
		return errors.New("User Id Invalid")
	}

	userUuid, err := uuid.Parse(stringUserId)
	if err != nil {
		return errors.New("User Id Invalid")
	}

	roomId, err := strconv.Atoi(chatroomId)

	if err != nil {
		log.Println("Invalid Room id")
		return errors.New("Invalid Room Id")
	}

	exists := h.ChatManager.CheckChatRoomExists(userUuid, roomId)

	if !exists {
		return errors.New("Wrong ChatRoom Id Number")
	}

	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		return err
	}

	h.ChatManager.WebsocketAddClient(conn, chatroomId, stringUserId)
	return nil
}
