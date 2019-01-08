import React from 'react';
import {View,StyleSheet,Text,Dimensions} from 'react-native';
const {width,height} = Dimensions.get('window');
const y= height;
const x = width;
const Header = (props) => {
	return(
        <View>
  
        <View style={styles.HeaderStyle}>
         {props.children}
        </View>
        </View>
		);

} 
const styles = StyleSheet.create({
HeaderStyle: {
 //width:x,
  height:60,
  borderColor:'#0C7C8E',
  borderBottomWidth:1,
  //marginTop:20,
  backgroundColor:'#0C7C8E', 
  alignItems:'center',
  flexDirection:'row',
  top:0,
  right:0,
  left:0,
//   bottom:y-85,
  bottom:y-60,
}
});

export default Header;