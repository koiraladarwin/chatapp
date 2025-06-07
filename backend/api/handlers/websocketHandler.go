package handlers

import (
	auth "github.com/batmanboxer/chatapp/api/features/authentication"
	"github.com/gorilla/websocket"
	"net/http"
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

	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		return err
	}

	h.ChatManager.WebsocketAddClient(conn, userId)
	return nil
}
