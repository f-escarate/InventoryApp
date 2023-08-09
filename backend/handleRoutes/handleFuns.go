package handleRoutes

import (
	"backend/db"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/*
Is used by RouteFun to store the functions that handle the route
*/
type fun func(w http.ResponseWriter, r *http.Request)

/*
Stores the URI route and the function that handles an action
- The fields identifiers are capitalized in order to be exported
*/
type RouteFun struct {
	Route    string
	Function fun
}

/*
Actives the CORS mechanism
*/
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

/* ---------------------- Functions -------------------------- */

/*
Gets all the products from the MongoDB collection
*/
func getAll(w http.ResponseWriter, r *http.Request) {
	list, err := db.GetAll()
	if err != nil {
		log.Fatal(err)
	}
	b, err := json.Marshal(list)
	if err != nil {
		log.Fatal(err)
	}
	w.Write(b)
}

/*
Gets the products from the MongoDB collection filtering by their name
*/
func filterByName(w http.ResponseWriter, r *http.Request) {
	r.ParseForm() // Parses the request body
	name := r.Form.Get("name")

	if name == "" {
		w.Write([]byte("Please set the name parameter"))
		return
	}

	list, err := db.FilterProducts(bson.D{{"name", name}})

	if len(list) == 0 {
		w.Write([]byte("There isn't a product with that name"))
		return
	}

	if err != nil {
		log.Fatal(err)
	}
	b, err := json.Marshal(list)
	if err != nil {
		log.Fatal(err)
	}
	w.Write(b)
}

/*
Gets the products about to expire depending on a threshold
*/
func getAboutToExpire(w http.ResponseWriter, r *http.Request) {
	var daysToExpireThreshold int = 14

	filter := bson.M{"expiration-date": bson.M{
		"$lte": primitive.NewDateTimeFromTime(time.Now().AddDate(0, 0, daysToExpireThreshold)),
	}}
	options := options.Find().SetSort(bson.D{{"expiration-date", 1}})

	list, err := db.FilterProducts(filter, options)

	if len(list) == 0 {
		w.Write([]byte("There isn't a product about to expire"))
		return
	}

	if err != nil {
		log.Fatal(err)
	}
	b, err := json.Marshal(list)
	if err != nil {
		log.Fatal(err)
	}

	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	w.Write(b)
}

/*
Gets the products out of stock (quantity = 0)
*/
func getOutOfStock(w http.ResponseWriter, r *http.Request) {
	filter := bson.M{"quantity": bson.M{
		"$eq": 0,
	}}

	list, err := db.FilterProducts(filter)

	if len(list) == 0 {
		w.Write([]byte("There aren't products out of stock"))
		return
	}

	if err != nil {
		log.Fatal(err)
	}
	b, err := json.Marshal(list)
	if err != nil {
		log.Fatal(err)
	}

	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	w.Write(b)
}

func checkISODate(date string) (primitive.DateTime, bool) {
	d, err := time.Parse(time.RFC3339, date)

	if err != nil {
		return primitive.DateTime(0), false
	}
	return primitive.NewDateTimeFromTime(d), true

}

/*
Adds one item to the database
*/
func addItem(w http.ResponseWriter, r *http.Request) {
	// Parameters
	name := r.URL.Query()["Name"][0]
	quantity, q_err := strconv.ParseInt(r.URL.Query()["Quantity"][0], 10, 0)
	exprDate := r.URL.Query()["ExprDate"][0]
	// Validation
	date, dateIsISO := checkISODate(exprDate)
	var msg []byte
	if len(name) < 10 || q_err != nil || !dateIsISO {
		fmt.Println("error")
		msg = []byte("Failed")
	} else {
		fmt.Println(quantity, name, "have been added with expiration date:", exprDate)
		msg = []byte("Success")
		db.AddProduct(name, date, int(quantity))
	}
	// Response
	enableCors(&w)
	w.Header().Set("Content-Type", "text/plain")
	w.Write(msg)
}

/* ----------------------------------------------------------- */

// Variable used by main.go to check what function corresponds to each route
var Routes []RouteFun = []RouteFun{
	{"/all", getAll},
	{"/filterByName", filterByName},
	{"/aboutToExpire", getAboutToExpire},
	{"/outOfStock", getOutOfStock},
	{"/addItem", addItem},
}
