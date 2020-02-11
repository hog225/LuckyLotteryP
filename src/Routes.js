import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  StackActions
} from 'react-navigation';

import {createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator } from 'react-navigation-stack'

import Lotto from './screens/Lotto';
import LuckyWords from './screens/LuckyWords';
import GeneratedNumber from './screens/GeneratedNumber';
import Header from './components/Header';
import { getNavbarLottoIcon, getNavbarGenNumberIcon, getNavbarLuckyWordsIcon } from './utils/icons';
import { getFontStyleObject } from './utils/font';

import Theme from './Theme.js';
import {i18n} from './localization'

import NavbarWrapper from './components/NavbarWrapper'
import NavbarButtonWrapper from './components/NavbarButtonWrapper'

const TabNames = {
  lotto: i18n.t('tab_lotto'),
  genNumber: i18n.t('tab_gen_number'),
  luckWords: i18n.t('tab_lucky_word')
};

const defaultHeaderObject = {
  header: props => <Header scene={props.scene} />
};

const createDefaultStackNavigator = (screensObject, titleName, customOptions) =>
  createStackNavigator(screensObject, {
    defaultNavigationOptions: { 
      ...defaultHeaderObject, 
      cardStyle: {
        backgroundColor: '#000'
      },
      title: titleName,
      
    },
    headerMode: 'screen',
    ...customOptions,
    
  });

// Navigation
const BottomTabs = createBottomTabNavigator(
  {
    [TabNames.lotto]: {
      screen: createDefaultStackNavigator({ Lotto }, TabNames.lotto)
    },
    [TabNames.genNumber]: {
      screen: createDefaultStackNavigator({ GeneratedNumber }, TabNames.genNumber)
    },
    [TabNames.luckWords]: {
      screen: createDefaultStackNavigator({ LuckyWords }, TabNames.luckWords)
    }
  },
  {
    //animationEnabled: true,
    //swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeBackgroundColor: Theme.colors.bottomNavbar,
      inactiveBackgroundColor: Theme.colors.bottomNavbar,
      activeTintColor: Theme.gray.lightest,
      inactiveTintColor: Theme.gray.light,
      labelStyle: { ...getFontStyleObject() },
      style: {
        borderTopColor: Theme.colors.bottomNavbar,
        height: Theme.specifications.bottomNavbarHeight,
        backgroundColor: Theme.colors.bottomNavbar
      },
      upperCaseLabel: false,
      showLabel: false,
      showIcon: true,      
    },
    defaultNavigationOptions: ({ navigation }) => ({
        lazy: false,
        tabBarIcon: ({ tintColor }) => {
            const { routeName } = navigation.state;
            switch (routeName) {
            case TabNames.lotto:
                return getNavbarLottoIcon({ tintColor });
            case TabNames.genNumber:
                return getNavbarGenNumberIcon({ tintColor });
            case TabNames.luckWords:
                return getNavbarLuckyWordsIcon({ tintColor });            
            default:
                return null;
            }
        },
        
        tabBarComponent: NavbarWrapper,
        tabBarButtonComponent: NavbarButtonWrapper,
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            navigation.dispatch(StackActions.popToTop());
            defaultHandler();
        }
    })
  }
);

// const HomeStack = createStackNavigator(
//   { [RouteNames.BottomTabs]: { screen: BottomTabs } },
//   { defaultNavigationOptions: () => ({ headerShown: false }) }
// );

export const RootStack = createAppContainer(
    BottomTabs
);
