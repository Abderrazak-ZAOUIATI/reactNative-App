import React, { Component } from 'react';
import {Alert, FlatList, StyleSheet, View, Text, ActivityIndicator, Image, Dimensions, Picker, TouchableOpacity, Switch, ScrollView ,Modal} from 'react-native';
import { Icon, Button, Container, Body, Header, Content, Left, Right } from 'native-base';
import { StackNavigator } from 'react-navigation';
import Expo from 'expo';
import Drawer from 'react-native-drawer';
import Table from './Table'


import Input from './Input';
import Cadre from './Cadre';
import Button1 from './Button';

const { width, height } = Dimensions.get('window');
const y = height;
const x = width;
export default class Emplois extends Component {


    static navigationOptions = {
        drawerIcon: (
            <Image source={require('./images/LOGO.jpg')} style={{ height: 30, width: 35 }} />
        )
    };


    constructor() {

        super();
        this.state = {
            emploiLoader: false,
            data: [],
            buttonStatus: true,
            titre: 'Les Emplois De Temps',
            titre2: 'Amphi A',
            showLoader: true,
            type: "Amphitheatres",
            jour: 'mardi',
            jours: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
            amphis: ["Amphi A", "Amphi B", "Amphi C", "Amphi D","Amphi E","Amphi F"],
            fillier: ["SMPC-2","SMI-1", "SMI-6", "SMPC 1", "SVT 6","SMI-3","SMI-4","SMIA-1","SMP-3","SMP-4","SMP-5","SMP-6","SMC-3","SMC-4","SMC-5","SMC-6","SMPC-1","SMIA-2","SMA-3","SMA-4","SMA-5","SMA-6","SMI-5"],
            salle: ["salle 12","salle 13","salle 14","salle 15","salle 16","salle 17","salle 18","salle 19","Salle 28","Salle 29", "Salle 30","Salle 31", "Salle 32", "Salle 33", "Salle 34", "Salle 35", "Salle 36","Salle 37","Salle 38","Salle 39","Salle 40","Salle 41","Salle 42","Salle 43"],
            typeAmphi: "",
            typeSalle: "",
            typeFillier: "",
            tableStatus: true,
            tableHead: ['Lundi'],
            tableTitle: [],
            tableData: [['1iffffffffffffffsgcsysy'], ['a']],
            dataStatus: false ,
            visibility : false ,

        }
    }



    componentDidMount() {
        //this.getData();
    }

    componentWillMount() {

        ////////////////
        setTimeout(() => {
            this.setState({
                showLoader: false
            })
        }, 1500)


    }


    renderItem = ({ item }) => {
        return (
            <View >
               
                <View style={{ alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, marginBottom: 8 }}>
                    <Text style={{ fontSize: 30, color: '#0C7C8E' }}>{item.Periode}</Text>
                </View>
                <View style={{ marginBottom: 8 }}>
                    <Text>Module : {item.Module} / {item.TypeCours}</Text>
                    <Text>Lieu : {item.Lieu}</Text>
                    <Text>Prof : {item.Prof}</Text>

                </View>
            </View>
        )
    }

