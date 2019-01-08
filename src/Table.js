import React, { Component } from 'react';
import { Button, Alert, FlatList, StyleSheet,AsyncStorage, View, Text, ActivityIndicator, Image, Dimensions, Picker, TouchableOpacity, Switch, ScrollView, Modal } from 'react-native';

const { width, height } = Dimensions.get('window');
const y = height;
const x = width;

export default class Table extends Component {
        constructor() {

        super();
        this.state = {
            emploiLoader: false,
            data: [],
            buttonStatus: true,
            titre2: 'Amphi A',
            showLoader: true,
            jour: 'lundi',
            jours: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
            tableStatus: true,
            dataStatus: true,
            time: '',
            hour: 0, minutes: 0,
            day:'',
             imageFavorite:''
        }
    }

  static navigationOptions = ({ navigation }) => {
    const { params = {}} = navigation.state;
    const headerRight = (
      <TouchableOpacity onPress={ params.Logout } style={styles.btnLogout}>
    
      
             <Image style={{width:27,height:27,marginRight:15}} source={require('./images/fav1.png')}/>
        
      </TouchableOpacity>
      
    );
    return { headerRight };
  };
  componentDidMount(){
    this.props.navigation.setParams({Logout: this._Logout.bind(this)});
  }

  _Logout(){

        var EmploiN = '';
        var EmploiT='';
        if (this.props.navigation.getParam('type', '') === 'salle') {
            EmploiT = 'salle';
            EmploiN = this.props.navigation.getParam('typeSalle', '');

        } else if (this.props.navigation.getParam('type', '') === 'fillier') {
            EmploiT = 'fillier';
            EmploiN = this.props.navigation.getParam('typeFillier', '')
        } else {
            EmploiT='Amphi';
            EmploiN = this.props.navigation.getParam('typeAmphi', '')
        }
        if(EmploiN === ''){
            EmploiN = this.props.navigation.getParam('nomEmploi','')
        }


        AsyncStorage.getItem(EmploiN)
      .then(result => {
        if(result === null)
        {
        var msg = "Voulez-vous ajouter l'emploi de "+EmploiN+" au favoris";
                 Alert.alert(
                'Message',
                msg,
                [
                    { text: 'Oui', onPress: (EmploiNom)=>this.ajouterAuFavorite(EmploiN) },
                    { text: 'Non', onPress: () => console.log('Non Pressed') },
                ],
                { cancelable: false }
            )
        }
        else
        {

              var msg = "L'emploi de "+EmploiN+" est déja dans les favoris"
                Alert.alert(
                'Message',
                msg,
                [
                    { text: 'Ok'},
                ],
                { cancelable: false }
            ) 
        }
     
      })


  }
  ajouterAuFavorite(EmploiNom){

         
     
          AsyncStorage.setItem(EmploiNom,EmploiNom)
        .then(()=>{
        console.log(EmploiNom);
        console.log('est ajouter au favorite');
      })
     
      

     }


    

    getData() {

        var nom = '';
        if (this.props.navigation.getParam('type', '') === 'salle') {
            nom = this.props.navigation.getParam('typeSalle', '');
        } else if (this.props.navigation.getParam('type', '') === 'fillier') {
            nom = this.props.navigation.getParam('typeFillier', '')
        } else {
            nom = this.props.navigation.getParam('typeAmphi', '')
        }
        if(nom === ''){
            nom = this.props.navigation.getParam('nomEmploi','')
        }
        //Alert.alert(nom)

        fetch("https://sportignite.000webhostapp.com/index.php", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                //typeEmploi: this.props.navigation.getParam('type', ''),
                nomEmploi: nom,
                jour: this.state.jour
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson
                })
            })
            .catch((error) => {
                console.log(error)
            })

    }

    renderItem = ({ item }) => {
        //this.state.tableData.push()

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

    render() {

        const joursList = this.state.jours.map((x, i) => <Picker.Item key={i} label={x} value={x} />)


        var dataContent;
        if (this.state.data.length > 0) {

            dataContent = <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={(x, i) => i.toString()}
            />

        } else {
            dataContent = <View style={{ marginTop: y - 600, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, color: '#0C7C8E' }}>Pas des seances</Text>
                <Text style={{ fontSize: 30, color: '#0C7C8E' }}>aujourd'hui</Text>
            </View>
        }

        if (this.state.dataStatus) {
            this.getData();
        }


        return (
            <View style={styles.container}>
                <View>
                    <Picker
                        selectedValue={this.state.jour}
                        style={{ color: "#0C7C8E", height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({ emploiLoader: true, jour: itemValue, dataStatus: true })}>
                        {joursList}
                    </Picker>

                </View>

                <View >
                    <ScrollView style={{ marginTop: 20, marginBottom: 20 }}>
                        {dataContent}

                    </ScrollView>
                </View>

            </View>
        )
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
