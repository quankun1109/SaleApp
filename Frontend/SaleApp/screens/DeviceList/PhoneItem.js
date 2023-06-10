import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { images, colors, fontSizes } from '../../constants/index'
import React, { useState, useEffect } from "react";
import axios from 'axios'

const PhoneItem = ({ phone, navigation }) => {
    const [quantity, setQuantity] = useState()
    const [quantitysale, setQuantitySale] = useState()
    const [inventoryPhone, setInventoryPhone] = useState('');
    const [displayValue, setDisplayValue] = useState('');

    const handleUpdate = (quantitysale, apiValueQuantitysale, apiValueInventory) => {
        if (quantitysale !== '') {
            const result = parseInt(apiValueQuantitysale, 10) + parseInt(quantitysale, 10);
            setDisplayValue(result.toString());
            const result2 = parseInt(apiValueInventory, 10) - parseInt(quantitysale, 10);
            setInventoryPhone(result2.toString());
            console.log(result, result2)
        }
    };

    const handleUpdateQuantity = (quantitysale, apiValueInventory) => {
        if (quantitysale !== '') {
            const result = parseInt(apiValueInventory, 10) + parseInt(quantitysale, 10);
            setInventoryPhone(result.toString());
        }
    };

    const updateQuantity = async (id, quantity) => {
        axios.put(`https://apiservice20230520171820.azurewebsites.net/${id}?quantity=${quantity}`)
            .then(response => {
                try {
                    const data = JSON.parse(response.data);

                } catch (error) {
                    console.error(error.response.data); // Xử lý lỗi khi phân tích dữ liệu JSON không thành công
                }
            })
            .catch(error => {
                console.error(error); // Xử lý lỗi trong quá trình gọi API
            });
    };

    const updateQuantitySale = async (id, quantitysale) => {
        axios.put(`https://apiservice20230520171820.azurewebsites.net/quantitysale/${id}?quantity=${quantitysale} `)
            .then(response => {
                try {
                    const data = JSON.parse(response.data);

                } catch (error) {
                    console.error(error.response.data); // Xử lý lỗi khi phân tích dữ liệu JSON không thành công
                }
            })
            .catch(error => {
                console.error(error); // Xử lý lỗi trong quá trình gọi API
            });
    };

    const updateInventory = async (id) => {
        axios.put(`https://apiservice20230520171820.azurewebsites.net/inventory/${id}`)
            .then(response => {
                try {
                    const data = JSON.parse(response.data);

                } catch (error) {
                    console.error(error.response.data); // Xử lý lỗi khi phân tích dữ liệu JSON không thành công
                }
            })
            .catch(error => {
                console.error(error); // Xử lý lỗi trong quá trình gọi API
            });
    };

    const deletePhone = async (id) => {
        axios.delete(`https://apiservice20230520171820.azurewebsites.net/delete-phone/${id}`)
            .then(response => {
                try {
                    const data = JSON.parse(response.data);

                } catch (error) {
                    console.error(error.response.data); // Xử lý lỗi khi phân tích dữ liệu JSON không thành công
                }
            })
            .catch(error => {
                console.error(error); // Xử lý lỗi trong quá trình gọi API
            });
    };

    return <View style={{
        flex: 1
    }}>
        <View style={{
            height: 215,
            paddingTop: 20,
            paddingStart: 10,
            flexDirection: 'row'
        }}>
            <View>
                <Image style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'cover',
                    borderRadius: 10,
                    marginTop: 25
                }}
                    source={
                        { uri: phone.urlphone }
                    }>
                </Image>

                <TouchableOpacity
                    onPress={() =>
                        deletePhone(phone.id)
                    }

                    style={{ padding: 5 }}>
                    <Text style={{
                        padding: 8,
                        fontSize: fontSizes.h4,
                        color: colors.out,
                        alignSelf: 'center',
                        marginTop: 10
                    }}>Delete</Text>
                </TouchableOpacity>
            </View>


            <View style={{
                //backgroundColor: 'green',
                flex: 1,
                marginHorizontal: 20
            }}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'black'
                }}>{phone.namephone}</Text>
                <View style={{
                    height: 1,
                    backgroundColor: 'black'
                }}></View>

                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: colors.inactive,
                    marginVertical: 1
                }}>Product code: {phone.id}</Text>
                {displayValue === '' ?
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: colors.inactive,
                        marginBottom: 1
                    }}>Number of products sold: {phone.quantitysale}</Text> :
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: colors.inactive,
                        marginBottom: 1
                    }}>Number of products sold: {displayValue}</Text>
                }
                {inventoryPhone === '' ?
                    <View>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: colors.inactive,
                            marginBottom: 1
                        }}>Number of products in stock: {phone.inventory}</Text>
                    </View>
                    : <View>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: colors.inactive,
                            marginBottom: 1
                        }}>Number of products in stock: {inventoryPhone}</Text>
                    </View>}
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: colors.inactive
                }}>Price: {phone.pricephone} $ </Text>

                <View style={{
                    flexDirection: 'row',
                    marginBottom: 5
                }}>
                    <Text style={{
                        color: colors.evaluate,
                        marginEnd: 5
                    }}>{phone.ratingphone}</Text>
                    <Icon name='star'
                        size={17}
                        color={colors.evaluate}
                        paddingTop={1.2}>
                    </Icon>

                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'column',
                        marginRight: 35
                    }}>
                        <TextInput
                            onChangeText={(text) => {
                                setQuantitySale(text)
                            }}
                            style={{
                                color: 'black',
                                backgroundColor: 'white',
                                height: 40,
                                textAlign: 'center'
                            }}
                            value={quantitysale}
                        ></TextInput>
                        <TouchableOpacity
                            onPress={() =>
                                updateQuantitySale(phone.id, parseInt(quantitysale, 10)) &&
                                updateInventory(phone.id) && handleUpdate(quantitysale, phone.quantitysale, phone.inventory)
                            }
                            style={{ padding: 5 }}>
                            <Text style={{
                                padding: 8,
                                fontSize: fontSizes.h4,
                                color: colors.primary,
                                alignSelf: 'center',
                                marginTop: -10
                            }}>Buy</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: 'column'
                    }}>
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
                            value={quantity}
                        ></TextInput>
                        <TouchableOpacity
                            onPress={() =>
                                updateQuantity(phone.id, parseInt(quantity, 10)) &&
                                updateInventory(phone.id) && handleUpdateQuantity(quantity, phone.inventory)

                            }
                            style={{ padding: 5 }}>
                            <Text style={{
                                padding: 8,
                                fontSize: fontSizes.h4,
                                color: colors.primary,
                                alignSelf: 'center',
                                marginTop: -10
                            }}>Update Quantity</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </View>
};

export default PhoneItem;

