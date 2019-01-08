import React,{ Component } from 'react';
import {View,Text,Dimensions,StyleSheet} from 'react-native';


const { width, height } = Dimensions.get('window');
const y = height;
const x = width;


class Propos extends Component{


    render(){
      return(
                 <View style={styles.propos}>
                 <Text>Cette application est utilisé pour la geolocalisation au sein de la faculté des sciences de Tetouan .</Text>
                 <Text style={styles.textss}>Cette version est déstiné pour le test seulement</Text>
                 <View style={styles.propos1}>
                 <Text style={styles.texts}>Developper par :</Text>
                 <Text style={{color:"#0C7C8E"}}>ABOUHRAIT Mohammed</Text>
                 <Text style={{color:"#0C7C8E"}}>ZAOUIATI Abderrazak</Text>
                 <Text style={{color:"#0C7C8E"}}>EL HASSOUNI Badr eddine</Text>
                 <View style={{marginTop:25}}>
                 <Text style={{fontWeight: 'bold'}}>Encadré par :</Text>
                 <Text style={{color:"#0C7C8E"}}>Prof Badr Eddine El Mohajir</Text>
                 </View>
                 </View>
                 <View style={{marginTop:25}}>
                 <Text>Technologie de développement : React Native</Text>
                 <Text style={{marginTop:6}}>Version 2.0.0</Text>
                 </View>
                </View>
        );
      }   
}

export default Propos;



const styles = StyleSheet.create({
    propos:{
    justifyContent:'center',
     alignItems:'center',
     padding:20,
     paddingTop:40
    },
    propos1:{
     paddingTop:25
    },
    texts:{
      paddingTop:12,
      fontWeight: 'bold'
    },
    textss:{
       paddingTop:7
    }
});
