package handlers

import (
	"net/http"
	"github.com/batmanboxer/chatapp/internal/utils"
	"github.com/batmanboxer/chatapp/models"
	"github.com/batmanboxer/chatapp/protomodels"
)

func (h *Handlers) LoginHandler(w http.ResponseWriter, r *http.Request) error {

	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return nil
	}

	protodata := protomodels.LoginDto{}
	err := utils.ReadProto(r, &protodata)
	if err != nil {
		http.Error(w, "Unknown parameters", http.StatusMethodNotAllowed)
		return nil
	}

	data := models.LoginState{
		Email:    protodata.Email,
		Password: protodata.Password,
	}

	jwt, err := h.AuthManager.AuthLogin(data)

	if err != nil {
		http.Error(w, "Wrong Creadientials", http.StatusUnauthorized)
		return nil
	}

	protoSucess := protomodels.LoginSucess{
		Jwt: jwt,
	}

  err = utils.WriteProto(w, &protoSucess)

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}

	return nil
}
