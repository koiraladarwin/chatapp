package chat

import (
	"github.com/google/uuid"
)

func (h *WebSocketManager) CheckChatRoomExists(userId uuid.UUID, chatRoomId int)bool {

	chatRooms, err := h.ChatStorage.GetChatRoomsByUser(userId)

	if err != nil {
		return  false
	}

	for _, chatRoom := range chatRooms {
		if chatRoom.ID == chatRoomId {
			return true
		}
	}

	return false
}
