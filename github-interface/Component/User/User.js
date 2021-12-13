import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { StyleSheet, CheckBox, Button, View, SafeAreaView, Text, Alert, Image, TouchableOpacity, Modal } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';


const MymodalFollowing = (followings) => {
    return(
      <Text>
      <Text style={{flexDirection: "row"}}>
      <TouchableOpacity >
        <Text>
      {followings.login}
        </Text>
      </TouchableOpacity>
         <Text>     
         </Text>

       <Text>  
         <TouchableOpacity  onPress={() => Follow(followers.login)}>
            <Text> S'abonner </Text>
         </TouchableOpacity>
        </Text>
         
         <Text onPress={() => UnFollow(followings.login)}>  
         
      <TouchableOpacity style={{flexDirection:"row", width:"30%", backgroundColor:"green"}}>
         <Text> Se désabonner</Text>
      </TouchableOpacity>
         </Text>
     {"\n"}
      </Text>

      <Text style={{flexDirection:"row"}}>
        <Text style={{width:"50%", borderWidth:2, borderWidth:2}}> POUET</Text>
        <Text style={{width:"50%", borderWidth:2}}> POUET</Text>
        <Text style={{width:"50%"}}> POUET</Text>


      </Text>
      {"\n"}
        {"\n"}

      </Text>
      )}





const User = ({octokit}) => {
    const [user, setuser] = useState(undefined)
    const [modalOpen, setModalOpen] = useState(false);
    const [modalselector, setModalSelector] = useState(null);
    const [followers,  setFollowers ] = useState([])
    const [followings, setFollowings] = useState([])
    const [repo, setRepo] = useState(0)
    const [isSelected, setSelection] = useState(false);

    const openmodal = (modal) => {
      setModalSelector(modal)
      setModalOpen(true)
    }
    
    const UnFollow = async(people) => {
      console.log("byebye ", people)
      
      await octokit.request('DELETE /user/following/{username}', {
        username: people
      })  

      }

      const Test = async() => {
        console.log("ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        setModalOpen(false)
 
      }



      const checkisFollowing = async(fanfan) => {
        console.log(fanfan, "is following?")

        await octokit.request('GET /users/{username}/following/{target_user}', {
          username: user.login,
          target_user: fanfan
        }).then(console.log(res))
        return("1")
 
      }

    const Follow = async(people) => {
      console.log("salut", people)
      await octokit.request('PUT /user/following/{username}', {
      username: people
      })
      }

  
      
    const isFollowed = async(people) => {
      console.log("a")
      return(3)
    }
    
    const getData = async() => {
        const {data} = await octokit.request("/user");

       const myfollowers = await octokit.request('GET /users/{username}/followers', {
        username: data.login
      })
      setFollowers(myfollowers.data)
      const myfollowings = await octokit.request('GET /users/{username}/following', {
        username: data.login
      })
      setFollowings(myfollowings.data)

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
            <SafeAreaView>
              <Modal visible={modalOpen} animationType='slide'>

                {modalselector == "followers"?
                <SafeAreaView>
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
                  {followers.map((followers) =>{
                    return(
                      
                     <Text>
                   {followers.login}
                   <Text>
                    isFollowing?
                   </Text>
                   {checkisFollowing(followers.login)}
                   


                    <Text>  
                   <TouchableOpacity style={{flexDirection:"row", borderWidth:2}} onPress={() => Follow(followers.login)}>
                <Text> S'abonner</Text>
                  </TouchableOpacity>
                  </Text>

                   <Text>  
                   <TouchableOpacity style={{flexDirection:"row", borderWidth:2}} onPress={() => UnFollow(followers.login)}>
                <Text> Se désabonner</Text>
                  </TouchableOpacity>
                  </Text>
                   {"\n"}
                   </Text>)   
                  })}
                  </Text>
              </SafeAreaView>: null }

              {/* MODAL SELECTOR */}
              {modalselector == "followings"?
                <SafeAreaView>
                <MaterialIcons
                name='close'
                style={styles.modalToggle}
                size={24}
                onPress={() => Test()}
                />
                <Text style={{textAlign:"center"}}>
                  Followings
                  </Text>
                <Text style={{ flexDirection:"row", marginLeft:"5%"}}>
                  {followings.map((followings, index) =>{
                    return(
                      MymodalFollowing(followings)
                   )
                   
                  })}
                </Text>
              </SafeAreaView>: null }
                 </Modal>
              <View>
                <View style={{flexDirection:"row", left:"40%", marginTop:30}}> 
              <Image style={{width:80, height:80}}source={{uri: user.avatar_url}} />
              <Text style={styles.nametitle}> {user.login}</Text>
              </View> 
              {console.log("ah")}
              <View style={{flexDirection:"row"}}> 

              { user.twitter_username ? <Text style={styles.twitter2}>  @{user.twitter_username} </Text> : <Text style={styles.twitter2}>  @notdefined   </Text> }
              { user.name ? <Text style={styles.twitter2}>  Name: {user.name} </Text> : <Text style={styles.twitter2}>  no name provided </Text> }
              </View>

              </View>
              <View style={{flexDirection:"row", marginTop:"2%"}}> 
              <View style ={{ width:"30%", borderRadius:5, borderWidth:2, backgroundColor: "white"}}>         
              { user.company ? <Text> Company : {user.company} </Text> : <Text>  no company provided </Text> }
              { user.email ? <Text> Email: {user.email} </Text> : <Text>  no email </Text> }
              </View>

              <View style ={{ width:"30%", borderRadius:5, borderColor:"black", borderWidth:2, marginLeft: "3%", backgroundColor: "white"}}>

              { user.blog ? <Text>  {user.blog} </Text> : <Text>  no blog </Text> }
              </View>
              <View style ={{ width:"30%", borderRadius:5, borderWidth:2, marginLeft:"3%", backgroundColor: "white"}}>
              { user.bio ? <Text>  {user.bio} </Text> : <Text>  no bio </Text> }
              </View>
              </View>
      <View>
     <TouchableOpacity onPress={() => openmodal("followers")}
        style={styles.button}>
                <Text style={styles.textbutton}>Followers {user.followers}</Text>
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
      </SafeAreaView>
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
      textAlignVertical:'center',
        },



    twitter2: {
          textAlign:'center',
          textAlignVertical:'center',

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
