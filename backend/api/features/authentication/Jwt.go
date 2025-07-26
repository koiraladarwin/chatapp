package auth

import (
	"errors"
	"log"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt"
)

func ValidateJwt(tokenString string) (string, error) {
	parts := strings.Split(tokenString, ".")
	secretKey := []byte(os.Getenv("key"))

	if len(parts) != 3 {
		return "", errors.New("invalid token format")
	}

	token, err := jwt.ParseWithClaims(tokenString, &jwt.StandardClaims{},
		func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, errors.New("unexpected signing method")
			}
			return secretKey, nil
		})
	if err != nil {
		return "", err
	}

	claims, ok := token.Claims.(*jwt.StandardClaims)
	if ok && token.Valid && claims.Issuer == "batmanissuer" {
		return claims.Id, nil
	}

	return "", errors.New("invalid token signature")
}

func GenerateJwt(id string) (string, error) {

	secretKey := []byte(os.Getenv("key"))
	claims := jwt.StandardClaims{
		ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
		Issuer:    "batmanissuer",
		Id:        id,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString(secretKey)
	log.Println(id)
	if err != nil {
		return "", err
	}

	return signedToken, nil
}
