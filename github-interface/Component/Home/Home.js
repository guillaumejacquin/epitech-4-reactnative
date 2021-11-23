import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, Image, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Home({navigation}) {
    
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginVertical: 10}}>

                  {/* Repo list */}
                  <Text style={styles.title}>
                        My Work
                    </Text>
                  
                    <TouchableOpacity onPress={() => {navigation.navigate("Repositories")}}>
                        <View style={styles.statBar}>
                            <Text style={styles.cardTitle}>
                                My repositories
                            </Text>
                            <View style={{alignItems: "center"}}>
                                <Icon style={{marginRight: 20, marginLeft: 10}} name='arrow-right' />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {navigation.navigate("Issues")}}>
                        <View style={styles.statBar}>
                            <Text style={styles.cardTitle}>
                                My issues
                            </Text>
                            <View style={{alignItems: "center"}}>
                                <Icon style={{marginRight: 20, marginLeft: 10}} name='arrow-right' />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {navigation.navigate("PullRequests")}}>
                        <View style={styles.statBar}>
                            <Text style={styles.cardTitle}>
                                My pull requests
                            </Text>
                            <View style={{alignItems: "center"}}>
                                <Icon style={{marginRight: 20, marginLeft: 10}} name='arrow-right' />
                            </View>
                        </View>
                    </TouchableOpacity>

                  

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
        paddingVertical: 20,
        borderRadius: 10,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 5,
            height: 5}
        },
    cardTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginLeft: 20
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        padding: 20
    },
})