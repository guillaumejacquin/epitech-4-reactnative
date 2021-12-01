import React from 'react'
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();

const User = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.nametitle}>Guillaume Jacquin</Text>

          <View>

        <div style={{marginTop:50, marginBottom:40}}>

        <Image source = {{uri:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png'}}
      style = {styles.picture_profil} />
      </div>


         


     <TouchableOpacity
        style={styles.button}>
                <Text style={styles.textbutton}>Followers</Text>
      </TouchableOpacity>
      </View>

      <View>
      <TouchableOpacity
        style={styles.button}>
                <Text style={styles.textbutton}>Followings</Text>

      </TouchableOpacity> </View>
      
      <View>
      <TouchableOpacity
        style={styles.button}>
                <Text style={styles.textbutton}>Repositorings</Text>

      </TouchableOpacity>
      </View>


      <View>
      <TouchableOpacity
        style={styles.button}>
                <Text style={styles.textbutton}>Stared</Text>

      </TouchableOpacity> </View>
          
         </View>
    )
}

export default User

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
      },
      picture_profil: {
        width: 72.53,
        height: 72.53,
        marginLeft:50,

        

      },
    
    /* Background */
      button: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    marginTop:10,
    marginBottom:10,
    height:60,
    borderRadius:10,
    marginLeft:15,
    marginRight:15,

   

    backgroundColor: "white",
    borderRadius: 8,
   },

   textbutton: {
    fontSize:30,
    padding:20,
    textAlignVertical:'center',


  },


   nametitle: {
     fontFamily: "Red Hat Display",
     fontStyle: "normal",
     color: "#120E21",
     fontSize:40,
     marginLeft:20,

   }


    
})
/* Guillaume Munsch */

// position: absolute;
// width: 223px;
// height: 38px;
// left: 117px;
// top: 100px;

// font-family: Red Hat Display;
// font-style: normal;
// font-weight: bold;
// font-size: 25px;
// line-height: 33px;
// display: flex;
// align-items: center;

// color: #120E21;

