import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { btn3, btn2, colors, hr80, incdecbtn, incdecinput, incdecout, navbtn, navbtnin, navbtnout, nonveg, veg } from '../globals/style';
import { AntDesign } from '@expo/vector-icons';

import { firebase } from '../../Firebase/FirebaseConfig';

const ProductView = ({ navigation, route }) => {

    const data = route.params;
    // console.log(data)
    const [ischecked, setischecked] = useState(false);
    const [quantity, setquantity] = useState('1');
    const [addonquantity, setaddonquantity] = useState('0');

    if (route.params === undefined) {
        navigation.navigate('homepage')
    }

    //Add to cart
    const addTocart = () => {
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);

        const data1 = { data, Addonquantity: addonquantity, Foodquantity: quantity }
        console.log(data1);

        docRef.get().then((doc) => {
            if (doc.exists) {
                docRef.update({
                    cart: firebase.firestore.FieldValue.arrayUnion(data1)
                })
                console.log('Updated')
            } else {
                docRef.set({
                    cart: [data1],
                })
                console.log('Added')
            }
            alert('Added to cart')
        })

    }

    const increaseQuantity = () => {
        setquantity((parseInt(quantity) + 1).toString())
    }
    const decreaseQuantity = () => {
        if (parseInt(quantity) > 1) {
            setquantity((parseInt(quantity) - 1).toString())
        }
    }

    const increaseAddonQuantity = () => {
        setaddonquantity((parseInt(addonquantity) + 1).toString())
    }
    const decreaseAddonQuantity = () => {
        if (parseInt(addonquantity) > 0) {
            setaddonquantity((parseInt(addonquantity) - 1).toString())
        }
    }

    const cartdata = JSON.stringify({ cart: [{ Addonquantity: addonquantity, Foodquantity: quantity, data }] });
    // console.log(typeof (cartdata))
    // console.log(cartdata)

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('homepage')} style={navbtnout}>
                <View style={navbtn}>
                    <AntDesign name="back" size={24} color="black" style={navbtnin} />
                </View>
            </TouchableOpacity>

            <View style={styles.container1}>
                <View style={styles.s1}>
                    <Image source={{
                        uri: data.foodImageUrl
                    }} style={styles.cardimgin} />
                </View>


                <View style={styles.s2}>
                    <View style={styles.s2in}>
                        <Text style={styles.head1}>{data.foodName}</Text>
                        <Text style={styles.head2}>Rs.{data.foodPrice}/-</Text>
                    </View>
                    <View style={styles.s3}>
                        <Text style={styles.head3}>About Food</Text>
                        <Text style={styles.head4}>{data.foodDescription}</Text>
                        <Text style={styles.head6}>Ingredients</Text>
                        <Text style={styles.head4}>{data.ingredients}</Text>
                        <Text style={styles.head6}>Special Ingredients</Text>
                        <Text style={styles.head4}>{data.spe_Ingredient}</Text>
                        <View style={styles.s3in}>
                            {data.foodType == 'veg' ? <Text style={veg}></Text> : <Text style={nonveg}></Text>}
                            <Text style={styles.head5}>{data.foodType}</Text>
                        </View>
                    </View>




                    <View style={styles.container2}>
                        <Text style={styles.txt1}>Location</Text>
                        <Text style={styles.txt2}>{data.restaurantName}</Text>
                        <View style={styles.container2in}>
                            <Text style={styles.txt3}>{data.restrauntAddressBuilding}</Text>
                            <View style={styles.dash}></View>
                            <Text style={styles.txt3}>{data.restrauntAddressStreet}</Text>
                            <View style={styles.dash}></View>
                            <Text style={styles.txt3}>{data.restrauntAddressCity}</Text>
                        </View>
                    </View>

                    {data.foodAddonPrice && <View style={styles.container3}>
                        <View style={hr80}></View>

                        <Text style={styles.txt3}>Add Extra </Text>
                        <View style={styles.c3in}>
                            <Text style={styles.text4}>{data.foodAddon}</Text>
                            <Text style={styles.text4}>Rs{data.foodAddonPrice}/-</Text>
                        </View>

                        <View style={incdecout}>

                            <Text onPress={() => increaseAddonQuantity()} style={incdecbtn}>+</Text>
                            <TextInput value={addonquantity} style={incdecinput} />
                            <Text onPress={() => decreaseAddonQuantity()} style={incdecbtn}>-</Text>

                        </View>
                        {/* <View style={hr80}></View> */}

                    </View>}

                    <View style={styles.container3}>
                        <View style={hr80}></View>

                        <Text style={styles.txt3}>Food Quantity</Text>
                        <View style={incdecout}>

                            <Text onPress={() => increaseQuantity()} style={incdecbtn}>+</Text>
                            <TextInput value={quantity} style={incdecinput} />
                            <Text onPress={() => decreaseQuantity()} style={incdecbtn}>-</Text>

                        </View>
                        <View style={hr80}></View>
                    </View>

                    <View style={styles.container4}>
                        {/* <View style={hr80}></View> */}

                        <View style={styles.c4in}>
                            <Text style={styles.txt2}>Total Price</Text>
                            {data.foodAddonPrice ?
                                <Text style={styles.txt3}>Rs.{
                                    ((parseInt(data.foodPrice) * parseInt(quantity))
                                        + parseInt(addonquantity) * parseInt(data.foodAddonPrice)).toString()

                                }/-</Text>

                                :
                                <Text style={styles.txt3}>Rs.{
                                    ((parseInt(data.foodPrice) * parseInt(quantity))).toString()
                                }/-</Text>
                            }
                        </View>

                        {/* <View style={hr80}></View> */}
                    </View>

                    <View style={styles.btncont}>
                        <TouchableOpacity style={btn2} onPress={() => { addTocart() }}>
                            <Text style={styles.btntxt}>Add to Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btn3}>
                            <Text style={styles.btntxt1} onPress={() => navigation.navigate('placeorder', { cartdata })}>Buy Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default ProductView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        width: '100%',

    },
    container1: {
        // position: 'absolute',
        // top: 0,
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    s1: {
        width: '100%',
        height: 300,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    cardimgin: {
        width: '100%',
        height: '100%',
    },
    s2: {
        width: '100%',
        padding: 20,
        position: 'relative',
        top: -10,
        backgroundColor: colors.col2,
        borderColor: 'black',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    s2in: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    head1: {
        fontSize: 20,
        fontWeight: '400',
        color: colors.text3,
        width: 150,
        marginRight: 10,
    },
    head2: {
        fontSize: 25,
        fontWeight: '200',
        color: colors.text3,
    },
    s3: {
        backgroundColor: colors.text1,
        padding: 20,
        borderRadius: 20,
    },
    head3: {
        fontSize: 20,
        fontWeight: '400',
        color: colors.text3,
    },
    head4: {
        marginVertical: 10,
        fontSize: 15,
        fontWeight: '400',
        color: colors.col2,
    },
    head6: {
        fontSize: 17,
        fontWeight: '400',
        color: colors.text3,
    },
    s3in: {
        backgroundColor: colors.col2,
        padding: 10,
        borderRadius: 10,
        width: 130,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    head5: {
        color: colors.text3,
        fontSize: 18,
        fontWeight: '300',
        marginLeft: 10,
    },
    btntxt: {
        backgroundColor: colors.text1,
        color: colors.col2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',

    },
    btntxt1: {
        backgroundColor: 'green',
        color: colors.col2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',

    },
    btncont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
    },
    container2: {
        width: '100%',
        backgroundColor: colors.col2,
        padding: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 10,
        elevation: 10,
        //alignItems: 'center',
    },
    txt1: {
        color: colors.text3,
        fontSize: 20,
        fontWeight: '350',

    },
    txt2: {
        color: colors.text3,
        fontSize: 20,
        fontWeight: '200',
        marginVertical: 10,

    },
    container2in: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt3: {
        color: colors.text3,
        fontSize: 15,
    },
    dash: {
        width: 1,
        height: 20,
        backgroundColor: colors.text1,
        marginHorizontal: 10,
    },
    c3in: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    container3: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    text4: {
        color: colors.text3,
        fontSize: 20,
        marginHorizontal: 10,
    },
    c4in: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    }
})