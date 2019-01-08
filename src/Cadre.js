import React from 'react';
import {View,StyleSheet,Dimensions} from 'react-native';

const {width,height} = Dimensions.get('window');
const x = height;
const y = width;
const Cadre = (props)=>{
	return(
		<View style={styles.cardeStyle}>
         {props.children}
		</View>
		);
}

const styles = StyleSheet.create({

cardeStyle: {
 //marginTop:80,
 //opacity:0.85,
 width:y-50,
 height:x, 
 
 backgroundColor:'#0C7C8E'
 //backgroundColor:'rgb(0,0,0)'
}
});
export default Cadre ;