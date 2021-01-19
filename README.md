# MUGGUS ROYALE
Ett helt otroligt quizspel. 

## Environment Setup
```
cd ProjektMapp
npm install
```

## Android

Follow the [Environment Setup Guide](https://reactnative.dev/docs/environment-setup).

```
npm run android
```

#### Clean
```npm run clean-android```

## iOS

Install XCode, the CLI tools when prompted and [CocoaPods](https://cocoapods.org). 

```
cd ios
pod install
cd ..
npm run ios
```

#### Clean
```npm run clean-ios```


## Övriga problem
Fick något jävla permissionskit med Android-mappen efter ett tag. Denna stackoverflowlösning hjälpte mig (antar att det bara gäller UNIX-baserat):

> I was receiving this error message when running ```react-native run-android```. When I ran ```cd android && ./gradlew clean``` I was getting permission errors also. I ran ```chmod +x gradlew``` and it started working.
