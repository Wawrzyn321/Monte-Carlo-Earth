package svc

import (
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
)

type HttpServiceBase struct {
	client *http.Client
}

func (service *HttpServiceBase) Fetch(url string) ([]byte, error) {
	resp, err := service.client.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode == http.StatusOK {
		return ioutil.ReadAll(resp.Body)
	} else {
		return nil, errors.New(fmt.Sprintf("Request failed with code %d ", resp.StatusCode))
	}
}
