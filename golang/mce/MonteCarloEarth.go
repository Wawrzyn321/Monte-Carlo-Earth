package mce

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"strconv"

	"github.com/Wawrzyn321/Monte-Carlo-Earth/golang/model"
	"github.com/Wawrzyn321/Monte-Carlo-Earth/golang/svc"
	"github.com/gorilla/mux"
	"github.com/rs/zerolog/log"
)

type MonteCarloEarth struct {
	pointService     *svc.PointService
	geocodingService *svc.GeocodingService
	onWaterService   *svc.OnWaterService
}

func NewMonteCarloEarth() (*MonteCarloEarth, error) {
	const cs = "<connection string here>?retryWrites=false"
	ctx := context.Background()
	pointService, err := svc.NewPointService(cs, ctx)
	if err != nil {
		return nil, err
	}

	return &MonteCarloEarth{
		pointService:     pointService,
		geocodingService: svc.NewGeocodingService(),
		onWaterService:   svc.NewOnWaterService(),
	}, nil
}

func (mce *MonteCarloEarth) Run() int {
	router := mux.NewRouter()
	router.Use(mce.corsMiddleware)
	router.HandleFunc("/api/points", mce.handleGetPoints).Methods("GET")
	router.HandleFunc("/api/points", mce.handlePostPoint).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/geocoding", mce.handleGetGeocoding).Methods("GET")
	http.ListenAndServe(":8090", router)
	return 0
}

func (mce *MonteCarloEarth) handleGetPoints(writer http.ResponseWriter, request *http.Request) {
	allCount, err := mce.pointService.GetAllPointsCount()
	if err != nil {
		log.Printf("handleGetPoints %s", err)
		writer.WriteHeader(500)
		return
	}
	waterCount, err := mce.pointService.GetOnWaterPointsCount()
	if err != nil {
		log.Printf("handleGetPoints %s", err)
		writer.WriteHeader(500)
		return
	}

	json.NewEncoder(writer).Encode(model.PointSummary{
		AllCount:   allCount,
		WaterCount: waterCount,
	})
}

func (mce *MonteCarloEarth) handlePostPoint(writer http.ResponseWriter, request *http.Request) {
	if request.Method == "OPTIONS" {
		return
	}

	point := model.RandomPoint()
	onWater, err := mce.onWaterService.IsPointOnater(point)
	if err != nil {
		log.Err(err)
		writer.WriteHeader(500)
		writer.Write([]byte("Cannot add point."))
		return
	}

	point.OnWater = *onWater

	err = mce.pointService.AddPoint(point)
	if err != nil {
		log.Err(err)
		writer.WriteHeader(500)
		writer.Write([]byte("Cannot add point."))
		return
	}

	json.NewEncoder(writer).Encode(point)
}

func (mce *MonteCarloEarth) handleGetGeocoding(writer http.ResponseWriter, request *http.Request) {
	query := request.URL.Query()
	latitude, latError := getFloat32(query, "latitude")
	if latError != nil {
		writer.WriteHeader(500)
		writer.Write([]byte(latError.Error()))
		return
	}
	longitude, lonError := getFloat32(query, "longitude")
	if lonError != nil {
		writer.WriteHeader(500)
		writer.Write([]byte(lonError.Error()))
		return
	}

	location, locError := mce.geocodingService.GetLocation(*longitude, *latitude)
	if locError != nil {
		log.Err(locError)
		writer.WriteHeader(500)
		writer.Write([]byte("Cannot get location"))
		return
	}

	json.NewEncoder(writer).Encode(model.LocationResponse{Location: *location})
}

func (mce *MonteCarloEarth) corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
		writer.Header().Set("Content-Type", "application/json")
		writer.Header().Set("Access-Control-Allow-Origin", "*")
		writer.Header().Set("Access-Control-Allow-Headers", "*")
		next.ServeHTTP(writer, req)
	})
}

func getFloat32(query url.Values, key string) (*float32, error) {
	values, ok := query[key]
	if !ok || len(values[0]) < 1 {
		return nil, errors.New(fmt.Sprintf("%s is required", key))
	}
	value, err := strconv.ParseFloat(values[0], 32)
	if err != nil {
		return nil, errors.New(fmt.Sprintf("%s must be a number", key))
	}
	value32 := float32(value)
	return &value32, nil
}
