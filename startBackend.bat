
cd /d ".\Backend"

start mongod --port 27017 --dbpath .\DB

go run main.go
