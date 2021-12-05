import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { Buffer } from 'buffer';

const FileViewer = ({route, navigation}) => {
    const file = route.params.file;
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
             <View style={styles.statBar}>
                <Text style={styles.cardTitle}>
                    {file.name}
                </Text>
            </View>
          <ScrollView>
              <View style={{flexDirection: "column", marginTop: 30}}>


                <Text style={styles.code}>{Buffer.from(file.content, 'base64').toString('ascii')}</Text>
                  
              </View>
          </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    statBar: {
        textAlign: 'center',
        alignItems: "center",
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
            height: 5
        }
    },
    cardTitle: {
        textAlign: 'center',
    },
    code: {
        marginHorizontal: 20
    }
})

const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(FileViewer)