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
import PhoneItem from './PhoneItem';

function PhoneList({ route, navigation }) {

  const [phones, setPhones] = useState([]);
  //navigation
  const { role_id } = route.params;
  //let navigate = useNavigation();
  if ({ role_id } === null ? useEffect(() => {
    // Gọi API và lấy dữ liệu sản phẩm
    fetch(`https://apiservice20230520171820.azurewebsites.net/phone-by-branch?role_id=1`)
      .then(response => response.json())
      .then(data => setPhones(data))
      .catch(error => console.error(error));
  }, []) :
    useEffect(() => {
      // Gọi API và lấy dữ liệu sản phẩm
      fetch(`https://apiservice20230520171820.azurewebsites.net/phone-by-branch?role_id=${role_id}`)
        .then(response => response.json())
        .then(data => setPhones(data))
        .catch(error => console.error(error));
    }, []));
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
          renderItem={({ item }) => <PhoneItem phone={item} />}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        />
      </View>
      <View style={{
        height: 50,
        backgroundColor: colors.simply,
        flexDirection: 'row'
      }}>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddPhoneScreen', {
              role_id: role_id
            })
          }
          }

          style={{
            backgroundColor: colors.evaluate,
            justifyContent: 'center',
            alignItems: 'center',
            width: '40%',
            alignSelf: 'center',
            borderRadius: 10,
            marginRight: '10%',
            marginLeft: '5%'
          }}>
          <Text style={{
            padding: 8,
            fontSize: fontSizes.h2,
            color: 'white'
          }}>Add Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Revenue1', {
              role_id: role_id
            })
          }
          }

          style={{
            backgroundColor: colors.evaluate,
            justifyContent: 'center',
            alignItems: 'center',
            width: '40%',
            alignSelf: 'center',
            borderRadius: 10
          }}>
          <Text style={{
            padding: 8,
            fontSize: fontSizes.h2,
            color: 'white'
          }}>Revenue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PhoneList;
