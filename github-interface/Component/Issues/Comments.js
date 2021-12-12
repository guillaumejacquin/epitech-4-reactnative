import React, {useEffect, useState} from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements';

const Comments = ({octokit, navigation, route}) => {
        //console.log(issue.number)
    //const data = issue.comments_url;
    //console.log("TESTTTT",data)
    //        await octokit.rest.issues.listComments({
    //        owner: issue.owner.login,
    //        repo: issue.repository.name,
    //        issue_number: issue.number,
    //      }).then(res =>
    //        setComments(res))
    //        .catch(error =>
    //            console.log("an error occured", error)
    //        );
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginVertical: 10}}>
                    <Text style={styles.title}>
                        Comments
                    </Text>
                    </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => state;

const connectComponent = connect(mapStateToProps, undefined);
export default connectComponent(Comments);

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