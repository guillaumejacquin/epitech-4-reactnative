import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { Buffer } from 'buffer';

const Issue = ({route, navigator, octokit}) => {
    const issue = route.params.issue;
    useEffect(() => {        
    })
    const description = () => {
        if (issue.description) {
            return issue.description;
        }
        return "No description provided"
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginVertical: 15}}>
                        <View style={styles.statBar}>
                            <Text style={styles.cardTitle}>
                                {description()}
                            </Text>
                        </View>
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
const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(Issue)