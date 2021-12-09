import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image, TouchableOpacity, Modal } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

const User = ({octokit}) => {
    const [user, setuser] = useState(undefined)
    const [modalOpen, setModalOpen] = useState(false);

    const [repo, setRepo] = useState(0)
    const getData = async() => {
        const {data} = await octokit.request("/user");
        const privater = data.owned_private_repos
        const publicc = data.public_repos

        setRepo(data.owned_private_repos + data.public_repos)
        

        return data
    }
    useEffect(() => {
        getData().then(res => {
            setuser(res);
        })
    }, [octokit])

    if(user)
        return (
            <View>
              <Modal visible={modalOpen} animationType='slide'>
                <View>
                  <MaterialIcons
                  name='close'
                  style={styles.modalToggle}
                  size={24}
                  onPress={() => setModalOpen(false)}
                  />
                  <Text>
                    hello
                  </Text>
                </View>
                 </Modal>
              <View>
                <View style={{flexDirection:"row", left:"50%", marginTop:30}}> 

              <Image style={{width:50, height:50}}source={{uri: user.avatar_url}} />

              <Text style={styles.nametitle}> {user.login}</Text>

              </View>
              { user.twitter_username ? <Text style={styles.twitter}>  {user.twitter_username} </Text> : <Text style={styles.twitter}>  </Text> }

    
              </View>
           

          
      <View>
     <TouchableOpacity onPress={() => setModalOpen(true)}

        style={styles.button}>

                <Text style={styles.textbutton}>Followers {user.followers}</Text>
                {/* onPress={() => console.log("ahhuhu")} */}
      </TouchableOpacity>
      </View>
          {console.log(user)}
      <View>
        

      <TouchableOpacity
        style={styles.button}>
                <Text style={styles.textbutton}>Followings {user.following}</Text>

      </TouchableOpacity> 
      </View>

      <View>
      <TouchableOpacity
        style={styles.button}>
            <Text style={styles.textbutton}>Repositorings {repo}</Text>
      </TouchableOpacity>
      </View>

      <View>
      <TouchableOpacity
        style={styles.button}>
                <Text style={styles.textbutton}>Stared</Text>

      </TouchableOpacity>
          
      </View>


      </View>
        )

    

    else{
        return (
            <View>
                <Text>Chargement...</Text>
            </View>
        )
    }
}

// export default User

const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(User)



const styles = StyleSheet.create({
  container: {
      marginTop: 50,
    },
    modalToggle: {
      marginTop:"2%",
      marginLeft:"10%"

    },
    twitter: {
      textAlign:'center',
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
  height:90,
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
   textAlign:'center',

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
