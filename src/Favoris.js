import React,{ Component } from 'react';
import {View,Text,Alert,  Platform,FlatList, TouchableOpacity,AsyncStorage, ListView, StyleSheet, ActivityIndicator, Image,Switch, Dimensions,} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer';
import { Constants, Location, Permissions, IntentLauncherAndroid } from 'expo';
import Input from './Input';
import Cadre from './Cadre';
import Button1 from './Button';
import Header from './Header';

import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
const { width, height } = Dimensions.get('window');
const y = height;
const x = width;
const data = [];

class Favoris extends Component{


    constructor(props) {
       const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows(data),
            dataF :[],
            str:null,
            positionCourante: false,

            positionCurr: {

                latitude: 35.56149404096875,
                longitude: -5.363009199500084,

            }
        };
    }
        
  chargerFavorite(){

     AsyncStorage.getAllKeys((err, keys) => {
     AsyncStorage.multiGet(keys, (err, stores)=>{

       if (!err) {
            if (stores !== null) {
              data = []
              stores.map(item => 
               {
                 data.push({ key: item[0], value: item[1] });
                 this.setState({dataSource: this.state.dataSource.cloneWithRows(data)}) 
               })
            }
      
        }
         
    if(data.length === 0)
    {
      this.setState({dataSource: this.state.dataSource.cloneWithRows([])})  
    }
    });
    });
  }
  testFavorite=()=>{
     var n = data.length;
     if(n === 0)
     {
        return (<View style={{paddingTop:(y/2)-100,backgroundColor:'#ddd',flexDirection:'column',alignItems:'center'}}>
            <Text style={{color:'#FFF',fontSize:16}}>Aucun emploi dans votre liste de souhaits.</Text>
            </View>);
     }
     else{
        return null
     }
  }
  componentWillMount() {
    this.chargerFavorite();
    }

	    EmploisTempsSalle() {
        this._drawer.close();


        this.props.navigation.navigate('App');
    }  
     locatio() {
        IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS);
        this.popupDialog1.dismiss();
    }
    positionCourante(value) {

        if (value) {
            console.log('value === true')
            Location.getProviderStatusAsync()
                .then(status => {
                    if (!status.locationServicesEnabled) {
                        this._drawer.close()
                        this.popupDialog1.show()

                        console.log('location services desabled');
                    }
                    else {
                        this.setState({ positionCourante: value })
                        console.log('positionCourante === true')
                        if (Platform.OS === 'android' && !Constants.isDevice) {

                            console.log('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');

                        } else {
                            console.log('IN DEVICE ')
                            let testlocation = Expo.Location.watchPositionAsync({
                                enableHighAccuracy: true,
                                timeInterval: 1,
                                distanceInterval: 1
                            }, (loc) => {
                                if (loc.timestamp) {
                                    console.log('position trouve ')
                                    if (this.state.positionCourante) {
                                        this.setState({ positionCurr: { latitude: loc.coords.latitude, longitude: loc.coords.longitude } })
                                        console.log('Position activer')
                                    }
                                    else {
                                        this.setState({ positionCurr: { latitude: 35.56149404096875, longitude: -5.363009199500084 } })
                                        console.log('position desactiver')
                                    }
                                }
                                else {
                                    console.log('position pas trouve ')
                                }
                            });
                            this.testlocation && this.testlocation.remove();
                            this.testlocation = null;
                        }

                    }
                })

        }

        else {

            this.setState({ positionCourante: value })
            console.log('value === false')
            this.setState({ positionCurr: { latitude: 35.56149404096875, longitude: -5.363009199500084 } })
        }
    }
   navigateToEmploi(text){
  
    console.log(text)
             this.props.navigation.navigate('Table', {
               nomEmploi: text
        })
    }
    deleteFav(textt)
    {
          Alert.alert(
                'Message',
                "Voulez-vous supprimer l'emploi de "+textt,
                [
                    { text: 'Oui', onPress: (key)=>{this.confirmeSuppression(textt)}},
                    { text: 'Non', onPress: () => console.log('Non Pressed') },
                ],
                { cancelable: false }
            )
    }
    confirmeSuppression(key){
        AsyncStorage.removeItem(key)
        this.chargerFavorite();

    }
   renderRow(rowData){

        return(
            <View style={styles.itemView}> 
                <TouchableOpacity style = {styles.itemButton} onPress={(text)=>{this.navigateToEmploi(rowData.value)}}>
                    <Text style={styles.itemText}>
                        L'emploi de <Text style={{color:'#0C7C8E'}}> {rowData.key}</Text>
                    </Text>
                </TouchableOpacity>
                 <TouchableOpacity style={{height:40,width:40, margin:10,justifyContent:'center'}}  onPress={(textt)=>{this.deleteFav(rowData.key)}}>
                    <Image source={require('./images/delete.png')} style={styles.imageClear} />
                  </TouchableOpacity>
            </View>
        )
    }

	render(){
      return(
<View style={{width:x,height:y,backgroundColor:'#ddd'}}>
                    <PopupDialog
                        dialogTitle={<DialogTitle titleAlign='left' titleStyle={{ backgroundColor: '#14ABC4' }} titleTextStyle={{ color: '#fff', fontSize: 15 }} title="Localisation" />}
                        width={260}
                        height={205}
                        haveOverlay={true}

                        overlayOpacity={0}
                        dismissOnHardwareBackPress={false}
                        dismissOnTouchOutside={false}
                        ref={(popupDialog1) => { this.popupDialog1 = popupDialog1; }} >

                        <View>
                            <View style={{ height: 120, width: 260, alignItems: 'center', paddingTop: 5 }}>
                                <View style={{ height: 38, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ marginLeft: 14, paddingTop: 3, marginRight: 8, fontSize: 14, fontWeight: 'bold' }}>
                                        Autoriser le service de localisation puis réessayer
       </Text>
                                </View>
                                <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ paddingTop: 8, marginLeft: 14, marginRight: 8, fontSize: 12, fontStyle: 'italic' }}>
                                        Nous avons besoin de votre position GPS pour vous situer sur la carte
       </Text>
                                </View>
                            </View>
                            <View style={{ height: 25, marginTop: 1, width: 260, justifyContent: 'center', flexDirection: 'row' }}>

                                <View style={{ justifyContent: 'center', alignItems: 'center', width: 130, backgroundColor: '#fff' }}>
                                    <TouchableOpacity onPress={this.locatio.bind(this)}>
                                        <Text style={{ color: '#0C7C8E' }}>Paramètres</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ justifyContent: 'center', width: 130, alignItems: 'center', backgroundColor: '#fff' }}>
                                    <TouchableOpacity onPress={() => { this.popupDialog1.dismiss(); }}>
                                        <Text style={{ color: '#0C7C8E' }} >Annuler</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </PopupDialog>
                 
                    
                   <View style={styles.ViewContainer}>

                        <ListView
                            enableEmptySections={true}
                            style={styles.listContainer}
                            renderRow={this.renderRow.bind(this)}
                            dataSource={this.state.dataSource} />
                    <View style={{alignItems:'center',justifyContent:'center',paddingTop:15}}>{this.testFavorite()}</View>
                    </View>
            </View>
      	);
	  }   
}
export default Favoris;












