import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, veg, nonveg } from '../globals/style'

const Cardslider = ({ title, data }) => {
    //console.log(title)
    //console.log(data)
    return (
        <View style={styles.container}>
            <Text style={styles.cardsouthead}>
                {title}
            </Text>
            <FlatList style={styles.cardsout}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.one}>
                            <Image source={{
                                uri: item.foodImageUrl
                            }} style={styles.cardimg} />
                        </View>
                        <View style={styles.two}>
                            <Text style={styles.text1}>{item.foodName}</Text>
                            <View style={styles.s2in}>
                                <Text style={styles.text2}>Rs.{item.foodPrice}/=</Text>

                                {/* veg & non-veg */}
                                {item.foodType == 'veg' ? <Text style={veg}></Text> : <Text style={nonveg}></Text>}

                            </View>
                        </View>
                        <View style={styles.three}>
                            <Text style={styles.buybtn}>Buy</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default Cardslider

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    cardsouthead: {
        color: colors.text3,
        width: '90%',
        fontSize: 20,
        fontWeight: '450',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    cardsout: {
        width: '100%',
    },
    card: {
        width: 300,
        height: 300,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        backgroundColor: colors.col2,
    },
    cardimg: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    two: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text1: {
        fontSize: 16,
        color: colors.text3,
        fontWeight: '500',
        marginHorizontal: 5,
        width: 150,
    },
    text2: {
        fontSize: 18,
        color: colors.text2,
        marginHorizontal: 5,
    },
    s2in: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 6,
    },
    three: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 1,
        width: '100%',
    },
    buybtn: {
        backgroundColor: colors.text1,
        color: colors.col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',
    }
})