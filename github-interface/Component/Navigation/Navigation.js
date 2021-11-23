import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Search from '../Search/Search';
import User from '../User/User';
import Favorite from '../Favorite/Favorite';
import Repository from '../Repository/Repository';

const Stack = createNativeStackNavigator();

const UserScreen = () => {
    return(
    <Stack.Navigator>
        <Stack.Screen name="User" component={User} />
      </Stack.Navigator>
    )
}
const SearchScreen = () => {
    return(
    <Stack.Navigator>
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    )
}
const FavorisScreen = () => {
    return(
    <Stack.Navigator>
        <Stack.Screen name="Favoris" component={Favorite} />
      </Stack.Navigator>
    )
}
const RepositoryScreen = () => {
    return(
    <Stack.Navigator>
        <Stack.Screen name="Repository" component={Repository} />
      </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="RepositoryScreen" component={RepositoryScreen} options={{headerShown:false}}/>
        <Tab.Screen name="SearchScreen" component={SearchScreen} options={{headerShown:false}}/>
        <Tab.Screen name="FavorisScreen" component={FavorisScreen} options={{headerShown:false}}/>
        <Tab.Screen name="UserScreen" component={UserScreen} options={{headerShown:false}}/>
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
    )
}

export default Navigation
