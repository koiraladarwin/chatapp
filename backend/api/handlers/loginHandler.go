package handlers

import (
	"io"
	"net/http"
	"github.com/batmanboxer/chatapp/models"
	"github.com/batmanboxer/chatapp/protomodels"
	"google.golang.org/protobuf/proto"
)

func (h *Handlers) LoginHandler(w http.ResponseWriter, r *http.Request) error {

	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return nil
	}

	protodata := protomodels.LoginDto{}
	bodyBytes, err := io.ReadAll(r.Body)
	defer r.Body.Close()
	err = proto.Unmarshal(bodyBytes, &protodata)

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

	binary, err := proto.Marshal(&protoSucess)

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}

	//sucess := models.LoginSucess{
	//	Jwt: jwt,
	//}

	//err = utils.WriteJson(w, sucess)

	w.Header().Set("Content-Type", "application/octet-stream")
	w.Write(binary)

	if err != nil {
		return nil
	}

	return nil
}