    navigateToEmploi() {
        this.props.navigation.navigate('Table', {
            type:this.state.type,
            typeSalle:this.state.typeSalle,
            typeFillier:this.state.typeFillier,
            typeAmphi:this.state.typeAmphi
          });
    }
     favoritsPage(){
         this._drawer.close();
        this.props.navigation.navigate('Favoris');
    }
    EmploisTempsSalle() {
        this._drawer.close();
        this.props.navigation.navigate('App');
    }
    Apropos(){
        this._drawer.close();
        this.props.navigation.navigate('Propos');
    }
    render() {


        const sousTitre = this.state.titre2;
        const joursList = this.state.jours.map((x, i) => <Picker.Item key={i} label={x} value={x} />)
        const salleList = this.state.salle.map((x, i) => <Picker.Item key={i} label={x} value={x} />)
        const fillierList = this.state.fillier.map((x, i) => <Picker.Item key={i} label={x} value={x} />)
        const amphisList = this.state.amphis.map((x, i) => <Picker.Item key={i} label={x} value={x} />)
        let picker = null
        if (this.state.type === "salle") {
            picker = (<Picker
                selectedValue={this.state.typeSalle}
                style={{ color: "#0C7C8E", height: 50, width: 180 }}
                onValueChange={(itemValue, itemIndex) => this.setState({ typeSalle: itemValue, titre2: itemValue })}>
                {salleList}
            </Picker>)
        }
        else if (this.state.type === "fillier") {
            picker = (<Picker
                selectedValue={this.state.typeFillier}
                style={{ color: "#0C7C8E", height: 50, width: 180 }}
                onValueChange={(itemValue, itemIndex) => this.setState({ typeFillier: itemValue, titre2: itemValue })}>
                {fillierList}
            </Picker>)
        }
        else {
            picker = (<Picker
                selectedValue={this.state.typeAmphi}
                style={{ color: "#0C7C8E", height: 50, width: 180 }}
                onValueChange={(itemValue, itemIndex) => this.setState({ typeAmphi: itemValue, titre2: itemValue })}>
                {amphisList}


            </Picker>)
        }



        return (

            <Drawer ref={(ref) => this._drawer = ref}

                content={<Cadre>
                     
                    <View style={styles.ViewStyle}>
                        <Image source={require('./images/LOGO.jpg')} style={styles.imageDrawer} />
                    </View>

                    <View style={styles.ViewStyle3}>

                        <Image source={require('./images/home.png')} style={styles.image3} />
                        <TouchableOpacity onPress={this.EmploisTempsSalle.bind(this)} style={styles.buttonStyleAccueil}>
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



                    <View style={styles.ViewStyle4}><View style={styles.ViewStyle5}></View></View>
                    <Button1> Emplois </Button1>



                    <Button1 onPress={this.Apropos.bind(this)}> A propos </Button1>

                </Cadre>}
                type="overlay"
                openDrawerOffset={0.2}
                closedDrawerOffset={-3}
                panCloseMask={0.2}
                tapToClose={true}
                tweenHandler={(ratio) => ({
                    main: { opacity: (2 - ratio) / 2 }
                })}
            >


                <Container style={{ paddingTop: Expo.Constants.statusBarHeight }}>
                    <Header rounded style={{ backgroundColor: '#0C7C8E' }}>
                        <Left>
                            <Button title="menu"
                                transparent
                                onPress={() => { this._drawer.open() }}
                            >
                                <Icon name="menu" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{ color: 'white', fontSize: 16 }}>{this.state.titre}</Text>
                        </Body>
                    </Header>
                    <Body style={styles.body}>
                        <View style={{ marginTop: 130, alignItems: 'center', justifyContent: 'center' }}>
                            {this.state.showLoader ? 
                                <View style={{ marginTop: 210, alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator size="large" color="#0C7C8E" />
                                </View>

                                :
                                <View style={{ justifyContent: 'center' }}>
                                
                                    <Text style={{ color: "#0C7C8E", fontSize: 22, marginBottom: 30 }}>Choisir Type D'emploi</Text>
                                    <Picker
                                        selectedValue={this.state.type}
                                        style={{ color: "#0C7C8E", height: 70, width: 180 }}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue })}>
                                        <Picker.Item label="Amphitheatres" value="amphi" />
                                        <Picker.Item label="Salles" value="salle" />
                                        <Picker.Item label="Filliers" value="fillier" />
                                    </Picker>

                                    {picker}
                                    <View style={{ marginTop: 50, marginLeft: 20 }}>
                                        <Button onPress={() => this.navigateToEmploi()} rounded success>
                                            <Text style={{ marginLeft: 15, marginRight: 15, fontSize: 20 }}>Trouver l'emploi</Text>
                                        </Button>
                                    </View>
                                </View>
                            }
                        </View>

                    </Body>
                </Container>

            </Drawer>




















































        );
    }
}


let styles = StyleSheet.create({
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
        paddingLeft: 15,
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
