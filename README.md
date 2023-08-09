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
    npm install @react-navigation/native @react-navigation/bottom-tabs react-async react-native-table-component @react-navigation/stack react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view react-native-modal
    
    npm install react-native-reanimated@2.14.4
    expo install @react-native-community/datetimepicker
    ```

    And for web debugging:
    ```
    npx expo install react-native-web@~0.18.10 react-dom@18.2.0 @expo/webpack-config@^18.0.1
    ```

3. Start the backend:

    * First, start MongoDB using:
    ```
    mongod --port 27017 --dbpath PathWhereTheRepoIsStored\InventoryApp\DB
    ```
    * Then, in backend folder, start the Golang main file:
    ```
    go run main.go
    ```

4. Start the frontend (in frontend folder)

    `expo start`

    Or

    `expo start --android`

## Build

`eas build -p android --profile preview`

## Warnings solutions
I had a warning in the component Row from 'react-native-table-component', that was solved changing the line 29 of the rows.js file from this:

`textStyle={[cellTextStyle && cellTextStyle(item), textStyle]}`

to this:

`textStyle={{...(cellTextStyle ? cellTextStyle(item) : {}), ...textStyle}}`