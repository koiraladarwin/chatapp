package chat

import (
	"github.com/batmanboxer/chatapp/models"
	"github.com/google/uuid"
)

func (h *WebSocketManager) GetChatRoomsByUser(id uuid.UUID) ([]*models.ChatRoom, error) {
	//check if user had permission to chat that other user and stuff

	return h.ChatStorage.GetChatRoomsByUser(id)

}
