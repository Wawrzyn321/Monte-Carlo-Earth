package model

import "math/rand"

type Point struct {
	Latitude  float32 `json:"latitude"`
	Longitude float32 `json:"longitude"`
	OnWater bool `json:"isWater"`
}

func NewPoint(latitude, longitude float32, onWater bool) Point {
	return Point {Latitude: latitude, Longitude:longitude, OnWater:onWater}
}

func RandomPoint() Point {
	latitude := mapCoord(rand.Float32(), -90, 90)
	longitude := mapCoord(rand.Float32(), -180, 180)
			//Id = ObjectId.GenerateNewId().ToString()

	return NewPoint(latitude, longitude, false)
}

func mapCoord(coord, min, max float32) float32 {
	span := max - min
	return coord * span + min
}