import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../globals/style';
import { Fontisto, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const HomeHeadNav = () => {
    return (
        <View style={styles.container}>
            <Fontisto name="nav-icon-a" size={20} color="black" style={styles.myicon} />
            <View style={styles.containerIn}>
                <Text style={styles.mytext}>Foodie</Text>
                <MaterialCommunityIcons name="food-outline" size={26} color="black" style={styles.myicon} />
            </View>
            <FontAwesome name="user-circle" size={26} color="black" style={styles.myicon} />
        </View>
    )
}

export default HomeHeadNav

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        backgroundColor: colors.col1,
        elevation: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    containerIn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    myicon: {
        color: colors.text1,
    },
    mytext: {
        color: colors.text1,
        fontSize: 24,
    }
})