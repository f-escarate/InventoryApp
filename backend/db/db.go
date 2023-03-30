package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Product struct {
	ID             primitive.ObjectID `bson:"_id"`
	Name           string             `bson:"name"`
	ExpirationDate primitive.DateTime `bson:"expiration-date"`
}

var collection *mongo.Collection
var ctx = context.TODO()

/*
Initialize the Products collection from MongoDB
*/
func InitDB() {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017/")
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	collection = client.Database("InventoryApp").Collection("products")
}

/*
Applies a filter to the collection
(Also is able to add options (like sorting))
*/
func FilterProducts(filter interface{}, options ...*options.FindOptions) ([]*Product, error) {
	// A slice of products for storing the decoded documents
	var products []*Product
	var cur *mongo.Cursor
	var err error
	// Checking if there are options (for example: sorting)
	if len(options) == 1 {
		cur, err = collection.Find(ctx, filter, options[0])
	} else {
		cur, err = collection.Find(ctx, filter)
	}

	if err != nil {
		return products, err
	}
	for cur.Next(ctx) {
		var t Product
		err := cur.Decode(&t)
		if err != nil {
			return products, err
		}
		products = append(products, &t)
	}

	if err := cur.Err(); err != nil {
		return products, err
	}

	// once exhausted, close the cursor
	cur.Close(ctx)

	if len(products) == 0 {
		return products, mongo.ErrNoDocuments
	}

	return products, nil
}

func GetAll() ([]*Product, error) {
	// passing bson.D{{}} matches all documents in the collection
	filter := bson.D{{}}
	return FilterProducts(filter)
}
