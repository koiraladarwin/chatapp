package handlers

import (
	"context"
	"github.com/batmanboxer/chatapp/api/features/authentication"
	"github.com/batmanboxer/chatapp/common"
	"net/http"
)

func (h *Handlers) AuthenticationMiddleware(next customHttpHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
      
    //remove this in prod darwin
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == http.MethodOptions {
			// Send a response for the preflight request
			w.WriteHeader(http.StatusOK)
			return
		}

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Authorization header required", http.StatusUnauthorized)
			return
		}

		userId, err := auth.ValidateJwt(authHeader)
		if err != nil {
			http.Error(w, "Invalid JWT", http.StatusUnauthorized)
			return
		}

		_, err = h.AuthManager.AuthGetUserById(userId)
		if err != nil {
			http.Error(w, "User Account Is Deleted By Admin", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), common.CONTEXTUSERIDKEY, userId)

		err = next(w, r.WithContext(ctx))

		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}
	}
}
