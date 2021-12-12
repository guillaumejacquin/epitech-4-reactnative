import React,{useEffect} from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Issue from '../Issues/Issue';
import Search from '../Search/Search';
import User from '../User/User';
import Favorite from '../Favorite/Favorite';
import Repository from '../Repository/Repository';
import RepositoryBrowser from '../RepositoryBrowser/RepositoryBrowser';
import Details from '../Search/Details';
import AllFile from '../Search/AllFile';
import Repositories from '../Repositories/Repositories';
import FileViewer from '../FileViewer/FileViewer';
import Issues from '../Issues/Issues';
import Home from '../Home/Home';
import PullRequests from '../PullRequests/PullRequests';
import PullRequest from '../PullRequest/PullRequest';
import CreatePullRequest from '../CreatePullRequest/CreatePullRequest';
import Watchers from '../Watchers/Watchers';
import Forks from '../Forks/Forks';
import { connect } from 'react-redux';
import * as Types from '../../store/type'
import SplashScreen from '../Splash/SplashScreen';
import CreateRepo from '../CreateRepo/CreateRepo';

const Stack = createNativeStackNavigator();

const options = {headerBackTitle: "Back"}
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
        <Stack.Screen name="Details" component={Details} options={options}/>
        <Stack.Screen name="AllFile" component={AllFile} options={options}/>
        <Stack.Screen name="RepositoryView" component={Repository} options={options}/>
      </Stack.Navigator>
    )
}
const FavorisScreen = () => {
    return(
    <Stack.Navigator>
        <Stack.Screen name="Favoris" component={Favorite} />
        <Stack.Screen name="Repository" component={Repository} options={options}/>
      </Stack.Navigator>
    )
}
const RepositoryScreen = () => {
    return(
    <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Repositories" component={Repositories} options={options}/>
        <Stack.Screen name="Issues" component={Issues} options={options}/>
        <Stack.Screen name="Issue" component={Issue} options={options}/>
        <Stack.Screen name="Repository" component={Repository} options={options}/>
        <Stack.Screen name="Repository browser" component={RepositoryBrowser} options={options}/>
        <Stack.Screen name="FileViewer" component={FileViewer} options={options}/>
        <Stack.Screen name="Createrepo" component={CreateRepo} options={options}/>
        <Stack.Screen name="Pull requests" component={PullRequests} options={options}/>
        <Stack.Screen name="Pull request" component={PullRequest} options={options}/>
        <Stack.Screen name="Create pull request" component={CreatePullRequest} options={options}/>
        <Stack.Screen name="Watchers" component={Watchers} options={options}/>
        <Stack.Screen name="Forks" component={Forks} options={options}/>
    </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return(
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size }) => {
        let iconName;
        let color;

        if (route.name === 'RepositoryScreen') {
          iconName = require('../../Image/repositories.png')
          color= focused ?"tomato" :"black"
        } 
        else if (route.name === 'SearchScreen') {
          iconName = require('../../Image/search.png')
          color= focused ?"tomato" :"black"
        }
        else if (route.name === 'FavorisScreen') {
          iconName = require('../../Image/favoris.png')
          color= focused ?"tomato" :"black"
        }
        else if (route.name === 'UserScreen') {
          iconName = require('../../Image/user.png')
          color= focused ?"tomato" :"black"
        }

        // You can return any component that you like here!
        return <Image source={iconName} style={{width:30, height:30, tintColor:color}} />;
      },tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen name="RepositoryScreen" component={RepositoryScreen} options={{headerShown:false, title:"Repository"}}/>
    <Tab.Screen name="SearchScreen" component={SearchScreen} options={{headerShown:false, title:"Search"}}/>
    <Tab.Screen name="FavorisScreen" component={FavorisScreen} options={{headerShown:false, title:"Favoris"}}/>
    <Tab.Screen name="UserScreen" component={UserScreen} options={{headerShown:false, title:"Profil"}}/>
  </Tab.Navigator>
  )
}
const Navigation = () => {

    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Tab" component={TabScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
        </NavigationContainer>
    )
}


export default Navigation
