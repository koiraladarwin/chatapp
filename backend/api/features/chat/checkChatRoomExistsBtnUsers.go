package chat

import "slices"

import "github.com/google/uuid"

func (h *WebSocketManager) CheckChatRoomExistsBtnUsers(user1 uuid.UUID, user2 uuid.UUID) bool {
	chatRooms, err := h.GetChatRoomsByUser(user1)

	if err != nil {
		return false
	}

	for _, chatRoom := range chatRooms {
		if slices.Contains(chatRoom.UserIDs, user2) {
				return true
			}
	}

	return false
}
