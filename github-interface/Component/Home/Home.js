import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, Image, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Card from './Card';

export default function Home({navigation}) {
    
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginVertical: 10}}>

                    <Text style={styles.title}>
                        My Work
                    </Text>
                  <Card title={"My repositories"} navigation={navigation} navigate={"Repositories"}/>
                  <Card title={"My issues"} navigation={navigation} navigate={"Issues"}/>
                  <Card title={"My pull requests"} navigation={navigation} navigate={"PullRequests"}/>
              </View>
          </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "700",
        padding: 20
    },
})