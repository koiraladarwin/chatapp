package handlers

import (
	"net/http"
	"time"

	"github.com/batmanboxer/chatapp/common"
	"github.com/batmanboxer/chatapp/internal/utils"
	"github.com/batmanboxer/chatapp/protomodels"
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

	messages, err := h.ChatManager.GetChatsByChatRoom(uuidUserId, chatRoom)
  
	responseMessages := protomodels.MessageModelList{}
	for _, room := range messages {
    
		responseMessages.MessageModels = append(responseMessages.MessageModels, &protomodels.MessageModel{
			Id:        room.Id,
      SenderId: room.SenderId,
      RoomId:    room.RoomId,
      Text:      room.Text,
      CreateAt: room.CreatedAt.Format(time.RFC3339),
		})
	}

	if err != nil {
		return err
  }
  utils.WriteProto(w, &responseMessages)

	return nil
}
