import React, { Component } from 'react';
import { View, Platform,AsyncStorage, StyleSheet, Text, Image, TouchableOpacity, Alert, Switch, Dimensions, ListView, TouchableHighlight, BackHandler, ToastAndroid } from 'react-native';
import MapView, { Marker, Overlay } from 'react-native-maps';
import Drawer from 'react-native-drawer';
import Expo from 'expo';
import AlertInput from 'react-native-alert-input';
import { Constants, Location, Permissions, IntentLauncherAndroid } from 'expo';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

import Header from './Header';
import Input from './Input';
import Cadre from './Cadre';
import Button from './Button';

import data from './DataCoordinate';

//My addEmplois comment
//My addEmplois comment 2
//My addEmplois comment3
//My addEmplois
const { width, height } = Dimensions.get('window');
const y = height;
const x = width;

const ovtop2 = [35.562895, -5.365644];
const ovbottom2 = [35.559715, -5.360546];
const dialogTitle = '';
const CoursEnCours = '';
const description = '';
const markerImage = require('./images/marker0.png');
const dataF = []

export default class Test extends Component {
    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };




    constructor(props) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        const ds2 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        super(props);
        this.state = {
            heightPop:240,
            str:null,
            day: '',
            courEncours: "pas de seance maintenant",
            dayNumber: 14,
            dataSource: ds.cloneWithRows(data),
            dataSource1: null,
            text: '',
            laoding: true,
            query: '',
            empty: true,
            Trajectoire: false,
            position: false,

            positionCourante: false,

            trajectoire: false,
            pos: false,
            tag: '',
            test: {
                a: 5,
                b: 6,
            },
            region: {
                latitude: 35.56149404096875,
                longitude: -5.363009199500084,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            },
            markerPosition: {
                latitude: 0,
                longitude: 0,
            },
            positionCurr: {


                latitude: 35.56149404096875,
                longitude: -5.363009199500084,

            }
        };
    }


    /// pour cours encour
    GetTime() {

        var date = new Date();

        this.state.dayNumber = date.getDay()
        this.state.hour = date.getHours();
        this.state.minutes = date.getMinutes();

        switch (this.state.dayNumber) {
            case 0: this.state.day = "dimanche"; break;
            case 1: this.state.day = "lundi"; break;
            case 2: this.state.day = "mardi"; break;
            case 3: this.state.day = "mercredi"; break;
            case 4: this.state.day = "jeudi"; break;
            case 5: this.state.day = "vendredi"; break;
            case 6: this.state.day = "samedi"; break;
        }
    }
   
    
    componentDidMount() {

        this.Clock = setInterval(() => this.GetTime(), 1000);
       
    }
  
    componentWillUnmount() {

        clearInterval(this.Clock);

    }
  
    coursEncourF(responseJson) {

        ////// 
        for (var i = 0; i < responseJson.length; i++) {
            if(responseJson.length>0){
            if (this.state.hour >= responseJson[i].HeureDebut) {
                if (this.state.hour <= responseJson[i].HeureFin) {
                    if (this.state.hour == responseJson[i].HeureDebut) {
                        if (this.state.minutes < responseJson[i].MinuteDebut) {
                            this.setState({ courEncours: "pas de seance maintenant" })
                            break;
                        } else {
                            this.setState({ courEncours: responseJson[i].Module })
                            break;
                        }
                    } else if (this.state.hour == responseJson[i].HeureFin) {
                        if (this.state.minutes > responseJson[i].MinuteFin) {
                            this.setState({ courEncours: "pas de seance maintenant" })
                            break;
                        } else {
                            this.setState({ courEncours: responseJson[i].Module })
                            break;
                        }
                    } else {
                        this.setState({ courEncours: responseJson[i].Module })
                        break;
                    }
                } else {
                    this.setState({ courEncours: "pas de seance maintenant" })
                    break;
                }
            } else {
                this.setState({ courEncours: "pas de seance maintenant" })
                break;
            }
        }
        else {
            this.setState({ courEncours: "pas de seance maintenant" })
            break;
        }
        }
        //Alert.alert(this.state.courEncours)

    }

    showTime(text) {
        this.GetTime()
        //Alert.alert(this.state.day)
        fetch("https://sportignite.000webhostapp.com/index2.php", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nomEmploi: text,
                jour: this.state.day
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.coursEncourF(responseJson)

                //        Alert.alert(this.state.courEncours+responseJson[0].Module+this.state.day+dialogTitle)

            })
            .catch((error) => {
                console.log(error)
            })
    }



    renderRow(rowData) {
        return (
            <View style={styles.itemView}>
                <TouchableOpacity onPress={(text) => this.buttonPressed(rowData.tag)}>
                    <Text style={styles.itemText}>
                        {rowData.tag}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    Test(text) {
        this.setState({ tag: text, query: text, dataSource: this.state.dataSource.cloneWithRows([]) });
    }
    clearShow = () => {
    
        if (this.state.empty) {
            return null;
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    this.setState({
                        text: '',
                        query: '',
                        tag: '',
                        empty: true,
                        dataSource: this.state.dataSource.cloneWithRows([])
                    })
                }}>
                    <Image source={require('./images/clear.png')} style={styles.imageClear} />
                </TouchableOpacity>
            );
        }
    }
      filterSearch(text){
           this.setState({tag: text});
        if(text === '' || text === ' ')
        {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows([]),
            text: '',
            query: '',
            empty:true,
            tag:''
           
        })
        }
        else{
            const newData = data.filter(function(item){
            const itemData = item.tag.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
           this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text,
            query: text,
            empty:false
        })
        }

    }
    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows([]),
        })
    }
    pressMap() { }

    navigateToEmploi() {
        console.log(this.state.tag)
        this.props.navigation.navigate('Table', {
            nomEmploi: this.state.tag,

        });
    }

    fermerPopup() {
        this.setState({
            courEncours: 'pas de seance maintenant'
        })
        this.popupCoursDesc.dismiss();
    }
    fermerPopup2() {
        this.setState({
            courEncours: 'pas de seance maintenant'
        })
        this.popupCoursEnCours.dismiss();
    }

    handleClick = () => {
        this.showTime(this.state.tag);
        if (   dialogTitle==='Salle 20' || dialogTitle==='Salle 21' || dialogTitle==='Salle 22' || dialogTitle==='Salle 23'
            || dialogTitle==='Salle 24' || dialogTitle==='Salle 25' || dialogTitle==='Salle 26' || dialogTitle==='Salle 28'
            || dialogTitle==='Salle 29' || dialogTitle==='Salle 30' || dialogTitle==='Salle 31' || dialogTitle==='Salle 32'
            || dialogTitle==='Salle 33' || dialogTitle==='Salle 34' || dialogTitle==='Salle 35' || dialogTitle==='Salle 36'
            || dialogTitle==='Salle 37' || dialogTitle==='Salle 38' || dialogTitle==='Salle 39' || dialogTitle==='Salle 40'
            || dialogTitle==='Salle 41' || dialogTitle==='Salle 42' || dialogTitle==='Salle 43'
            || dialogTitle==='salle tp 1 biologie' || dialogTitle==='salle tp 2 biologie' || dialogTitle==='salle tp 3 biologie'
            || dialogTitle==='salle tp 4 biologie' || dialogTitle==='salle tp 5 biologie' || dialogTitle==='salle tp 6 biologie'
            || dialogTitle==='salle tp 7 biologie')
        {
            this.setState({heightPop:240});
           this.popupCoursDesc.show();
        }
         if (  dialogTitle==='Salle 12' || dialogTitle==='Salle 13' || dialogTitle==='Salle 14' || dialogTitle==='Salle 15'
            || dialogTitle==='Salle 16' || dialogTitle==='Salle 17' || dialogTitle==='Salle 18' || dialogTitle==='Salle 19' )
        {
             this.setState({heightPop:280});
           this.popupCoursDesc.show();
        }
        if (  dialogTitle==='Bloc 1' || dialogTitle==='Bloc 2')
        {
           this.popupDescription.show();
        }
        if (  dialogTitle==='Amphitheatre A' || dialogTitle==='Amphitheatre B' || dialogTitle==='Amphitheatre C'
           || dialogTitle==='Amphitheatre D' || dialogTitle==='Amphitheatre E' || dialogTitle==='Amphitheatre F'
           || dialogTitle==='salle tp/td biologie')
        {
           this.popupCoursEnCours.show();
        }

    };




buttonPressed(text){
 this.setState({ tag: text, query: text, dataSource: this.state.dataSource.cloneWithRows([]) });
        this.showTime(text)
            var coordF = { latitude:0,longitude:0 }
            var lod = false
            var title1 = ''
            var coursEncour1 = ''
            var desc1 = ''
            var img1 = null

            const newData = data.filter(function(item){
            const tex = text.toUpperCase()
            const itemTag = item.tag.toUpperCase()
            const itemCoords = item.coords
            const titleIt = item.dialogTitle
            const coursEncourIt = item.CoursEnCours
            const descIt = item.description
            const imgIt = item.image

            if(itemTag === tex) {
                coordF = itemCoords
                lod = true
                title1 = titleIt
                coursEncour1 = coursEncourIt
                desc1 = descIt
                img1 = imgIt
            }
        })
            if(lod){
          this.setState({positionCurr:coordF });
          this.setState({ markerPosition: coordF });
          dialogTitle = title1;
          CoursEnCours = coursEncour1;
          description = desc1;
        
          markerImage = img1;
      }
      else {
        Alert.alert(
  'Message',
  'Le nom est incorrect !',
  [ {text: 'Ok', onPress: () => console.log('OK Pressed')}, ],
  { cancelable: false }
     )
  }
}





    EmploisTempsSalle() {
        this._drawer.close();


        this.props.navigation.navigate('Emplois');


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
    favoritsPage(){
         this._drawer.close();
        this.props.navigation.navigate('Favoris');
    }
    Apropos(){
        this._drawer.close();
        this.props.navigation.navigate('Propos');
    }
    render() {
        return (

            <Drawer ref={(ref) => this._drawer = ref}
                content={<Cadre>
                    <View style={styles.ViewStyle}>
                        <Image source={require('./images/LOGO.jpg')} style={styles.imageDrawer} />
                    </View>
                        <View style={styles.ViewStyle3}>

                        <Image source={require('./images/home.png')} style={styles.image3} />
                        <TouchableOpacity onPress={() => { this._drawer.close() }} style={styles.buttonStyleAccueil}>
                        <Text style={styles.textStyle1}> Accueil </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ViewStyle3}>
                        <Image source={require('./images/location.png')} style={styles.image3} />
                        <View style={styles.buttonStyle} >
                            <Text style={styles.textStyle}>Position courante</Text>
                        </View>

                        <Switch
                            onValueChange={(value) => this.positionCourante(value)}

                            style={{ marginTop: 7 }}

                            value={this.state.positionCourante} />

                    </View>
                    <View style={styles.ViewStyle3}>
                        <Image source={require('./images/fav1.png')} style={styles.image3} />
                        <View style={styles.buttonStyle} >
                            <TouchableOpacity onPress={this.favoritsPage.bind(this)}><Text style={styles.textStyle} >Mes favoris</Text></TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.ViewStyle4}>
                        <View style={styles.ViewStyle5}>
                        </View>
                    </View>


                    <Button onPress={this.EmploisTempsSalle.bind(this)}> Emplois </Button>



                    <Button onPress={this.Apropos.bind(this)}> A propos </Button>

                </Cadre>}
                type="overlay"
                openDrawerOffset={0.2}
                closedDrawerOffset={-3}
                panCloseMask={0.2}
                tapToClose={true}
                tweenHandler={(ratio) => ({
                    main: { opacity: (2 - ratio) / 2 }
                })}>
                <View style={styles.containers}>



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











                    <PopupDialog
                        dialogTitle={<DialogTitle titleAlign='center' titleStyle={{ backgroundColor: '#14ABC4' }} titleTextStyle={{ color: '#fff', fontSize: 15 }} title={dialogTitle} />}
                        width={x - 50}
                        height={this.state.heightPop}
                        haveOverlay={true}

                        overlayOpacity={0}
                        dismissOnHardwareBackPress={false}
                        dismissOnTouchOutside={false}
                        ref={(popupCoursDesc) => { this.popupCoursDesc = popupCoursDesc; }}
                    >

                        <View>
                            <View style={{ height: 50, width: x - 50, paddingTop: 20, flexDirection: 'row' }}>

                                <Text style={{ marginLeft: 20, fontSize: 14, fontWeight: 'bold', color: '#000' }}> Cours en cours : </Text>


                                <Text style={{ marginRight: 8, fontSize: 14, fontStyle: 'italic' }}>{this.state.courEncours}</Text>

                            </View>

                            <View style={{ height: this.state.heightPop-150, width: x - 105, flexDirection: 'row' }}>

                                <Text style={{ marginLeft: 20, color: '#000', fontWeight: 'bold' }}> Description : </Text>

                                <View style={{ width: x - 140 }}>
                                    <Text style={{ marginRight: 50, fontSize: 14, fontStyle: 'italic' }}>{description}</Text>
                                </View>

                            </View>

                            <View style={{ height: 40, width: x - 50, flexDirection: 'row' }}>
                                <View style={{ width: (x - 50) / 2, paddingLeft: 30, paddingBottom: 10, alignItems: 'center' }}>
                                    <TouchableOpacity style={{ width: (x - 150) / 2, height: 40, borderWidth: 1, borderColor: '#14ABC4', alignItems: 'center', borderRadius: 6, justifyContent: 'center', backgroundColor: '#14ABC4' }} onPress={() => { this.navigateToEmploi(); }} >
                                        <Text style={{ color: '#fff' }}>Emploi</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: (x - 50) / 2, paddingRight: 30, paddingBottom: 10, alignItems: 'center' }}>
                                    <TouchableOpacity style={{ width: (x - 150) / 2, height: 40, borderWidth: 1, borderColor: '#0C7C8E', borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} onPress={() => { this.fermerPopup() }} >
                                        <Text style={{ color: '#0C7C8E' }} >Fermer</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </PopupDialog>















                    <PopupDialog
                        dialogTitle={<DialogTitle titleAlign='center' titleStyle={{ backgroundColor: '#14ABC4' }} titleTextStyle={{ color: '#fff', fontSize: 15 }} title={dialogTitle} />}
                        width={x - 50}
                        height={290}
                        haveOverlay={true}

                        overlayOpacity={0}
                        dismissOnHardwareBackPress={false}
                        dismissOnTouchOutside={false}
                        ref={(popupDescription) => { this.popupDescription = popupDescription; }}
                    >

                        <View>


                            <View style={{ height: 190, width: x - 50, paddingTop: 15, flexDirection: 'row' }}>

                                <Text style={{ marginLeft: 15, fontSize: 14, fontWeight: 'bold', color: '#000', textAlign: 'justify', lineHeight: 22 }}> Description : </Text>
                                <View style={{ width: x - 160 }}>

                                    <Text style={{ marginRight: 8, fontSize: 14, fontStyle: 'italic', textAlign: 'justify', lineHeight: 22 }}>{description}</Text>
                                </View>
                            </View>

                            <View style={{ height: 40, width: x - 50, paddingBottom: 10, alignItems: 'center' }}>
                                <TouchableOpacity style={{ width: 130, height: 40, borderWidth: 1, borderColor: '#0C7C8E', borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} onPress={() => { this.popupDescription.dismiss(); }} >
                                    <Text style={{ color: '#0C7C8E' }} >Fermer</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </PopupDialog>





















                    <PopupDialog
                        dialogTitle={<DialogTitle titleAlign='center' titleStyle={{ backgroundColor: '#14ABC4' }} titleTextStyle={{ color: '#fff', fontSize: 15 }} title={dialogTitle} />}
                        width={x - 50}
                        height={180}
                        haveOverlay={true}

                        overlayOpacity={0}
                        dismissOnHardwareBackPress={false}
                        dismissOnTouchOutside={false}
                        ref={(popupCoursEnCours) => { this.popupCoursEnCours = popupCoursEnCours; }}
                    >
                        <View>
                            <View style={{ height: 80, width: x - 50, paddingTop: 20, flexDirection: 'row' }}>

                                <Text style={{ marginLeft: 20, fontSize: 14, fontWeight: 'bold', color: '#000' }}> Cours en cours : </Text>

                                <Text style={{ marginRight: 8, fontSize: 14, fontStyle: 'italic' }}>{this.state.courEncours}</Text>

                            </View>

                            <View style={{ height: 40, width: x - 50, flexDirection: 'row' }}>
                                <View style={{ width: (x - 50) / 2, paddingLeft: 30, paddingBottom: 10, alignItems: 'center' }}>
                                    <TouchableOpacity style={{ width: (x - 150) / 2, height: 40, borderWidth: 1, borderColor: '#14ABC4', alignItems: 'center', borderRadius: 6, justifyContent: 'center', backgroundColor: '#14ABC4' }} onPress={() => { this.navigateToEmploi(); }} >
                                        <Text style={{ color: '#fff' }}>Emploi</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: (x - 50) / 2, paddingRight: 30, paddingBottom: 10, alignItems: 'center' }}>
                                    <TouchableOpacity style={{ width: (x - 150) / 2, height: 40, borderWidth: 1, borderColor: '#0C7C8E', borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} onPress={() => { this.fermerPopup2() }} >
                                        <Text style={{ color: '#0C7C8E' }} >Fermer</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </PopupDialog>

















                    <Header>
                        <TouchableOpacity onPress={() => { this._drawer.open() }} style={styles.btnInscription1}>
                            <Image source={require('./images/menu.png')} style={styles.image} />
                        </TouchableOpacity>
                        <View style={styles.cc}>
                            <Input label=''
                                PHolder='Chercher '
                                secureText={false}
                                changeText={(text) => this.filterSearch(text)}
                                Query={this.state.query} />
                            {this.clearShow()}
                        </View>
                        <TouchableOpacity onPress={(text) => this.buttonPressed(this.state.tag)} style={styles.bb}>
                            <Image source={require('./images/search.png')} style={styles.image2} />
                        </TouchableOpacity>
                    </Header>
                    
                    <MapView style={styles.map} region={{ latitude: this.state.positionCurr.latitude, longitude: this.state.positionCurr.longitude, latitudeDelta: 0.0015, longitudeDelta: 0.0015 }} onPress={(e) => console.log(e.nativeEvent.coordinate)} showsUserLocation={this.state.positionCourante} showsMyLocationButton={true}>
                        <MapView.Overlay bounds={[ovtop2, ovbottom2]}
                            image={require('./images/abd1.png')} />
                        <MapView.Marker
                            onPress={this.handleClick}
                            coordinate={this.state.markerPosition}
                        >

                        </MapView.Marker>
                    </MapView>
                    
                    <View style={styles.ViewContainer}>
                        <ListView
                            enableEmptySections={true}
                            style={styles.listContainer}
                            renderRow={this.renderRow.bind(this)}
                            dataSource={this.state.dataSource} />
                    </View>
                </View>
            </Drawer>
        );
    }
}
const styles = StyleSheet.create({
    bb: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemView: {
        height: 38,
        justifyContent: 'center'
    },
    ViewContainer: {
        marginLeft: 40,

        marginBottom: 40,
        width: x - 52,
        //paddingTop:32
    },
    listContainer: {
        marginHorizontal: 10,
        backgroundColor: 'rgba(255,255,255,0.8)'
    },
    itemText: {
        fontSize: 17,
        paddingLeft: 8,
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
      textStyle1:{
        paddingTop: 5,
        paddingLeft: 16,
        color: 'rgb(255,255,255)',
        fontSize: 16
    },
        buttonStyleAccueil:{

  justifyContent:'center',

  borderBottomColor:'rgb(255,255,255)',
  alignSelf:'stretch',
  width:250,  
  height:50,

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
        flex: 1,
        paddingTop: Expo.Constants.statusBarHeight
    },
    map: {
        top: 60+Expo.Constants.statusBarHeight,
        right: 0,
        left: 0,
        bottom: 0,
        position: 'absolute'
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
        width: 18,
        height: 14
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
        paddingRight: 12,
        borderRadius: 20
    },
});
