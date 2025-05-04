package chat

import (
	"log"

	"github.com/batmanboxer/chatapp/models"
	"github.com/google/uuid"
)

func (h *WebSocketManager) GetChatRoomsByUser(id uuid.UUID) ([]*models.ResponseChatRoom, error) {

	responseChatRooms := []*models.ResponseChatRoom{}
	chatRooms, err := h.ChatStorage.GetChatRoomsByUser(id)
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
  log.Println(len(chatRooms))

	for _, chatRoom := range chatRooms {
		var responseUserId uuid.UUID
    for _, userId := range chatRoom.UserIDs {
      log.Println(userId)
			if userId != id {
				responseUserId = userId
				break 
			}
		}

		user, err := h.ChatStorage.GetUserById(responseUserId.String())
		if err != nil {
      log.Println(responseUserId.String())
			continue
		}

		responseChatRoom := models.ResponseChatRoom{
			Name:   user.Name,
			ID:     chatRoom.ID,
			UserId: responseUserId,
		}
		responseChatRooms = append(responseChatRooms, &responseChatRoom)
	}

	return responseChatRooms, nil

}

