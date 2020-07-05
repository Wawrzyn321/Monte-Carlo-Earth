package svc

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Wawrzyn321/Monte-Carlo-Earth/golang/model"
)

type GeocodingService struct {
	HttpServiceBase
}

func NewGeocodingService() *GeocodingService {
	return &GeocodingService{
		HttpServiceBase{client: &http.Client{}},
	}
}

func (gs *GeocodingService) GetLocation(longitude, latitude float32) (*string, error) {
	bodyBytes, err := gs.Fetch(gs.buildUrl(longitude, latitude))
	if err != nil {
		return nil, err
	}
	r := &model.GeocodingResponse{}
	err = json.Unmarshal(bodyBytes, r)
	if err != nil {
		return nil, err
	}
	location := r.GetLocation()
	return &location, nil
}

func (gs *GeocodingService) GetPointLocation(point model.Point) (interface{}, interface{}) {
	return gs.GetLocation(point.Longitude, point.Latitude)
}

func (*GeocodingService) buildUrl(longitude, latitude float32) string {
	apiKey := "<api key here>"
	return fmt.Sprintf("https://api.opencagedata.com/geocode/v1/json?q=%f+%f&key=%s", latitude, longitude, apiKey)
}
