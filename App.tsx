import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {QuizScreen, Profile, Home} from './screens';
import './protocol.js';
import './starx-wsclient.js';

const App = () => {
  const Tabs = createBottomTabNavigator();
  const HomeStack = createStackNavigator();
  const ProfileStack = createStackNavigator();

  const HomeStackScreen = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Hem" component={Home}></HomeStack.Screen>
      <HomeStack.Screen name="Quiz" component={QuizScreen}></HomeStack.Screen>
    </HomeStack.Navigator>
  );

  const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
      <Tabs.Screen name="Profil" component={Profile}></Tabs.Screen>
    </ProfileStack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="Hem" component={HomeStackScreen}></Tabs.Screen>
        <Tabs.Screen name="Profil" component={ProfileStackScreen}></Tabs.Screen>
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
