import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import Search from '../Search/Search';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';

const Favorite = ({octokit, navigation}) => {
    const [favorites, setFavorites] = useState([{}])
    const [deleteStar, setDelete] = useState();
    
    const getData = async() => {
        const { data } = await octokit.request("GET /user/starred");
        return data
    }
    const deleteD = async(favorite) => {
        octokit.rest.activity.unstarRepoForAuthenticatedUser({
            owner: favorite.owner.login,
            repo: favorite.name,
        }).then(res => {
            console.log(res);
            setDelete()
        });
    }

    useEffect(() => {
        getData().then(res => {
            setFavorites(res);
        });
    }, [octokit])


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginVertical: 10}}>
                    <Text style={styles.title}>
                        <Icon name='star' /> Favoris
                    </Text>
                    {favorites.map(favorite => (
                        <TouchableOpacity onPress={() => console.log("lol")}>
                            <Text style={styles.cardTitle}>
                                <View style={styles.statBar}>
                                    <Text style={styles.cardTitle}>
                                        {favorite.name}
                                    </Text>
                                    <Button
                                        onPress={() => {
                                            const oldFavorite = favorite;
                                            if (favorite) {
                                                deleteD(favorite)
                                                .then(res => console.log(res))
                                                .catch(error =>
                                                    console.log("An error occured :", error)
                                                );
                                            } 
                                        }}    
                                            icon={<Icon name="star" color="gray"/>}
                                            title="Starred"
                                            type="outline"
                                    />
                                    </View>
                                </Text>
                            </TouchableOpacity>
                  ))
                }
              </View>
          </ScrollView>
        </SafeAreaView>
    )
            }   

const mapStateToProps = state => state;
const connectComponent = connect(mapStateToProps, undefined)

export default connectComponent(Favorite)

const styles = StyleSheet.create({
    statBar: {
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 10,
        marginVertical: 7,
        backgroundColor: "white",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderRadius: 10,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 5,
            height: 5}
        },
    cardTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginLeft: 20,
        marginVertical: 4,
        marginRight: 20
    },
    texte: {
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 50
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        padding: 20
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "700",
        padding: 30
    }
})