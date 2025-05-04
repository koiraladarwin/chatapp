package handlers

import (
	"errors"
	"log"
	"net/http"
	"github.com/batmanboxer/chatapp/common"
	"github.com/batmanboxer/chatapp/internal/utils"
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

	chatRooms, err := h.ChatManager.GetChatRoomsByUser(uuidUserId)
	if err != nil {
		log.Println("here is error")
		log.Println(err.Error())
		return err
	}

	utils.WriteJson(w, chatRooms)

	return nil
}
