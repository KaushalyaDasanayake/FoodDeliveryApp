import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { colors } from '../globals/style'

// const carouseldata = [
//     {
//         id: 1,
//         image: '../../assets/banner/offer.jpg',
//     },
//     {
//         id: 2,
//         image: '../../assets/banner/delivery.jpg',
//     },
//     {
//         id: 3,
//         image: '../../assets/banner/bikedel.jpg',
//     },
//     {
//         id: 4,
//         image: '../../assets/banner/deliver.jpg',
//     }
// ]

const OfferSlider = () => {
    return (
        <View>
            <View style={styles.offerSlider}>
                <Swiper autoplay={true} autoplayTimeout={5} showsButtons={true} dotColor={colors.text2} activeDotColor={colors.text1}
                    nextButton={<Text style={styles.buttonText}>›</Text>} prevButton={<Text style={styles.buttonText}>‹</Text>}
                >
                    <View style={styles.slide}>
                        <Image source={require('../../assets/banner/deliver.jpg')} style={styles.banner} />
                    </View>
                    <View style={styles.slide}>
                        <Image source={require('../../assets/banner/offer.jpg')} style={styles.banner} />
                    </View>
                    <View style={styles.slide}>
                        <Image source={require('../../assets/banner/bikedel.jpg')} style={styles.banner} />
                    </View>
                    <View style={styles.slide}>
                        <Image source={require('../../assets/banner/delivery.jpg')} style={styles.banner} />
                    </View>
                </Swiper>
            </View>
        </View>
    )
}

export default OfferSlider

const styles = StyleSheet.create({
    offerSlider: {
        width: '100%',
        height: 200,
        backgroundColor: colors.col2,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    slide: {
        width: '100%',
        height: 200,
        backgroundColor: colors.col2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    banner: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    buttonText: {
        color: colors.col1,
        fontSize: 40,
        fontWeight: '500',
        backgroundColor: colors.col2,
        borderRadius: 20,
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 40,
    }
})