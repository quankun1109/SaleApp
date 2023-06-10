import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors, fontSizes } from '../../constants/index'
import React, { useState, useEffect } from "react";
import PhoneItem2 from './PhoneItem2';
//import {phone as PhoneRepository, phone} from '../../repositories/index'


function PhoneList2(props) {

  const [phones, setPhones] = useState([]);
  //navigation
  const { navigation, route } = props
  //functions of navigate to/back
  const { navigate, goBack } = navigation
  //let navigate = useNavigation();
  useEffect(() => {
    // Gọi API và lấy dữ liệu sản phẩm
    fetch(`https://apiservice20230520171820.azurewebsites.net/phones`)
      .then(response => response.json())
      .then(data => setPhones(data))
      .catch(error => console.error(error));
  }, []);
  const [searchText, setsearchText] = useState('')
  return (
    <View style={{
      flex: 1
    }}>
      <View style={{
        height: 50,
        marginHorizontal: 10,
        marginStart: 15,
        marginTop: 20,
        flexDirection: 'row'
      }}>
        <Icon style={{
          position: 'absolute',
          top: 5,
          left: 7
        }}
          name='search'
          size={20}
          color={'black'}
          marginTop={2}>
        </Icon>
        <TextInput
          onChangeText={(text) => {
            setsearchText(text)
          }}
          style={{
            backgroundColor: colors.inactive,
            height: 35,
            flex: 1,
            marginEnd: 10,
            borderRadius: 10,
            opacity: 0.7,
            paddingStart: 30,
            color: 'white'
          }}>
        </TextInput>
        <Icon name='bars'
          size={30}
          color={'black'}
          marginTop={2}>
        </Icon>
      </View>
      <View style={{
        flex: 1
      }}>
        <FlatList
          data={phones.filter(eachPhone => eachPhone.namephone.toLowerCase().includes(searchText.toLowerCase()))}
          renderItem={({ item }) => <PhoneItem2 phone={item} />}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        />
      </View>
    </View>
  );
};

export default PhoneList2;
