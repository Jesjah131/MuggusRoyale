import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { QuizScreen} from './Quiz';
import {Profile} from './Profile';
import {Home} from './Home';
import '../protocol';
import '../starx-wsclient';
import { RootStackParamList } from './navigation/types';

// https://reactnavigation.org/docs/typescript/ <-- Det här är ett jävla helvete. In och läs och njut.



const App = () => {
  const RootStack = createStackNavigator();
  const MainStack = createStackNavigator<RootStackParamList>();

  const HomeStackScreen = () => (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home}></MainStack.Screen>
      <MainStack.Screen name="Profile" component={Profile}></MainStack.Screen>
    </MainStack.Navigator>
  );

  const RootStackScreen = () => (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={HomeStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen name="Quiz" component={QuizScreen} options={{headerShown: false}}/>
    </RootStack.Navigator>
  );

  return (
    <NavigationContainer>
      <RootStackScreen/>
      
    </NavigationContainer>
    /*
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="Hem" component={HomeStackScreen}></Tabs.Screen>
        <Tabs.Screen name="Profil" component={ProfileStackScreen}></Tabs.Screen>
      </Tabs.Navigator>
    </NavigationContainer>
    */
  );
};

export default App;
