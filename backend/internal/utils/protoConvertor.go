package utils

import (
	"google.golang.org/protobuf/proto"
	"io"
	"net/http"
)

func WriteProto(w http.ResponseWriter, object proto.Message) error {
	binary, err := proto.Marshal(object)
	if err != nil {
		return nil
	}

	w.Header().Add("Content-Type", "application/octet-stream")
	w.Write(binary)

	return err
}

func ReadProto(r *http.Request, object proto.Message) error {
	binary, err := io.ReadAll(r.Body)
	if err != nil {
		return nil
	}
	defer r.Body.Close()

	err = proto.Unmarshal(binary, object)

	return err
}
