import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { StyleSheet, CheckBox, Button, View, SafeAreaView, Text, Alert, Image, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';



const User = ({octokit}) => {
    const [user, setuser] = useState(undefined)
    const [modalOpen, setModalOpen] = useState(false);
    const [modalselector, setModalSelector] = useState(null);
    const [followers,  setFollowers ] = useState([])
    let isFollowers = []
    const [followings, setFollowings] = useState([])
    const [repo, setRepo] = useState(0)
    const [isSelected, setSelection] = useState(false);
    const [checkFollowingState, setCheckFollowingState] = useState([]);


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
        setModalOpen(false)
 
      }

      const checkisFollowing = async(isuserfollowing, index) => {
        var mylog = 0
        try {
          await octokit.request('GET /users/{username}/following/{target_user}', {
            username: user.login,
            target_user: isuserfollowing
          }).then(res=>mylog = ((res.status)))
          
          if (mylog == 204) {
            setCheckFollowingState("You follow him")
            isFollowers.push({following: true})
            console.log("following ", isuserfollowing, " nice ")
          } else {
            isFollowers.push({following: false})
          }
        }
       catch  {
          console.log("not following", isuserfollowing)
          setCheckFollowingState("You  don't follow him")
        } 
      }

    const Follow = async(people) => {
      console.log("salut", people)
      await octokit.request('PUT /user/following/{username}', {
      username: people
        })
      }

  
    const getData = async() => {
        const {data} = await octokit.request("/user");

      await octokit.request('GET /users/{username}/followers', {
        username: data.login
      }).then(res => {
        setFollowers( res.data , () => {
          res.data.map((follower, index) => {
            checkisFollowing(follower.login, index)
          })
        })
      })

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
            console.log(isFollowers)
        })
    }, [])

    var test = "a";
    if(user)
        return (
          <ScrollView>

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
                <Text style={{textAlign:"center", fontSize:40}}>
                  Followers
                  </Text>  
                  <Text style={{marginTop:"2%", justifyContent:"space-around", width:"100%", border:"solid"}}>
                  {followers.map((follower, index) =>{
                    

                    return(     
                     <Text>
                      <Text>  
                        <Text>
                        {/* {isFollowers.at(index).following ? "FOLLOW" : "NOT FOLLOW"} */}
                      </Text>
                  </Text>
                   {"\n"}
                   <Text style={{flexDirection:"row", justifyContent:"space-around"}}>
                   
                   <Text>   <TouchableOpacity style={{flexDirection:"row", justifyContent:"space-around"}}>
                    <Text style={{backgroundColor:"white", justifyContent:"space-around"}}> {follower.login}</Text>
                    </TouchableOpacity></Text>

                    <Text>   <TouchableOpacity style={{flexDirection:"row", justifyContent:"space-around"}}>
                    <Text style={{backgroundColor:"white", justifyContent:"space-around"}}> test</Text>
                    </TouchableOpacity></Text>


                    <Text>   <TouchableOpacity style={{flexDirection:"row", borderWidth:2, backgroundColor:"green", justifyContent:"space-around"}} onPress={() => Follow(follower.login)}>
                    <Text style={{backgroundColor:"green", justifyContent:"space-around", color:"white"}}> S'abonner</Text>

                    </TouchableOpacity></Text>

                    
                        <Text>  <TouchableOpacity style={{flexDirection:"row", borderWidth:2, justifyContent:"space-around"}} onPress={() => UnFollow(follower.login)}>
                        <Text style={{backgroundColor:"red", justifyContent:"space-around", color:"white"}}> Se désabonner</Text>

                  </TouchableOpacity></Text>
                      </Text>
                      {"\n"}
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
                <Text style={{textAlign:"center", fontSize:40}}>
                  Followings
                  </Text>
                <Text style={{ flexDirection:"row", marginLeft:"5%", marginTop:"5%", justifyContent:"space-around"}}>
                  {followings.map((followings, index) =>{
                    return(
                      <Text>
                      <Text style={{flexDirection: "row"}}>
                      <TouchableOpacity >
                        <Text style={{fontSize : 20}}>
                      {followings.login}
                        </Text>
                      </TouchableOpacity>
                         <Text>     
                         </Text>
                
                       <Text>  
                       <Text>   <TouchableOpacity style={{flexDirection:"row", borderWidth:2, backgroundColor:"green", justifyContent:"space-around"}} onPress={() => Follow(followings.login)}>
                    <Text style={{backgroundColor:"green", justifyContent:"space-around", color:"white"}}> S'abonner</Text>
                    </TouchableOpacity></Text>
                        </Text>



                        <Text>  <TouchableOpacity style={{flexDirection:"row", borderWidth:2, justifyContent:"space-around"}} onPress={() => UnFollow(followings.login)}>
                        <Text style={{backgroundColor:"red", justifyContent:"space-around", color:"white"}}> Se désabonner</Text>

                  </TouchableOpacity></Text>
                     {"\n"}
                     {"\n"}
                      </Text>           
                      </Text>
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
        </ScrollView>
        )

        
    else{
      return (
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <ActivityIndicator />
            </View>
        )
      }
}





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
