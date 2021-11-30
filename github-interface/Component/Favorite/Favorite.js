import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

const Favorite = ({octokit}) => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginVertical: 10}}>

                    <Text style={styles.title}>
                        Overview
                    </Text>
                    <Text style={styles.subTitle}>
                        favorites doesn't have any public repositories yet
                    </Text>
                  <Card title={"Repositories"} navigation={navigation} navigate={"Repositories"}/>
                  <Card title={"Projects"} navigation={navigation} navigate={"Issues"}/>
                  <Card title={"Packages"} navigation={navigation} navigate={"PullRequests"}/>
              </View>
          </ScrollView>
        </SafeAreaView>
    )
}

// export default Favorite

const styles = StyleSheet.create({})
const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(Favorite)
const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "700",
        padding: 20
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "700",
        padding: 30
    },
})

export default Favorite
