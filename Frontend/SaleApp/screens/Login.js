import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native'
import axios from 'axios';
import { images, colors, icons, fontSizes } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { isValidEmail, isValidPassword } from '../utilies/validations'
import Register from './Register';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PhoneList from './DeviceList/PhoneList';
import AddPhoneScreen from './AddPhoneScreen';
import UITab from '../navigation/UITab';
import { Welcome, Revenue1 } from '.';


function Login({ navigation }) {

    const [keyboardIsShown, setKeyboardIsShown] = useState(false)
    //states for validating
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    // user
    const [user, setUser] = useState('');
    //states to store email/password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isValidationOK = () => email.length > 0 && password.length > 0
        && isValidEmail(email) == true
        && isValidPassword(password) == true

    useEffect(() => {
        //componentDidMount
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShown(true)
        })
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShown(false)
        })
    })
    //     fetch('https://localhost:7148/api/users')
    //   .then(response => {
    //     // xử lý dữ liệu nhận được
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     // xử lý lỗi khi yêu cầu không thành công
    //     console.error(error);
    //   });
    const login = async () => {

        let response = await axios.get(`https://apiservice20230520171820.azurewebsites.net/user?email=${email}&password=${password}`)
        if (response.data.role_id === -1) {
            alert('Incorrect account or password')
        }
        else if (response.data.role_id === 0) {
            navigation.navigate('UITab', {
                role_id: response.data.role_id
            });
        }
        else {
            navigation.navigate('PhoneList', {
                role_id: response.data.role_id,
            });
        }
    }

    //navigation


    return <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
            flex: 100,
            backgroundColor: 'white'
        }}>
        <View style={{
            flex: 25,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>

            <Text style={{
                color: 'black',
                fontSize: fontSizes.h2,
                fontWeight: 'bold'
            }}>Already have an Account?</Text>

            <Image source={images.login}
                style={{
                    width: 100,
                    height: 100
                }} />
        </View>

        <View style={{
            flex: 25
        }}>

            <View style={{
                marginHorizontal: 20,
            }}>

                <Text style={{
                    color: 'black',
                    fontSize: fontSizes.h3
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
                    keyboardType='email-address'
                    placeholder='example@gmail.com'
                    value={email}
                    placeholderTextColor={colors.placeholder}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <View style={{
                    height: 1,
                    backgroundColor: 'black',
                    width: '100%',
                    marginBottom: 10,
                }} />

                <Text style={{
                    color: 'red'
                }}>{errorEmail}</Text>
            </View>

            <View style={{
                marginHorizontal: 15
            }}>

                <Text style={{
                    color: 'black',
                    fontSize: fontSizes.h3
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
                    placeholder='Enter your password'
                    value={password}
                    placeholderTextColor={colors.placeholder}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <View style={{
                    height: 1,
                    backgroundColor: 'black',
                    width: '100%',
                    marginBottom: 10,
                }} />

                <Text style={{
                    color: 'red'
                }}>{errorPassword}</Text>
            </View>
        </View>

        {keyboardIsShown == false ? <View style={{
            flex: 15
        }}>
            <TouchableOpacity
                disabled={isValidationOK() == false}
                onPress={() => login()
                    // {


                    // if(user === 0){
                    //     navigate ('UITab')        
                    // }else{
                    //     Alert('Login sai')
                    // } 
                    // }
                }

                style={{
                    backgroundColor: isValidationOK() == true
                        ? colors.primary : colors.inactive,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '70%',
                    alignSelf: 'center',
                    borderRadius: 18
                }}>
                <Text style={{
                    padding: 8,
                    fontSize: fontSizes.h2,
                    color: 'white'
                }}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Register')
                }}
                style={{ padding: 5 }}>
                <Text style={{
                    padding: 8,
                    fontSize: fontSizes.h4,
                    color: colors.primary,
                    alignSelf: 'center',
                }}>New user? Register now</Text>
            </TouchableOpacity>

        </View> : <View style={{
            flex: 15
        }}></View>}

        {keyboardIsShown == false ? <View style={{
            flex: 20,
        }}>

            <View style={{
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20
            }}>
                <View style={{ height: 1, backgroundColor: 'black', flex: 1 }} />

                <Text style={{
                    color: 'black',
                    alignSelf: 'center',
                    fontSize: 15,
                    marginHorizontal: 10
                }}>Use other methods?</Text>

                <View style={{
                    height: 1,
                    backgroundColor: 'black',
                    flex: 1
                }} />
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center'
            }}>

                <Icon name='facebook'
                    size={40}
                    color={colors.fb}></Icon>

                <View style={{
                    width: 30
                }} />
                <Icon name='google'
                    size={40}
                    color={colors.gg}></Icon>
            </View>

        </View> : <View style={{
            flex: 25,
        }}></View>}
    </KeyboardAvoidingView>
}
const Stack = createNativeStackNavigator();
const screenOptions = ({ route }) => ({
    headerShown: false
})
const ProductList = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome' screenOptions={screenOptions}>
                <Stack.Screen name={"Welcome"} component={Welcome}></Stack.Screen>
                <Stack.Screen name={"Login"} component={Login}></Stack.Screen>
                <Stack.Screen name={"Register"} component={Register}></Stack.Screen>
                <Stack.Screen name={"PhoneList"} component={PhoneList}></Stack.Screen>
                <Stack.Screen name={"AddPhoneScreen"} component={AddPhoneScreen}></Stack.Screen>
                <Stack.Screen name={"Revenue1"} component={Revenue1}></Stack.Screen>
                <Stack.Screen name={"UITab"} component={UITab}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default ProductList
