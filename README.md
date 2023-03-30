# InventoryApp
 A mobile app to take inventory of the house's pantry
 Is made with React Native (Expo) for the frontend and the data is stored with MongoDB.

## Setup

1. Install Expo

    `npm install -g expo-cli`

2. Install some dependencies

    ```
    npm install @react-navigation/stack
    npm install @react-navigation/native
    npm install react-native-table-component
    npm install react-async
    ```

3. Start the backend
    ```
    cd backend
    go run main.go
    cd ..
    ```

4. Start the frontend

    `npm start`

    Or

    `npm start --android`

## Mongo Setup

*  Just run:

    `mongod --port 27017 --dbpath PathWhereTheRepoIsStored\InventoryApp\DB`