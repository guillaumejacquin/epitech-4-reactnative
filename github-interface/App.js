import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth_github } from './Component/Api/GithubApi';
import Navigation from './Component/Navigation/Navigation';
import Repositories from './Component/Repositories/Repositories';
import { connect, Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  const [auth, setauth] = useState(undefined)
  useEffect(() => {
    auth_github().then(async res => {
      // const {data} = await res.request("/user");
      setauth(res);
    })
  }, [])

  return (
    <Provider store={store}>
      <Navigation auth={auth}/>
    </Provider>
  );
}


// const mapStateToProps = state => state;
// const mapDispatchToProps = dispatch => ({
//     updateAuthInformation: (octokit) => dispatch({type: Types.AUTH_GITHUB, payload:{
//       octokit
//     }}),
// })
// const connectComponent = connect(mapStateToProps, mapDispatchToProps)
// export default connectComponent(App)
export default (App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
