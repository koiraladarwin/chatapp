package chat

import (
	"github.com/batmanboxer/chatapp/models"
)

func (h *WebSocketManager) GetLastMessageChatRoom(id int) (*models.MessageModel, error) {
  return h.ChatStorage.GetLastMessageChatRoom(id)
}
