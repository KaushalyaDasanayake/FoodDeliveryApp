import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { hr80, btn1, titles, colors } from '../../globals/style';
import { AntDesign, FontAwesome, FontAwesome5, Feather, Fontisto } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { firebase } from '../../../Firebase/FirebaseConfig';

const SignupScreen = ({ navigation }) => {
    const [emailfocus, setEmailfocus] = useState(false);
    const [namefocus, setNamefocus] = useState(false);
    const [contactfocus, setcontatctfocus] = useState(false);
    const [passwordfocus, setPasswordfocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showcPassword, setcShowPassword] = useState(false);
    const [cpasswordfocus, setcPasswordfocus] = useState(false);

    //Taking User Data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const [customError, setCustomError] = useState('');
    const [successmsg, setSuccessmsg] = useState(null);

    const handleSignup = () => {
        const FormData = {
            email: email,
            password: password,
            //cpassword: cpassword,
            phone: phone,
            name: name,
            address: address
        }
        if (password != cpassword) {
            //alert("Password doesn't match");
            setCustomError("Password doesn't match");
            return;
        }
        else if (phone.length != 10) {
            setCustomError("Phone number must be at least 10 digit");
            return;
        }
        //User creation
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log("User created")
                    //setSuccessmsg("User created successfully")
                    const userRef = firebase.firestore().collection('UserData')

                    userRef.add(FormData).then(() => {
                        console.log('data added to firestore')
                        setSuccessmsg("User added successfully")
                    }).catch((error) => {
                        console.log('firestore error ', error)
                    })
                })
                //Email address already exists
                .catch((error) => {
                    console.log('Sign up firestore error ', error.message)
                    if (error.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use). ') {
                        setCustomError('Email alredy exists')
                    }
                    else if (error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
                        setCustomError('Invalid Email')
                    }
                    else if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                        setCustomError('Password should be at least 6 characters')
                    }
                    else {
                        setCustomError(error.message)
                    }
                })
        }
        //Internet Connection error
        catch (error) {
            console.log('System error ', error.message)
        }
    }

    return (
        <View style={styles.container}>
            {successmsg == null ?
                <View style={styles.container}>
                    <Text style={styles.head1}>Let's Sign Up</Text>
                    {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}

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
                                setCustomError('')
                            }}
                            onChangeText={(text) => setName(text)}
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
                                setCustomError('')
                            }}
                            onChangeText={(text) => setEmail(text)}
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
                                setCustomError('')
                            }}
                            onChangeText={(text) => setPhone(text)}
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
                                setCustomError('')
                            }}
                            onChangeText={(text) => setPassword(text)}

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
                                setCustomError('')
                            }}
                            onChangeText={(text) => setcPassword(text)}

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
                        <TextInput style={styles.input1} placeholder="Enter your Address"
                            onPress={() => {
                                setEmailfocus(false)
                                setPasswordfocus(false)
                                setShowPassword(false)
                                setNamefocus(false)
                                setcontatctfocus(false)
                                setCustomError('')
                            }}

                            onChangeText={(text) => setAddress(text)}
                        />
                    </View>

                    <TouchableOpacity style={btn1} onPress={() => handleSignup()}>
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

                :
                <View style={styles.container1}>
                    <Text style={styles.successmessage}>{successmsg}</Text>
                    <TouchableOpacity style={btn1} onPress={() => navigation.navigate('loginpage')}>
                        <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={btn1} onPress={() => setSuccessmsg(null)}>
                        <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
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
    errormsg: {
        color: 'red',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
        // borderColor: 'red',
        // borderWidth: 1,
        // borderRadius: 10,
        padding: 10,
    },
    container1: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    successmessage: {
        color: 'green',
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 10,
        padding: 7,
    }
})

export default SignupScreen

