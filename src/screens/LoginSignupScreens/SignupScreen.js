import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { hr80, btn1, titles, colors } from '../../globals/style';
import { AntDesign, FontAwesome, FontAwesome5, Feather, Fontisto } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import logo from '../../../assets/logo1.png';

const SignupScreen = ({ navigation }) => {
    const [emailfocus, setEmailfocus] = useState(false);
    const [namefocus, setNamefocus] = useState(false);
    const [passwordfocus, setPasswordfocus] = useState(false);
    const [contactfocus, setcontatctfocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showcPassword, setcShowPassword] = useState(false);
    const [cpasswordfocus, setcPasswordfocus] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.head1}>Let's Sign Up</Text>

            <View style={hr80}></View>

            <View style={styles.inputout}>
                <FontAwesome5 name="user" size={20} color={namefocus === true ? colors.col1 : colors.text2} />
                <TextInput style={styles.input} placeholder="Full Name"
                    onFocus={() => {
                        setNamefocus(true)
                        setEmailfocus(false)
                        setcontatctfocus(false)
                        setPasswordfocus(false)
                        setShowPassword(false)
                        setcPasswordfocus(false)
                        setcShowPassword(false)
                    }}
                />
            </View>

            <View style={styles.inputout}>
                <Fontisto name="email" size={21} color={emailfocus === true ? colors.col1 : colors.text2} />
                <TextInput style={styles.input} placeholder="Email"
                    onFocus={() => {
                        setEmailfocus(true)
                        setNamefocus(false)
                        setcontatctfocus(false)
                        setPasswordfocus(false)
                        setShowPassword(false)
                        setcPasswordfocus(false)
                        setcShowPassword(false)
                    }}
                />
            </View>

            {/* Phone Number */}

            <View style={styles.inputout}>
                <Feather name="phone" size={20} color={contactfocus === true ? colors.col1 : colors.text2} />
                <TextInput style={styles.input} placeholder="Contact No"
                    onFocus={() => {
                        setNamefocus(false)
                        setEmailfocus(false)
                        setcontatctfocus(true)
                        setPasswordfocus(false)
                        setShowPassword(false)
                        setcPasswordfocus(false)
                        setcShowPassword(false)
                    }}
                />
            </View>

            {/* Password start */}

            <View style={styles.inputout}>
                <MaterialCommunityIcons name="lock-outline" size={20} color={passwordfocus == true ? colors.col1 : colors.text2} />
                <TextInput style={styles.input} placeholder="Password"
                    onFocus={() => {
                        setNamefocus(false)
                        setEmailfocus(false)
                        setcontatctfocus(false)
                        setPasswordfocus(true)
                        setcPasswordfocus(false)
                    }}

                    secureTextEntry={showPassword === false ? true : false}
                />

                <Octicons name={showPassword == false ? "eye-closed" : "eye"} size={20} color="black"
                    onPress={() =>
                        setShowPassword(!showPassword)}
                />
            </View>

            {/* Confirm Password */}

            <View style={styles.inputout}>
                <MaterialCommunityIcons name="lock-outline" size={20} color={cpasswordfocus == true ? colors.col1 : colors.text2} />
                <TextInput style={styles.input} placeholder="Confirm Password"
                    onFocus={() => {
                        setNamefocus(false)
                        setEmailfocus(false)
                        setcontatctfocus(false)
                        setcPasswordfocus(true)
                        setPasswordfocus(false)
                    }}

                    secureTextEntry={showcPassword === false ? true : false}
                />

                <Octicons name={showcPassword == false ? "eye-closed" : "eye"} size={20} color="black"
                    onPress={() =>
                        setcShowPassword(!showcPassword)}
                />
            </View>

            {/* Password end */}

            {/* <Text style={styles.address}>Please enter your address</Text> */}
            <View style={styles.inputout}>
                <TextInput style={styles.input1} placeholder="Enter your Address" />
            </View>

            <TouchableOpacity style={btn1}>
                <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Sign Up</Text>
            </TouchableOpacity>

            {/* <Text style={styles.forgot}>Forgot Password</Text> */}
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
            <Text style={styles.signup}>Already have an account?
                <Text style={{ color: colors.text1 }} onPress={() => navigation.navigate('loginpage')}> Sign In</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: 40,
    },
    head1: {
        fontSize: titles.title3,
        color: colors.text2,
        textAlign: 'center',
        marginVertical: 0,
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
        fontSize: 15,
        marginLeft: 10,
        width: '80%',
    },
    address: {
        fontSize: 18,
        color: colors.text2,
        textAlign: 'center',
        marginTop: 20,
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
        marginBottom: 10,
        fontSize: 15,
    },
    google: {
        flexDirection: 'row',
    },
    gicon: {
        backgroundColor: '#fff',
        width: 50,
        marginHorizontal: 10,
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

export default SignupScreen

