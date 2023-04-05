# InventoryApp
 A mobile app to take inventory of the house's pantry
 Is made with React Native (Expo) for the frontend and the data is stored with MongoDB.

## Setup

1. Install Expo

    `npm install -g expo-cli`

2. Install some dependencies

    ```
    npm install @react-navigation/native
    npm install @react-navigation/bottom-tabs
    npm install react-async
    npm install react-native-table-component
    npm install @react-navigation/stack
    npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
    ```

    And for web debugging:
    ```
    npx expo install react-native-web@~0.18.10 react-dom@18.2.0 @expo/webpack-config@^18.0.1
    ```

3. Start the backend (in Backend folder)
    ```
    ```

4. Start the frontend (in Frontend folder)

    `npm start`

    Or

    `npm start --android`

## Mongo Setup

*  Just run:

    `mongod --port 27017 --dbpath PathWhereTheRepoIsStored\InventoryApp\Backend\DB`

## Build

    `eas build -p android --profile preview`
