import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native'
import axios from 'axios';
import { images, colors, icons, fontSizes } from '../constants'

const AddPhoneScreen = ({ route, navigation }) => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState()
    const [price, setPrice] = useState()
    const [rating, setRating] = useState()
    const [URL, setURL] = useState('')
    const { role_id } = route.params;
    const insertPhone = async (name, quantity, price, rating, URL, role_id) => {
        try {
            const response = await axios.post(`https://apiservice20230520171820.azurewebsites.net/phone-insert?name=${name}&quantity=${quantity}&price=${price}&rating=${rating}&URL=${URL}&role_id=${role_id}`);
            //navigate('Login') 

            // Xử lý kết quả từ server (nếu cần)
            console.log(response.data);
        } catch (error) {
            // Xử lý lỗi (nếu có)
            console.error(error);
        }
        //console.log(Login.login());
    };

    return (
        <View >
            <Text>Name Phone:</Text>
            <TextInput
                onChangeText={(text) => {
                    setName(text)
                }}
                style={{
                    color: 'black',
                    backgroundColor: 'white',
                    height: 40,
                    textAlign: 'center'
                }}
            //value={phone.quantitysale}
            ></TextInput>
            <Text>Quantity:</Text>
            <TextInput
                onChangeText={(text) => {
                    setQuantity(text)
                }}
                style={{
                    color: 'black',
                    backgroundColor: 'white',
                    height: 40,
                    textAlign: 'center'
                }}
            //value={phone.quantitysale}
            ></TextInput>
            <Text>Price:</Text>
            <TextInput
                onChangeText={(text) => {
                    setPrice(text)
                }}
                style={{
                    color: 'black',
                    backgroundColor: 'white',
                    height: 40,
                    textAlign: 'center'
                }}
            //value={phone.quantitysale}
            ></TextInput>
            <Text>Rating:</Text>
            <TextInput
                onChangeText={(text) => {
                    setRating(text)
                }}
                style={{
                    color: 'black',
                    backgroundColor: 'white',
                    height: 40,
                    textAlign: 'center'
                }}
            //value={phone.quantitysale}
            ></TextInput>
            <Text>URL:</Text>
            <TextInput
                onChangeText={(text) => {
                    setURL(text)
                }}
                style={{
                    color: 'black',
                    backgroundColor: 'white',
                    height: 40,
                    textAlign: 'center'
                }}
            //value={phone.quantitysale}
            ></TextInput>
            <TouchableOpacity
                onPress={() => {
                    insertPhone(name, quantity, price, rating, URL, role_id)
                        && alert('More successful products')
                }}

                style={{
                    backgroundColor: colors.inactive,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '70%',
                    alignSelf: 'center',
                    borderRadius: 18,
                    top: 20
                }}>
                <Text style={{
                    padding: 8,
                    fontSize: fontSizes.h2,
                    color: 'white'
                }}>Insert</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddPhoneScreen;