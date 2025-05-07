package handlers

import (
	"errors"
	"log"
	"net/http"

	"github.com/batmanboxer/chatapp/common"
	"github.com/batmanboxer/chatapp/protomodels"
	"google.golang.org/protobuf/proto"
)

func (h *Handlers) GetUsersByName(w http.ResponseWriter, r *http.Request) error {
	userId := r.Context().Value(common.CONTEXTUSERIDKEY)
	stringUserId, ok := userId.(string)

	if !ok {
		return errors.New("User Id Invalid")
	}

	name := r.URL.Query().Get("name")

	users, err := h.ChatManager.GetUsersByName(stringUserId, name)
	if err != nil {
		http.Error(w, "No User With This Name Exists", http.StatusNotFound)
	}
	protoUsers := make([]*protomodels.AccountModelDto, 0, len(users))

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}

	for _, user := range users {
		protoUsers = append(protoUsers, &protomodels.AccountModelDto{
			Id:        user.ID.String(),
			Name:      user.Name,
			Email:     user.Email,
			Verified:  user.Verified,
			CreatedAt: user.CreatedAt.Format("2006-01-02"),
		})
	}

	data := protomodels.AccountListDto{Accounts: protoUsers}
	binary, err := proto.Marshal(&data)

	log.Println(protoUsers)
	w.Header().Set("Content-Type", "application/octet-stream")
	w.Write(binary)

	return nil
}
