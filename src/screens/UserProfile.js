import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { navbtn, navbtnin, colors, btn2, titles, navbtnout } from '../globals/style';
import { Fontisto, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import { firebase } from '../../Firebase/FirebaseConfig';

const UserProfile = ({ navigation }) => {
    const [userloggeduid, setUserloggeduid] = useState(null);
    const [userdata, setUserdata] = useState(null);

    // useEffect(() => {
    //     const checklogin = () => {
    //         firebase.auth().onAuthStateChanged((user) => {
    //             if (user) {
    //                 setUserloggeduid(user.uid);
    //             } else {
    //                 setUserloggeduid(null);
    //                 //navigation.navigate('loginpage');
    //             }
    //         })
    //     }
    //     checklogin();
    // }, [])

    // // Print User ID
    // //console.log(userloggeduid);

    // useEffect(() => {
    //     const getuserdata = async () => {
    //         const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid);
    //         const doc = await docRef.get();
    //         if (!doc.empty) {
    //             doc.forEach((doc) => {
    //                 setUserdata(doc.data());
    //             })
    //         }
    //         else {
    //             console.log('no user data');
    //         }
    //     }
    //     getuserdata();
    // }, [userloggeduid])

    //console.log(userdata);

    useEffect(() => {
        const checklogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
                // console.log(user);
                if (user) {
                    // navigation.navigate('home');
                    setUserloggeduid(user.uid);
                } else {
                    // No user is signed in.
                    console.log('no user');
                }
            });
        }
        checklogin();
    }, [])

    // console.log(userloggeduid);

    const getuserdata = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                setUserdata(doc.data());
            })
        }
        else {
            console.log('no user data');
        }
    }

    useEffect(() => {

        getuserdata();
    }, [userloggeduid]);

    // console.log(userdata);


    const [edit, setEdit] = useState(false);
    const [newname, setNewName] = useState('');
    const [newaddress, setNewAddress] = useState('');


    const updateuser = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            if (newname !== '') {
                doc.forEach((doc) => {
                    doc.ref.update({
                        name: newname
                    })
                })
            }
            if (newaddress !== '') {
                doc.forEach((doc) => {
                    doc.ref.update({
                        address: newaddress
                    })
                })
            }
            alert('your user data is updated');
            getuserdata();
            setEdit(false);
            setPasswordedit(false);
        }
        else {
            console.log('no user data');
        }
    }


    const [Passwordedit, setPasswordedit] = useState(false);
    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');


    const updatepassword = async () => {
        const reauthenticate = (oldpassword) => {
            var user = firebase.auth().currentUser;
            var cred = firebase.auth.EmailAuthProvider.credential(
                user.email, oldpassword);
            return user.reauthenticateWithCredential(cred);
        }
        let docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        let doc = await docRef.get();
        reauthenticate(oldpassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newpassword).then(() => {
                // alert("Password updated!");

                if (!doc.empty) {
                    doc.forEach((doc) => {
                        doc.ref.update({
                            password: newpassword
                        })
                    })
                    alert('your password is updated');
                }
            }).catch((error) => { alert('Server Issue'); });
        }).catch((error) => { alert('Wrong Password'); });
    }


    const logoutuser = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            alert('you are logged out');
            navigation.navigate('login');
        }).catch((error) => {
            // An error happened.
            alert('Server Issue');
        });
    }

    return (
        <View style={styles.containerout}>
            <TouchableOpacity onPress={() => navigation.navigate('homepage')} style={navbtnout}>
                <View style={navbtn}>
                    <AntDesign name="back" size={24} color="black" style={navbtnin} />
                </View>
            </TouchableOpacity>

            {edit == false && Passwordedit == false && <View style={styles.container}>
                <FontAwesome name="user-circle" size={80} color="black" style={styles.myicon} />
                {/* <Text style={styles.head1}>User Profile</Text> */}
                <View style={styles.containerin}>
                    <Text style={styles.head2}>Name: {userdata ? <Text style={styles.head2in}>
                        {userdata.name}
                    </Text> : 'loading'}</Text>

                    <Text style={styles.head2}>Email: {userdata ? <Text style={styles.head2in}>
                        {userdata.email}
                    </Text> : 'loading'}</Text>

                    <Text style={styles.head2}>Phone: {userdata ? <Text style={styles.head2in}>
                        {userdata.phone}
                    </Text> : 'loading'}</Text>

                    <Text style={styles.head2}>Address: {userdata ? <Text style={styles.head2in}>
                        {userdata.address}
                    </Text> : 'loading'}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    setEdit(!edit)
                    setPasswordedit(false)
                }}>
                    <View style={btn2}>
                        <Text style={styles.btntxt}>Edit Details</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setPasswordedit(!Passwordedit)
                    setEdit(false)
                }
                }>
                    <View style={btn2}>
                        <Text style={styles.btntxt}>Change Password</Text>
                    </View>
                </TouchableOpacity>
            </View>
            }
            {edit == true &&
                <View style={styles.container}>
                    <Text style={styles.head1}>Edit Profile</Text>
                    <View style={styles.containerin}>
                        <TextInput style={styles.input} placeholder='Name' onChangeText={(e) => setNewName(e)} />
                        <TextInput style={styles.input} placeholder='Address' onChangeText={(e) => setNewAddress(e)} />
                    </View>
                    <TouchableOpacity onPress={() => updateuser()}>
                        <View style={btn2}>
                            <Text style={styles.btntxt}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
            {Passwordedit == true &&
                <View style={styles.container}>
                    <Text style={styles.head1}>Change your Password</Text>
                    <View style={styles.containerin}>
                        <TextInput style={styles.input} placeholder='Old Password' onChangeText={(e) => setOldPassword(e)} />
                        <TextInput style={styles.input} placeholder='New Password' onChangeText={(e) => setNewPassword(e)} />
                    </View>
                    <TouchableOpacity onPress={() => updatepassword()}>
                        <View style={btn2}>
                            <Text style={styles.btntxt}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
            <TouchableOpacity onPress={() => logoutuser()}>
                <View style={btn2}>
                    <Text style={styles.btntxt}>Logout</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%',
    },
    containerout: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
    },
    myicon: {
        color: colors.col1,
        marginTop: 60,
        //fontSize: 40,
        fontWeight: '200',
        //marginVertical: 20,
    },
    containerin: {
        width: '70%',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.col1,
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
    },
    head2: {
        fontSize: 18,
        fontWeight: '400',
        marginTop: 20,

    },
    head2in: {
        fontSize: 18,
        fontWeight: '300',
    },
    inputout: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        // alignSelf: 'center',
        elevation: 20,
    },
    btntxt: {
        fontSize: 20,
        fontWeight: '400',
        color: 'white',
        textAlign: 'center',
        padding: 10
    },
    input: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 20,
    }
})