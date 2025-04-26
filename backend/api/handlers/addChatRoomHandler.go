package handlers

import (
	"errors"
	"github.com/batmanboxer/chatapp/common"
	"github.com/batmanboxer/chatapp/internal/utils"
	"github.com/batmanboxer/chatapp/models"
	"github.com/google/uuid"
	"net/http"
)

func (h *Handlers) AddChatRoomHanlder(w http.ResponseWriter, r *http.Request) error {

	userId := r.Context().Value(common.CONTEXTUSERIDKEY)
	stringUserId, ok := userId.(string)

	if !ok {
		return errors.New("User Id Invalid")
	}

	user1, err := uuid.Parse(stringUserId)
	if err != nil {
		return err
	}

	user2Data := models.AddChatRoomRequest{}
	utils.ReadJson(r, &user2Data)
	user2 := user2Data.Participant

	_, err = h.AuthManager.AuthGetUserById(user2.String())
	if err != nil {
		w.Write([]byte("User Doesnt Exists"))
    return nil
	}
	exists := h.ChatManager.CheckChatRoomExists(user1, user2)

	if exists {
		w.Write([]byte("Chat Room Already Exists"))
    return nil
	}

	users := []uuid.UUID{}

	users = append(users, user1)
	users = append(users, user2)

	err = h.ChatManager.AddChatRoom(users)

	if err != nil {
		return err
	}

	//todo make a custom writer to the http connection
	w.Write([]byte("done"))

	return nil
}
