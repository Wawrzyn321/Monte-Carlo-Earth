package svc

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Wawrzyn321/Monte-Carlo-Earth/golang/model"
)

type OnWaterService struct {
	HttpServiceBase
}

func NewOnWaterService() *OnWaterService {
	return &OnWaterService{
		HttpServiceBase{client: &http.Client{}},
	}
}

func (ows *OnWaterService) IsWater(longitude, latitude float32) (*bool, error) {
	bodyBytes, err := ows.Fetch(ows.buildUrl(longitude, latitude))
	if err != nil {
		return nil, err
	}
	r := &model.OnWaterResponse{}
	err = json.Unmarshal(bodyBytes, r)
	if err != nil {
		return nil, err
	}
	return &r.IsWater, nil
}

func (ows *OnWaterService) IsPointOnater(point model.Point) (*bool, error) {
	return ows.IsWater(point.Longitude, point.Latitude)
}

func (ows *OnWaterService) buildUrl(longitude, latitude float32) string {
	apiKey := "<api key here>"
	return fmt.Sprintf("https://api.onwater.io/api/v1/results/%f,%f?access_token=%s", latitude, longitude, apiKey)
}
