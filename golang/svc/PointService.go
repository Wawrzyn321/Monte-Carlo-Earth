package svc

import (
	"context"

	"github.com/Wawrzyn321/Monte-Carlo-Earth/golang/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type PointService struct {
	client     *mongo.Client
	collection *mongo.Collection
	ctx        context.Context
}

func NewPointService(connectionString string, ctx context.Context) (*PointService, error) {
	client, err := mongo.NewClient(options.Client().ApplyURI(connectionString))
	if err != nil {
		return nil, err
	}

	err = client.Connect(ctx)
	if err != nil {
		return nil, err
	}
	collection := client.Database("monte-carlo-db").Collection("points")

	return &PointService{client: client, collection: collection, ctx: ctx}, nil
}

func (pointService *PointService) AddPoint(point model.Point) error {
	_, err := pointService.collection.InsertOne(pointService.ctx, point)
	return err
}

func (pointService *PointService) GetAllPointsCount() (int64, error) {
	filter := bson.M{}
	return pointService.collection.CountDocuments(pointService.ctx, filter)
}

func (pointService *PointService) GetOnWaterPointsCount() (int64, error) {
	filter := bson.M{"isWater": true}
	return pointService.collection.CountDocuments(pointService.ctx, filter)
}
