package handlers

import (
	"log"
	"net/http"
	auth "github.com/batmanboxer/chatapp/api/features/authentication"
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

	userID, err := auth.ValidateJwt(token)
  log.Print("jwt userId")
  log.Println(userID)

	if err != nil {
		http.Error(w, "Invalid JWT", http.StatusUnauthorized)
		return nil
	}

  user, err := h.AuthManager.AuthGetUserById(userID)
	if err != nil {
		http.Error(w, "User Account Is Deleted By Admin", http.StatusUnauthorized)
		return nil
	}

	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		return err
	}
  log.Print("userid from handler: ")
  log.Println(user.ID)
	h.ChatManager.WebsocketAddClient(conn, user.ID.String())
	return nil
}
