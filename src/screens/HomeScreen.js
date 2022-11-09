import { View, Text, StyleSheet, StatusBar, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeadNav from '../components/HomeHeadNav'
import Categories from '../components/Categories'
import OfferSlider from '../components/OfferSlider'
import { AntDesign, EvilIcons } from '@expo/vector-icons'
import { colors } from '../globals/style'

//import firestore from '@react-native-firebase/firestore';
import { firebase } from '../../Firebase/FirebaseConfig';
import Cardslider from '../components/Cardslider'

const HomeScreen = () => {
    const [foodData, setFoodData] = useState([]);
    const [VegData, setVegData] = useState([]);
    const [NonVegData, setNonVegData] = useState([]);

    const foodRef = firebase.firestore().collection('FoodData');

    useEffect(() => {
        foodRef.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => doc.data()
            ))
        })
    }, [])

    useEffect(() => {
        setVegData(foodData.filter((item) => item.foodType == 'veg'))
        setNonVegData(foodData.filter((item) => item.foodType == 'non-veg'))
    }, [foodData])

    //console.log(foodData)
    // search box
    const [search, setSearch] = useState('')

    return (
        <ScrollView style={styles.container}>
            <StatusBar />
            <HomeHeadNav />
            <View style={styles.searchbox}>
                <AntDesign name="search1" size={24} color="black" style={styles.searchicon} />
                <TextInput style={styles.input} placeholder="Search" onChangeText={(e) => {
                    setSearch(e)
                }} />
            </View>

            {/* Search suggestions */}
            {search != '' && <View style={styles.seacrhresultsouter}>
                {/* <Text>Text your search</Text> */}
                <FlatList style={styles.searchresultsinner}
                    data={foodData}
                    renderItem={
                        ({ item }) => {
                            if (item.foodName.toLowerCase().includes(search.toLowerCase())) {
                                return (
                                    <View style={styles.searchresult}>
                                        <EvilIcons name="search" size={24} color="red" />

                                        <Text style={styles.searchresulttext}>{item.foodName}</Text>
                                    </View>
                                )
                            }
                        }
                    } />
            </View>}
            <Categories />
            <OfferSlider />
            <Cardslider title={"Special Foods"} data={foodData} />
            <Cardslider title={"Non-Veg Foods"} data={NonVegData} />
            <Cardslider title={"Veg Foods"} data={VegData} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.col2,
        //alignItems: 'center',
        width: '100%',
        //height: '100%',
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
    },
    seacrhresultsouter: {
        width: '100%',
        marginHorizontal: 30,
        height: '100%',
        backgroundColor: colors.col2,
    },
    searchresultsinner: {
        width: '100%',
    },
    searchresult: {
        width: '100%',
        flexDirection: 'row',
        padding: 5,
    },
    searchresulttext: {
        marginLeft: 10,
        fontSize: 15,
        color: colors.text3,
    }
})

export default HomeScreen

