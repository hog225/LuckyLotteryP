# Lucky Lottery

React Native 복권 번호 자동 생성기 APP

## 주요 디펜던시
---
### react-navigation
[설치법](https://reactnavigation.org/docs/en/getting-started.html#installing-dependencies-into-an-expo-managed-project) 요구하는 디펜던시가 많음 

### react-native-vector-icons
Android Gradle 파일을 수정해 줘야 함 - [방법](https://github.com/oblador/react-native-vector-icons#android)
IOS 의 경우 Font를 수동으로 프로젝트에 추가해 줘야 함 

### Custom Icon
1. yarn add react-native-custom-icon
2. IcoMoon 에서 Icon font 화
3. selection.json 파일 import 후 MyIcon component 에 Props로 전달 
4. *.ttf 파일을 Android의 경우 assets/font 에 복사 (폴더가 없을 경우 생성)


## Getting Started

1. `git clone https://github.com/hog225/luckylottery.git`
2. `cd` luckylottery
3. `npm install` or `yarn install`
4. Run `npx react-native run-android` or `npx react-native run-ios`