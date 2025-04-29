package handlers

import (
	"errors"
	"log"
	"net/http"
	"strconv"

	auth "github.com/batmanboxer/chatapp/api/features/authentication"
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

	token := r.URL.Query().Get("token")
	if token == "" {
		http.Error(w, "JWT token is required", http.StatusUnauthorized)
		return nil
	}
	userId, err := auth.ValidateJwt(token)
	if err != nil {
		http.Error(w, "Invalid JWT", http.StatusUnauthorized)
		return nil
	}

	_, err = h.AuthManager.AuthGetUserById(userId)
	if err != nil {
		http.Error(w, "User Account Is Deleted By Admin", http.StatusUnauthorized)
		return nil
	}

	vars := mux.Vars(r)
	chatroomId := vars["id"]

	userUuid, err := uuid.Parse(userId)
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

	h.ChatManager.WebsocketAddClient(conn, chatroomId, userId)
	return nil
}
