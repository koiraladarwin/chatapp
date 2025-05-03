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
		http.Error(w, "User Doesnt Exists", http.StatusNotFound)
		return nil
	}

	exists := h.ChatManager.CheckChatRoomExistsBtwnUsers(user1, user2)

	if exists {
		http.Error(w, "User Doesnt Exists", http.StatusConflict)
		return nil
	}

	users := []uuid.UUID{}

	users = append(users, user1)
	users = append(users, user2)

	err = h.ChatManager.AddChatRoom(users)

	if err != nil {
		http.Error(w, "User Doesnt Exists", http.StatusInternalServerError)
		return nil
	}

	w.Write([]byte("User Added to Chat Room"))

	return nil
}
