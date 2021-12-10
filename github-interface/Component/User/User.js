import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image, TouchableOpacity, Modal } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';



const User = ({octokit}) => {
    const [user, setuser] = useState(undefined)
    const [modalOpen, setModalOpen] = useState(false);
    const [modalselector, setModalSelector] = useState(null);
    const [followers,  setFollowers ] = useState([])
    const [followings, setFollowings] = useState([])
    const [repo, setRepo] = useState(0)


    const openmodal = (modal) => {
      setModalSelector(modal)
      setModalOpen(true)
    }
    
    const myMap = () => {

      return (followers.map((followers) =>{
        console.log(followers.login)
        return (
          <view>
        <h1>
        {followers.login}
        </h1>
          </view>  
        );
      }));
    }



    const myMapFollowing = () => {

      return (followings.map((followings) =>{
        console.log(followings.login)
        return (
          <view>
        <h1>
        {followings.login}
        </h1>
          </view>  
        );
      }));
    }
    const getData = async() => {
        const {data} = await octokit.request("/user");
        console.log(data.login)

       const myfollowers = await octokit.request('GET /users/{username}/followers', {
        username: data.login
      })
     // .login
      setFollowers(myfollowers.data)


      const myfollowings = await octokit.request('GET /users/{username}/following', {
        username: data.login
      })
      setFollowings(myfollowings.data)
      console.log(myfollowings)


      const getUserStarred = (octokit) => octokit.request('GET /user/starred');
      octokit.request('GET /user/starred')

      console.log(getUserStarred)


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
              {console.log(user)}
              <Modal visible={modalOpen} animationType='slide'>
                {modalselector == "followers"?
                <View>
                <MaterialIcons
                name='close'
                style={styles.modalToggle}
                size={24}
                onPress={() => setModalOpen(false)}
                />
                <Text style={{textAlign:"center"}}>
                  Followers
                  </Text>
                <Text>
                  {myMap()}

                </Text>
                
              </View>: null }

              {modalselector == "followings"?
                <View>
                <MaterialIcons
                name='close'
                style={styles.modalToggle}
                size={24}
                onPress={() => setModalOpen(false)}
                />
                <Text style={{textAlign:"center"}}>
                  Followings
                  </Text>
                <Text>
                  {myMapFollowing()}

                </Text>
                
              </View>: null }
                 </Modal>



                 
              <View>
                <View style={{flexDirection:"row", left:"50%", marginTop:30}}> 
              <Image style={{width:50, height:50}}source={{uri: user.avatar_url}} />
              <Text style={styles.nametitle}> {user.login}</Text>

              </View>
              { user.twitter_username ? <Text style={styles.twitter}>  {user.twitter_username} </Text> : <Text style={styles.twitter}>  Notwitter </Text> }
              { user.name ? <Text style={styles.twitter}>  {user.name} </Text> : <Text style={styles.twitter}>  no name provided </Text> }
 
              { user.company ? <Text style={styles.twitter}>  {user.company} </Text> : <Text style={styles.twitter}>  no company provided </Text> }

              { user.email ? <Text style={styles.twitter}>  {user.email} </Text> : <Text style={styles.twitter}>  no email provided </Text> }
              { user.blog ? <Text style={styles.twitter}>  {user.blog} </Text> : <Text style={styles.twitter}>  no blog </Text> }
              { user.bio ? <Text style={styles.twitter}>  {user.bio} </Text> : <Text style={styles.twitter}>  no bio </Text> }



              </View>
              <View>
              </View>
      <View>
     <TouchableOpacity onPress={() => openmodal("followers")}
        style={styles.button}>

                <Text style={styles.textbutton}>Followers {user.followers}</Text>
                {/* onPress={() => console.log("ahhuhu")} */}
      </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity onPress={() => openmodal("followings")}
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
