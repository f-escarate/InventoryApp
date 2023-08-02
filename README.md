# InventoryApp
 A mobile app to take inventory of the house's pantry
 Is made with React Native (Expo) for the frontend and the data is stored with MongoDB.

## Setup

1. Install Expo

    ```
    npm install -g expo-cli
    ```

2. Install some dependencies

    ```
    npm install @react-navigation/native @react-navigation/bottom-tabs react-async react-native-table-component @react-navigation/stack react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
    
    npm install react-native-reanimated@2.14.4
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

    `mongod --port 27017 --dbpath PathWhereTheRepoIsStored\InventoryApp\Backend\db`

## Build

    `eas build -p android --profile preview`
