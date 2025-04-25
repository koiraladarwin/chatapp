package auth

import "github.com/batmanboxer/chatapp/models"

func (auth *AuthManager) AuthGetUserById(id string) (models.AccountModel, error){
	account := models.AccountModel{}

  account, err := auth.AuthDb.GetUserById(id)
	if err != nil {
		return account, err
	}
	return account, nil
}
