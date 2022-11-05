import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../globals/style'

const Categories = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.box}>
                    <FontAwesome5 name="hamburger" size={24} color="black" style={styles.icon} />
                    <Text style={styles.text}>Burger</Text>
                </View>
                <View style={styles.box}>
                    <FontAwesome5 name="pizza-slice" size={24} color="black" style={styles.icon} />
                    <Text style={styles.text}>Pizza</Text>
                </View>
                <View style={styles.box}>
                    <MaterialCommunityIcons name="pasta" size={24} color="black" style={styles.icon} />
                    <Text style={styles.text}>Pasta & Noodles</Text>
                </View>
                <View style={styles.box}>
                    <MaterialCommunityIcons name="cupcake" size={24} color="black" style={styles.icon} />
                    <Text style={styles.text}>Dessert & Candy</Text>
                </View>
                <View style={styles.box}>
                    <FontAwesome5 name="birthday-cake" size={24} color="black" style={styles.icon} />
                    <Text style={styles.text}>Cakes</Text>
                </View>
                <View style={styles.box}>
                    <MaterialCommunityIcons name="food-fork-drink" size={24} color="black" style={styles.icon} />
                    <Text style={styles.text}>Drinks & Beverage</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.col2,
        //alignItems: 'center',
        width: '90%',
        elevation: 10,
        borderRadius: 10,
    },
    head: {
        color: colors.col1,
        fontSize: 20,
        fontWeight: '300',
        margin: 10,
        alignSelf: 'center',
        paddingBottom: 5,
    },
    box: {
        backgroundColor: colors.col2,
        elevation: 20,
        margin: 10,
        padding: 4,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    icon: {
        marginRight: 10,
        color: colors.text3,
    },
    text: {
        color: colors.text3,
    }
})