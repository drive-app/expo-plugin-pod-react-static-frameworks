This is a simple plugin which helps explicitly define static frameworks for most if not all React native packages.

This repo is meant to automate a solution for rnmapbox/maps and react-native-mapbox-navigation: https://github.com/mapbox/mapbox-navigation-ios/issues/4038#issuecomment-1322676548 for use within an expo development environment.

error on expo by disabling some pod optimizations and downloading all pod
resources every time.

Install the plugin with 
```
npm install @driveapp/expo-plugin-pod-react-static-frameworks
OR
yarn add @driveapp/expo-plugin-pod-react-static-frameworks
```

Then make sure to add this line to your plugins section in your app.json / app.config.js / app.config.ts

```
{
  "name": "my app",
  "plugins": ["@driveapp/expo-plugin-pod-react-static-frameworks"]
}
```
