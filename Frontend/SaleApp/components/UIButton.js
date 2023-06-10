import React, {Component} from "react"
import { 
    TouchableOpacity,
    Text 
} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'

function UIButton(props) {
    const {onPress, title, isSelected} = props
    return <TouchableOpacity
        onPress={props.onPress}
        style={{
            borderColor: 'white',
            borderWidth: 3,
            height: 50,
            borderRadius: 7,
            marginHorizontal: 30,
            marginVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isSelected == true ? 'white' : null
        }}>
        {isSelected == true && <Icon
            name={"check-circle"}
            size={20}
            style={{
                position: 'absolute',
                left: 10,
                color: 'green'
            }}>
        </Icon>}
        <Text style={{
            fontSize: 17,
            color: isSelected == true ? 'red' : 'white'
        }}>
            {props.title}
        </Text>
    </TouchableOpacity>
}
export default UIButton