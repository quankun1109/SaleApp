import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Button,
  RefreshControl
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { images, colors, fontSizes } from '../../constants/index'
import React, { useState, useEffect } from "react";
import axios from 'axios'

const PhoneItem2 = ({ phone }) => {
  const [quantity, setQuantity] = useState()
  const [quantitysale, setQuantitySale] = useState()

  const updateGmail = async (id, quantity) => {
    axios.put(`https://apiservice20230520171820.azurewebsites.net/2/${id}?quantity=${quantity}`)
      .then(response => {
        try {
          const data = JSON.parse(response.data);
          console.log(data); // Xử lý dữ liệu trả về từ API
        } catch (error) {
          console.error(error.response.data); // Xử lý lỗi khi phân tích dữ liệu JSON không thành công
        }
      })
      .catch(error => {
        console.error(error); // Xử lý lỗi trong quá trình gọi API
      });
  };

  const updateQuantitySale = async (id, quantitysale) => {
    axios.put(`https://apiservice20230520171820.azurewebsites.net/quantitysale2/${id}?quantitysale=${quantitysale}`)
      .then(response => {
        try {
          const data = JSON.parse(response.data);
          console.log(data); // Xử lý dữ liệu trả về từ API
        } catch (error) {
          console.error(error.response.data); // Xử lý lỗi khi phân tích dữ liệu JSON không thành công
        }
      })
      .catch(error => {
        console.error(error); // Xử lý lỗi trong quá trình gọi API
      });
  };

  const updateInventory = async (id) => {
    axios.put(`https://apiservice20230520171820.azurewebsites.net/inventory2/${id}`)
      .then(response => {
        try {
          const data = JSON.parse(response.data);
          console.log(data); // Xử lý dữ liệu trả về từ API
        } catch (error) {
          console.error(error.response.data); // Xử lý lỗi khi phân tích dữ liệu JSON không thành công
        }
      })
      .catch(error => {
        console.error(error); // Xử lý lỗi trong quá trình gọi API
      });
  };

  const deletePhone = async (id) => {
    axios.delete(`https://apiservice20230520171820.azurewebsites.net/delete-phone2/${id}`)
      .then(response => {
        try {
          const data = JSON.parse(response.data);
          console.log(data); // Xử lý dữ liệu trả về từ API
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
      height: 170,
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
        }}>Branch {phone.role_id}</Text>
        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: colors.inactive,
          marginVertical: 1
        }}>Product code: {phone.id}</Text>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: colors.inactive,
          marginBottom: 1
        }}>Number of products sold: {phone.quantitysale}</Text>

        <View>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: colors.inactive,
            marginBottom: 1
          }}>Number of products in stock: {phone.inventory}</Text>
        </View>

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







      </View>

    </View>
  </View>
};

export default PhoneItem2;