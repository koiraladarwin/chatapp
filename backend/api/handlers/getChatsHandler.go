package handlers

import (
	"log"
	"net/http"

	"github.com/batmanboxer/chatapp/common"
	"github.com/batmanboxer/chatapp/internal/utils"
	"github.com/google/uuid"
)

func (h *Handlers) GetChatsHandler(w http.ResponseWriter, r *http.Request) error {
	chatRoom := r.URL.Query().Get("roomid")
	if chatRoom == "" {
		http.Error(w, "send some query dude .what query you ask?. read the damn code and if you dont have code good luck.", http.StatusBadRequest)
	}

	userId := r.Context().Value(common.CONTEXTUSERIDKEY)
	stringUserId, ok := userId.(string)

	if !ok {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}

	uuidUserId, err := uuid.Parse(stringUserId)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}
    
  log.Print("i am batmaan and i got here")
	chatRooms, err := h.ChatManager.GetChatsByChatRoom(uuidUserId, chatRoom)
	if err != nil   {
		return err
	}
  

	utils.WriteJson(w, chatRooms)

	return nil
}
