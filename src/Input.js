import React from 'react';
import {Text,TextInput,View,StyleSheet} from 'react-native'; 
const Input = (props)=>{
	return(
      <View style={styles.inputestyle}>
      <TextInput placeholder={props.PHolder} 
       underlineColorAndroid = "transparent"
       placeholderTextColor = "#fff"
      secureTextEntry={props.secureText}
      autoCorrect={false} 
      style={styles.input}
      onChangeText={props.changeText} 
      value={props.Query} />
      </View>
		); 
};
const styles = StyleSheet.create({
	inputestyle :{
          flex:1,
          flexDirection:'row',
          alignItems:'center',
          height:40,
	},
	input: {
		color:'#fff',
		fontSize: 14,
    textDecorationColor:'#fff',
		paddingLeft:4,
		paddingRight:4,
		flex:2			
	}
});
export default Input ;