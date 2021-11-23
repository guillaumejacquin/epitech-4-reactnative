import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const Card = ({navigation, title, navigate}) => {
    return (
        <TouchableOpacity onPress={() => {navigation.navigate(navigate)}}>
            <View style={styles.statBar}>
                <Text style={styles.cardTitle}>
                    {title}
                </Text>
                <View style={{alignItems: "center"}}>
                    <Icon style={{marginRight: 20, marginLeft: 10}} name='arrow-right' />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Card

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
})