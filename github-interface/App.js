import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth_github } from './Component/Api/GithubApi';
import Navigation from './Component/Navigation/Navigation';
import Repositories from './Component/Repositories/Repositories';
import { connect, Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
