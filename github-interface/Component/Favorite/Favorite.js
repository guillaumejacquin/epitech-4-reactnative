import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';

export const countFavorites = async(length) => {
    return length
}

const Favorite = ({octokit, navigation}) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        getData()
    }, [octokit])

    const getData = async() => {
        await octokit.request("GET /user/starred")
        .then(res => {
            setFavorites(res.data);
        }).catch(error =>
            console.log("An error occured :", error)
        )
    }

    const deleteData = async(favorite) => {
        //TODO: catch
        octokit.rest.activity.unstarRepoForAuthenticatedUser({
            owner: favorite.owner.login,
            repo: favorite.name,
        }).then(res => {
            console.log(res);
        }).catch(error => {
            console.log("an error occured: ", error)
        });
    }

    countFavorites(favorites.length);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginVertical: 10}}>
                    <Text style={styles.title}>
                        <Icon name='star' /> Favoris
                    </Text>
                    {favorites.map((favorite, index) => (
                        <TouchableOpacity key={index} onPress={() => {navigation.navigate("Repository", {repo: favorite})}}>
                                <View style={styles.statBar}>
                                    <Text style={styles.cardTitle}>
                                        {favorite.full_name}
                                    </Text>
                                </View>
                                <View style={styles.statBar}>
                                    <Text style={styles.text}>
                                        {favorite.language}
                                    </Text>
                                    <Text style={styles.text}>
                                        <Icon name="star"/>
                                         {favorite.stargazers_count}
                                    </Text>
                                    <Text style={styles.text}>
                                         {(Date(favorite.updated_at)).split("G")[0]}
                                    </Text>
                                </View>
                                    <Button
                                        onPress={() => {
                                            if (favorite) {
                                                let tmp = favorites.concat()
                                                deleteData(favorite);
                                                tmp.splice(index, 1)
                                                setFavorites(tmp);
                                            }}}
                                            icon={<Icon name="star" color="gray"/>}
                                            title="Unstar"
                                            type="outline"
                                    />
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
        fontSize: 15,
        fontWeight: "700",
        marginLeft: 10,
        marginVertical: 4,
        marginRight: 20,
    },
    texte: {
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 20
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