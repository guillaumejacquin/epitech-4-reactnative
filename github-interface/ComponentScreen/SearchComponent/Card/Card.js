import React from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import CardCells from './CardCells'

const Card = ({title, data, nav, navAllFile}) => {
    return (
        <View style={styles.table}>
            <Text style={styles.titleCard}>{title}</Text>
            <View style={{marginTop:10}}>
                {data.slice(0,3).map(item => (
                    <CardCells key={item.id} item={item} nav={nav}/>
                ))}
                {/* <FlatList 
                data={data}
                keyExtractor={(item) => {item.id.toString()}}
                renderItem = {({item}) => <CardCells item={item} nav={nav}/>}
                scrollEnabled={true}
                /> */}
            </View>
            <TouchableOpacity style={styles.more} onPress={() => navAllFile(data)}>
                <Text style={styles.titleMore}>See more ...</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    table:{
        padding:20
    },
    titleCard:{
        fontWeight:"bold",
        fontSize:18
    },
    more:{
        alignItems:"center",
        padding:15,
        backgroundColor:"white",
        borderTopWidth:0.5,
        borderTopColor:"#C7C7C7"
    },
    titleMore:{
        fontSize:18,
        fontWeight:"bold"
    }
})
