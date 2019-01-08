import { StackNavigator } from 'react-navigation';

import App from './App';

import Emplois from './Emplois';
import Table from './Table'
import Favoris from './Favoris'; 
import Propos from './Propos';
const StackNavigators = StackNavigator({

    App:{
      screen:App,
      navigationOptions:{
       
        header:false
      }
    },
  
	   Emplois:{
    screen:Emplois,
    navigationOptions:{
       header:false
        
    } 
  },
  Table:{
    screen:Table,
    navigationOptions:{
        title: 'Emplois',
        headerStyle: { backgroundColor: '#0C7C8E' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
    }
  },
    Favoris:{
    screen:Favoris,
    navigationOptions:{
        title: 'Mes favoris',
        headerStyle: { backgroundColor: '#0C7C8E' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
        
    }
  },
    Propos:{
    screen:Propos,
    navigationOptions:{
        title: 'A propos',
        headerStyle: { backgroundColor: '#0C7C8E' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
        
    }
  }
});

export default StackNavigators;