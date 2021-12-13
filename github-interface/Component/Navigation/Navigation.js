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
import Comment from '../Issues/Comment';
import postComment from '../Issues/postComment';

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
        <Stack.Screen name="postComment" component={postComment} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="AllFile" component={AllFile} />
        <Stack.Screen name="Issue" component={Issue} />
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
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Repositories" component={Repositories} />
        <Stack.Screen name="Issues" component={Issues} />
        <Stack.Screen name="Issue" component={Issue} />
        <Stack.Screen name="postComment" component={postComment} />
        <Stack.Screen name="Repository" component={Repository} />
        <Stack.Screen name="Repository browser" component={RepositoryBrowser} />
        <Stack.Screen name="FileViewer" component={FileViewer} />
        <Stack.Screen name="Createrepo" component={CreateRepo} />
        <Stack.Screen name="Pull requests" component={PullRequests} />
        <Stack.Screen name="Pull request" component={PullRequest} />
        <Stack.Screen name="Create pull request" component={CreatePullRequest} />
        <Stack.Screen name="Watchers" component={Watchers} />
        <Stack.Screen name="Forks" component={Forks} />
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
