package handlers

import (
	"io"
	"log"
	"net/http"

	"github.com/batmanboxer/chatapp/internal/utils"
	"github.com/batmanboxer/chatapp/models"
	"github.com/batmanboxer/chatapp/protomodels"
	"google.golang.org/protobuf/proto"
)

func (h *Handlers) LoginHandler(w http.ResponseWriter, r *http.Request) error {

	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("Method Not Allowed"))
		return nil
	}

	protodata := protomodels.LoginDto{}
	bodyBytes, err := io.ReadAll(r.Body)
	defer r.Body.Close()
	err = proto.Unmarshal(bodyBytes, &protodata)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Unknown Data Type Provided"))
		return nil
	}
  log.Print("done this via protobuf")
	// data := models.LoginDto{}
	// err = json.NewDecoder(r.Body).Decode(&data)
	//
	// if err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	w.Write([]byte("Unknown Data Type Provided"))
	// 	return nil
	// }

	data := models.LoginDto{
		Email:    protodata.Email,
		Password: protodata.Password,
	}

	jwt, err := h.AuthManager.AuthLogin(data)

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
		return nil
	}

	w.WriteHeader(http.StatusOK)
	sucess := models.LoginSucess{
		Jwt: jwt,
	}

	err = utils.WriteJson(w, sucess)

	if err != nil {
		return nil
	}

	return nil
}
