import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, Image, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Repositories({navigation}) {
    const [repositories, setRepositories] = useState([
        {
            id:0,
            name: "React Native App"
        },
        {
            id:1,
            name: "Laravel Dashoard"
        },
    ]);
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginVertical: 15}}>

                  {/* Repo list */}
                  {repositories.map(repo => (
                    <TouchableOpacity onPress={() => {navigation.navigate("Repository", {name: repo.name, id: repo.id})}}>
                        
                        <View style={styles.statBar}>
                            <Text style={styles.cardTitle}>
                                {repo.name}
                            </Text>
                            <View style={{alignItems: "center"}}>
                                <Icon style={{marginRight: 20, marginLeft: 10}} name='arrow-right' />
                            </View>
                        </View>

                    </TouchableOpacity>
                  ))}
                  

              </View>
          </ScrollView>
        </SafeAreaView>
    )
}

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
        marginLeft: 20
    },
})