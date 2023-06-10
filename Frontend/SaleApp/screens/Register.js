import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard
} from 'react-native'
import axios from 'axios';
import { images, colors, icons, fontSizes } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { isValidEmail, isValidPassword } from '../utilies/validations'

function Register(props) {
    const [keyboardIsShown, setKeyboardIsShown] = useState(false)
    //states for validating
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    //states to store email/password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')
    const isValidationOK = () => email.length > 0 && password.length > 0
        && isValidEmail(email) == true
        && isValidPassword(password) == true
        && password == retypePassword

    useEffect(() => {
        //componentDidMount        
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShown(true)
        })
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShown(false)
        })
    })
    const insertData = async (gmail, password) => {
        try {
            const response = await axios.post(`https://apiservice20230520171820.azurewebsites.net/user-insert?gmail=${gmail}&password=${password}`);
            navigate('Login')
            alert(`Successfully registered branch`)
            // Xử lý kết quả từ server (nếu cần)
            console.log(response.data);
        } catch (error) {
            // Xử lý lỗi (nếu có)
            console.error(error);
        }
    };
    //navigation
    const { navigation, route } = props
    //functions of navigate to/back
    const { navigate, goBack } = navigation
    return <View
        style={{
            flex: 100,
            backgroundColor: colors.simply
        }}>
        <View style={{
            flex: 15,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>
            <Text style={{
                color: 'white',
                fontSize: fontSizes.h2,
                fontWeight: 'bold',
                width: '50%'
            }}>Already have an Account?</Text>
            <Image
                source={
                    images.login
                } style={{
                    width: 120,
                    height: 120,
                    alignSelf: 'center'
                }} />
        </View>
        <View style={{
            flex: 60,
            backgroundColor: 'white',
            padding: 15,
            margin: 15,
            borderRadius: 20,
        }}>
            <View style={{
                marginHorizontal: 15
            }}>
                <Text style={{
                    fontSize: fontSizes.h6,
                    color: colors.primary
                }}>Email:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setErrorEmail(isValidEmail(text) == true ?
                            '' : 'Email not in correct format')
                        setEmail(text)
                    }}
                    style={{
                        color: 'black'
                    }}
                    placeholder='example@gmail.com'
                    value={email}
                    placeholderTextColor={colors.placeholder}
                />
                <View style={{
                    height: 1,
                    backgroundColor: colors.primary,
                    width: '100%',
                    marginHorizontal: 15,
                    marginBottom: 5,
                    alignSelf: 'center'
                }} />
                <Text style={{
                    color: 'red',
                    fontSize: fontSizes.h6,
                    marginBottom: 10,
                }}>{errorEmail}</Text>
            </View>
            <View style={{
                marginHorizontal: 15
            }}>
                <Text style={{
                    fontSize: fontSizes.h6,
                    color: colors.primary
                }}>Password:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setErrorPassword(isValidPassword(text) == true ?
                            '' : 'Password must be at least 3 characters')
                        setPassword(text)
                    }}
                    style={{
                        color: 'black'
                    }}
                    secureTextEntry={true}
                    value={password}
                    placeholder='Enter your password'
                    placeholderTextColor={colors.placeholder}
                />
                <View style={{
                    height: 1,
                    backgroundColor: colors.primary,
                    width: '100%',
                    marginBottom: 10,
                    marginHorizontal: 15,
                    alignSelf: 'center'
                }} />
                <Text style={{
                    color: 'red',
                    fontSize: fontSizes.h6,
                    marginBottom: 15,
                }}>{errorPassword}</Text>
            </View>

            <View style={{
                marginHorizontal: 15,
            }}>
                <Text style={{
                    fontSize: fontSizes.h6,
                    color: colors.primary
                }}>Retype password:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setErrorPassword(isValidPassword(text) == true ?
                            '' : 'Password must be at least 3 characters')
                        setRetypePassword(text)
                    }}
                    style={{
                        color: 'black'
                    }}
                    value={retypePassword}
                    secureTextEntry={true}
                    placeholder='Re-Enter your password'
                    placeholderTextColor={colors.placeholder}
                />
                <View style={{
                    height: 1,
                    backgroundColor: colors.primary,
                    width: '100%',
                    marginBottom: 10,
                    marginHorizontal: 15,
                    alignSelf: 'center'
                }} />
                <Text style={{
                    color: 'red',
                    fontSize: fontSizes.h6,
                    marginBottom: 5,
                }}>{errorPassword}</Text>
            </View>

            <TouchableOpacity
                disabled={isValidationOK() == false}
                onPress={() => {
                    insertData(email, password) &&
                        alert('Successfully registered new branch')
                }}
                style={{
                    backgroundColor: isValidationOK() == true
                        ? colors.primary : colors.inactive,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                    alignSelf: 'center',
                    borderRadius: 18,
                    top: 25
                }}>
                <Text style={{
                    padding: 8,
                    fontSize: fontSizes.h3,
                    color: 'white'
                }}>Register</Text>
            </TouchableOpacity>
            {keyboardIsShown == false ? <View style={{
                flex: 20,
                top: 40
            }}>
                <View style={{
                    height: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 20
                }}>
                    <View style={{ height: 1, backgroundColor: colors.simply, flex: 1 }} />
                    <Text style={{
                        padding: 8,
                        fontSize: fontSizes.h6,
                        color: colors.primary,
                        alignSelf: 'center',
                        marginHorizontal: 5,
                    }}>Use other methods ?</Text>
                    <View style={{ height: 1, backgroundColor: colors.simply, flex: 1 }} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <Icon name='facebook' size={35} color={colors.fb} />
                    <View style={{ width: 15 }} />
                    <Icon name='google' size={35} color={colors.gg} />
                </View>

            </View> : <View style={{
                flex: 25,
            }}></View>}
        </View>


    </View>

} export default Register