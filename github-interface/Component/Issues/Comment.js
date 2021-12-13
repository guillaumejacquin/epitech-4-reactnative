import React, {useEffect, useState} from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements';

const Comment = ({octokit, navigation, route}) => {
    const issue = route.params.issue;
    const [comments, setComments] = useState([]);

    const getComments = async() => {
        await octokit.rest.issues.listComments({
            owner: issue.repository.owner.login,
            repo: issue.repository.name,
            issue_number: issue.number,
        }).then(res =>
            setComments(res.data))
        .catch(error =>
                console.log("an error occured", error)
        );
    }

    useEffect(() => {
        getComments()
    }, [octokit])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
                <View style={{flexDirection: "column", marginVertical: 10}}>
                    <Text style={styles.title}>
                        Comments
                    </Text>
                </View>
                {comments.map((comment, index) => (
                    <TouchableOpacity key={index} onPress={() => {navigation.navigate("postComment", {issue: issue})}}>
                    <View key={index} style={styles.statBar}>
                    <Text style={styles.cardTitle}>
                         {comment.body}
                    </Text>
                    </View>
                </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => state;

const connectComponent = connect(mapStateToProps, undefined);
export default connectComponent(Comment);

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