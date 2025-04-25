package auth

import (
	"errors"
	"github.com/batmanboxer/chatapp/models"
	"golang.org/x/crypto/bcrypt"
)

func (auth *AuthManager) AuthLogin(loginData models.LoginData) (string, error) {

	account, err := auth.AuthDb.GetUserByEmail(loginData.Email)
	if err != nil {
		return "", errors.New("User doesnt Exist")
	}

	err = bcrypt.CompareHashAndPassword([]byte(account.Password), []byte(loginData.Password))
	if err != nil {
		return "", errors.New("Incorrect Password")
	}
	
	jwt, err := GenerateJwt(account.ID.String())
	if err != nil {
		return "", err
	}
	return jwt, nil
}
