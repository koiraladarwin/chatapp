package chat

import (
	"github.com/batmanboxer/chatapp/models"
)

func (h *WebSocketManager) GetUsersByName(name string) ([]models.AccountModel, error) {
	//check if user had permission to chat that other user and stuff late
  //i know this is unnessary abtraction but later maybe useful
    
	return h.ChatStorage.GetUsersByName(name)

}
