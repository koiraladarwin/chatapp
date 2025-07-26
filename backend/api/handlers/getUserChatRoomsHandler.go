package handlers

import (
	"errors"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/batmanboxer/chatapp/common"
	"github.com/batmanboxer/chatapp/internal/utils"
	"github.com/batmanboxer/chatapp/protomodels"
	"github.com/google/uuid"
)

func (h *Handlers) GetUserChatRoomsHanlder(w http.ResponseWriter, r *http.Request) error {

	userId := r.Context().Value(common.CONTEXTUSERIDKEY)
	stringUserId, ok := userId.(string)

	if !ok {
		return errors.New("User Id Invalid")
	}

	uuidUserId, err := uuid.Parse(stringUserId)
	if err != nil {
		return err
	}

	rooms, err := h.ChatManager.GetChatRoomsByUser(uuidUserId)
	if err != nil {
		log.Println("here is error")
		log.Println(err.Error())
		return err
	}

	protoRooms := protomodels.ChatRoomList{}

	for _, room := range rooms {
		lastMessage, err := h.ChatManager.GetLastMessageChatRoom(room.ID)
		if err != nil {
			log.Println("Error getting last message for room:", room.ID, err.Error())
			continue
		}
		protoRooms.ChatRooms = append(protoRooms.ChatRooms, &protomodels.ChatRoom{
			Id:          strconv.Itoa(room.ID),
			Name:        room.Name,
			CreateAt:    room.CreatedAt.UTC().Format(time.RFC3339),
			UserId:      room.UserId.String(),
			LastMessage: lastMessage.Text,
		})
	}

	utils.WriteProto(w, &protoRooms)
	return nil
}
