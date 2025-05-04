package handlers

import (
	"net/http"

	"github.com/batmanboxer/chatapp/internal/utils"
)

func (h *Handlers) GetUsersByName(w http.ResponseWriter, r *http.Request) error {
	name := r.URL.Query().Get("name")
	users, err := h.ChatManager.GetUsersByName(name)
	if err != nil {
		http.Error(w, "No User With This Name Exists", http.StatusNotFound)
	}

	utils.WriteJson(w, users)
	return nil
}
