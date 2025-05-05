package handlers

import (
	"errors"
	"net/http"
	"github.com/batmanboxer/chatapp/common"
	"github.com/batmanboxer/chatapp/internal/utils"
)

func (h *Handlers) GetUsersByName(w http.ResponseWriter, r *http.Request) error {
	userId := r.Context().Value(common.CONTEXTUSERIDKEY)
	stringUserId, ok := userId.(string)

	if !ok {
		return errors.New("User Id Invalid")
	}

	name := r.URL.Query().Get("name")

	users, err := h.ChatManager.GetUsersByName(stringUserId,name)
	if err != nil {
		http.Error(w, "No User With This Name Exists", http.StatusNotFound)
	}

	utils.WriteJson(w, users)
	return nil
}
