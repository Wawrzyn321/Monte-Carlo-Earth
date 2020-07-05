package model

import (
	"fmt"
	"github.com/rs/zerolog/log"
	"strings"
)

type GeocodingResponse struct {
	Results []struct {
		Components struct {
			Category      string `json:"_category"`
			Type          string `json:"_type"`
			BodyOfWater   string `json:"body_of_water"`
			StateDistrict string `json:"state_district"`
			Country       string
		}
	}
}

func (gr *GeocodingResponse) GetLocation() string {
	locationComponent := &gr.Results[0].Components

	if strings.HasSuffix(locationComponent.Category, "/water") {
		return "Somewhere on the water"
	}

	if locationComponent.Country != "" {
		return locationComponent.Country
	}

	switch locationComponent.Type {
	case "body_of_water":
		return locationComponent.BodyOfWater
	case "state_district":
		return locationComponent.StateDistrict
	default:
		log.Printf("%v\n", locationComponent)
		return fmt.Sprintf("Unknown: %s", locationComponent.Type)
	}
}
