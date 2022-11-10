import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, hr80 } from '../../globals/style';
import logo from '../../../assets/logo1.png'

import { firebase } from '../../../Firebase/FirebaseConfig';


const WelcomeScreen = ({ navigation }) => {
    const [userlogged, setUserlogged] = useState(null);

    //App Load (User logging)
    useEffect(() => {
        const checklogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
                // console.log(user);
                if (user) {
                    // navigation.navigate('home');
                    // console.log(user);
                    setUserlogged(user);
                } else {
                    // No user is signed in.
                    //setUserlogged(false);
                    console.log('no user');
                }
            });
        }
        checklogin();
    }, [])

    console.log(userlogged);
    //Signout in app
    const handlelogout = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            setUserlogged(null);
            console.log('User signed out');
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Foodie</Text>
            <View style={styles.logout}>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={hr80} />
            {/* <Text style={styles.text}>Find the best food around you at lowest price.</Text>
            <View style={hr80} /> */}

            {userlogged == null ?
                <View style={styles.btnout}>
                    <TouchableOpacity onPress={() => navigation.navigate('signuppage')}>
                        <Text style={styles.btn}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('loginpage')}>
                        <Text style={styles.btn}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.logged}>
                    {/* Display Logging user */}
                    <Text style={styles.txtlog}>Signed in as <Text style={styles.txtlogin}>{userlogged.email}</Text></Text>

                    <View style={styles.btnout}>
                        <TouchableOpacity onPress={() => navigation.navigate('homepage')}>
                            <Text style={styles.btn}>
                                Go to Home
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlelogout()}>
                            <Text style={styles.btn}>
                                Log Out
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff4242',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        color: colors.col1,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: '200',
    },
    logout: {
        width: "80%",
        height: "20%",
        //backgroundColor: '#fff',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    // text: {
    //     fontSize: 18,
    //     width: '80%',
    //     color: colors.col1,
    //     textAlign: 'center',
    // },
    btnout: {
        flexDirection: 'row',
    },
    btn: {
        fontSize: 20,
        color: colors.text1,
        textAlign: 'center',
        marginVertical: 30,
        marginHorizontal: 10,
        fontWeight: '700',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
    },
    logged: {
        alignItems: 'center',

    },
    txtlog: {
        fontSize: 16,
        color: colors.col1,
    },
    txtlogin: {
        fontSize: 16,
        color: colors.col1,
        fontWeight: '700',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    }

})
export default WelcomeScreen