let styles = StyleSheet.create({
    bb: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemView: {
        borderBottomWidth:1,
        borderColor:'#ddd',
        height: 67,
        paddingTop:5,
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',

    },
    itemButton:{
        height : 40,
        width : x-60,
        margin:10,
        paddingLeft:15,
        justifyContent:'center'
    },
    ViewContainer: {
       
        marginBottom: 40,
        width:x,
     
    },
    listContainer: {

        backgroundColor: 'rgba(255,255,255,0.8)'
    },
    itemText: {
        fontSize: 17,
        paddingLeft: 10,
        color: '#000',
        fontStyle: 'normal'

    },
    ViewStyle4: {
        width: x - 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ViewStyle5: {
        width: x - 50,
        height: 1,
        // borderWidth:1,
        backgroundColor: 'rgba(9, 95, 108, 1)'
        // borderBottomColor:'green'  
    },
    ViewStyle6: {
        width: x - 50,
        height: 50,

        backgroundColor: 'rgb(255,255,255)'
    },
    buttonStyle: {
        //textAlign:'left', 
        justifyContent: 'center',
        //alignItems:'left', 
        borderBottomColor: 'rgb(255,255,255)',
        alignSelf: 'stretch',
        width: 165,
        height: 50
    },
    textStyle: {
        //alignSelf:'center',
        paddingTop: 5,
        paddingLeft: 20,
        color: 'rgb(255,255,255)',
        fontSize: 16

    },
    over: {
        backgroundColor: 'rgb(0,0,0)'
    },
    ViewStyle3: {
        flexDirection: 'row',
        width: x - 50,
        height: 50
    },
    ViewStyle2: {
        flexDirection: 'row',
        width: 250,
        height: 50
    },
    ViewStyle: {
        width: x - 50,

        height: 140,
        // height:140,
        backgroundColor: '#000',
    },
    imageDrawer: {
        //width:x-50,
        width: x - 63,
        height: 120,
        //height:70,
        flex: 1
    },
    polygon: {
        flex: 1
    },
    marker: {
        width: 180,
        height: 250,
        flex: 1
    },
    containers: {
        flex: 1
    },
    map: {
        top: 85,

        right: 0,
        left: 0,
        bottom: 0,
        position: 'absolute'
        /**/
        //...StyleSheet.absoluteFillObject
    },
    btnInscriptionx: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
        width: 85,
        height: 35,
        backgroundColor: 'rgb(0,68,136)'
    },
    TextInscription: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12
    },
    btnInscription1: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: 30,
        height: 30
    },
    image2: {
        width: 27,
        height: 27
    },
    imageClear: {
        width: 30,
        height: 30
    },
    image3: {
        width: 31,
        height: 31,
        marginTop: 8,
        marginLeft: 13
    },
    cc: {
        backgroundColor: 'rgba(8, 78, 89, 0.45)',
        borderColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        width: x - 100,
        height: 40,
        paddingLeft: 12,
        paddingRight: 12
    },
    container: {
        marginTop: 35,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'
    },
    head: { height: 120, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 100 },
    text: { textAlign: 'center' },
    body: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});
