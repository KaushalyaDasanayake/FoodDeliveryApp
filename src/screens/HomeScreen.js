import { View, Text, StyleSheet, StatusBar, TextInput } from 'react-native'
import React from 'react'
import HomeHeadNav from '../components/HomeHeadNav'
import Categories from '../components/Categories'
import OfferSlider from '../components/OfferSlider'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../globals/style'

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar />
            <HomeHeadNav />
            <View style={styles.searchbox}>
                <AntDesign name="search1" size={24} color="black" style={styles.searchicon} />
                <TextInput style={styles.input} placeholder="search" />
            </View>
            <Categories />
            <OfferSlider />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.col2,
        alignItems: 'center',
        width: '100%',
    },
    searchbox: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: colors.col2,
        borderRadius: 30,
        alignItems: 'center',
        padding: 10,
        margin: 20,
        elevation: 10,
    },
    input: {
        marginLeft: 10,
        width: '90%',
        fontSize: 17,
        color: colors.text2,
    },
    searchicon: {
        color: colors.text2,
    }
})

export default HomeScreen

