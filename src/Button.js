import React from 'react';
import {TouchableOpacity,Text,StyleSheet} from 'react-native';


const Button = (props) =>{
	return(
		<TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
		<Text style={styles.textStyle}>{props.children}</Text>
    </TouchableOpacity>
		);
}

  const styles = StyleSheet.create({
  buttonStyle:{
  //textAlign:'left',
  justifyContent:'center',
  //alignItems:'left',
  borderBottomColor:'rgb(255,255,255)',
  alignSelf:'stretch',
  width:250,  
  height:50
  }, 
  textStyle:{
  	//alignSelf:'center',
    paddingTop:5,
    paddingLeft:8,
  	color:'rgb(255,255,255)',
    fontSize:16
  	
  }
});
export default Button;
