package chat

import (
	"github.com/batmanboxer/chatapp/models"
	"github.com/google/uuid"
)

func (h *WebSocketManager) GetChatsByChatRoom(user uuid.UUID, chatRoom string) ([]models.MessageModel, error) {
	//i know this is unnessary abtraction but this is atleast better than java where you have a factory class for a factory class right
	return h.ChatStorage.GetMessages(chatRoom, 0, 100)

}
