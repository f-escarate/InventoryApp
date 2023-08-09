package main

import (
	"backend/db"
	"backend/handleRoutes"
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Starting the server")
	db.InitDB()
	setRoutes()
	fmt.Println("Receiving Requests")
	recv()
}

func setRoutes() {
	// Routes
	for i := range handleRoutes.Routes {
		var Pair = handleRoutes.Routes[i]
		http.HandleFunc(Pair.Route, Pair.Function)
	}
}

func recv() {
	http.ListenAndServe(":3000", nil)
}
