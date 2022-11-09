import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { hr80, btn1, titles, colors } from '../../globals/style';
import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import logo from '../../../assets/logo1.png';

import { firebase } from '../../../Firebase/FirebaseConfig';

const LoginScreen = ({ navigation }) => {
    const [emailfocus, setEmailfocus] = useState(false);
    const [passwordfocus, setPasswordfocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    //Login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [customError, setcustomError] = useState('');

    //connect with firebase
    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log('Logged in successfully! ');
                //console.log(user);
                // ...

                navigation.navigate('welcomepage');
            })
            .catch((error) => {
                var errorMessage = error.message;
                //console.log(errorMessage);
                if (errorMessage === 'Firebase: The email address is badly formatted. (auth/invalid-email).'
                ) {
                    setcustomError('Please enter a valid email address')
                }
                else {
                    setcustomError('Incorrect email or password')
                }
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.head1}>Let's get something</Text>

            {/* Custom Error display */}
            {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}

            <View style={hr80}></View>

            <View style={styles.inputout}>
                <FontAwesome5 name="user" size={20} color={emailfocus === true ? colors.col1 : colors.text2} />
                <TextInput style={styles.input} placeholder="Email"
                    onFocus={() => {
                        setEmailfocus(true)
                        setPasswordfocus(false)
                        setShowPassword(false)
                        setcustomError('')
                    }}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputout}>
                <MaterialCommunityIcons name="lock-outline" size={20} color={passwordfocus == true ? colors.col1 : colors.text2} />
                <TextInput style={styles.input} placeholder="Password"
                    onFocus={() => {
                        setEmailfocus(false)
                        setPasswordfocus(true)
                        setcustomError('')
                    }}
                    onChangeText={(text) => setPassword(text)}

                    secureTextEntry={showPassword === false ? true : false}
                />

                <Octicons name={showPassword == false ? "eye-closed" : "eye"} size={20} color="black"
                    onPress={() =>
                        setShowPassword(!showPassword)}
                />
            </View>
            <TouchableOpacity style={btn1} onPress={() => handleLogin()}>
                <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Sign In</Text>
            </TouchableOpacity>

            <Text style={styles.forgot}>Forgot Password</Text>
            <Text style={styles.or}>OR</Text>
            <Text style={styles.social}>Sign In With </Text>

            {/* social media signup */}
            <View style={styles.google}>
                <TouchableOpacity>
                    <View style={styles.gicon}>
                        <AntDesign name="google" size={24} color="#EA4335" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.gicon}>
                        <FontAwesome name="facebook-f" size={24} color="#4267B2" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={hr80}></View>
            <Text style={styles.signup}>Don't have an account already?
                <Text style={{ color: colors.text1 }} onPress={() => navigation.navigate('signuppage')}> Sign up</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head1: {
        fontSize: titles.title3,
        color: colors.text2,
        textAlign: 'center',
        marginVertical: 15,
    },
    inputout: {
        flexDirection: 'row',
        width: '80%',
        marginVertical: 10,
        backgroundColor: colors.col2,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        // alignSelf: 'center',
        elevation: 30,
    },
    input: {
        fontSize: 18,
        marginLeft: 10,
        width: '80%',
    },
    forgot: {
        color: colors.text2,
        marginTop: 20,
        marginBottom: 10,
    },
    or: {
        color: colors.text1,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    social: {
        color: colors.text2,
        marginVertical: 10,
        fontSize: 15,
    },
    google: {
        flexDirection: 'row',
    },
    gicon: {
        backgroundColor: '#fff',
        width: 50,
        margin: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        elevation: 10,
    },

    logout: {
        width: "80%",
        height: "20%",
        //backgroundColor: '#fff',
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        height: '100%',
    },
})

export default LoginScreen

