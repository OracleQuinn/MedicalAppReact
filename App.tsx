import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './components/screens/Home';
import InterviewScreen from './components/screens/Interview';
import TransferScreen from './components/screens/Transfer';
import PatientDataScreen from './components/screens/PatientData';
import TreatmentScreen from './components/screens/Treatment';
import DiagnosisScreen from './components/screens/Diagnosis';
import ExaminationScreen from './components/screens/Examination';
import MenuIcon from './components/menu/MenuIcon';
import MenuContent from './components/menu/MenuContent';
import {FAB, Provider} from 'react-native-paper';
import { styles } from './styles/Styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default function App() {
  const Drawer = createDrawerNavigator();

  return (
    <SafeAreaProvider>
      <Provider>
          <NavigationContainer>
            <Drawer.Navigator screenOptions={{headerShown: true, headerLeft: () => <MenuIcon />}} drawerContent={(props) => <MenuContent {...props} />}>
              <Drawer.Screen name='Strona Główna' component={HomeScreen} options={{drawerIcon: config => <Icon size={23} name="md-home-outline"></Icon>}} />
              <Drawer.Screen name='Wywiad' component={InterviewScreen} options={{drawerIcon: config => <Icon size={23} name="medical-outline"></Icon>}} />
              <Drawer.Screen name='Badanie' component={ExaminationScreen} options={{drawerIcon: config => <Icon size={23} name="folder-outline"></Icon>}} />
              <Drawer.Screen name='Rozpoznanie' component={DiagnosisScreen} options={{drawerIcon: config => <Icon size={23} name="add-outline"></Icon>}} />
              <Drawer.Screen name='Postępowanie' component={TreatmentScreen} options={{drawerIcon: config => <Icon size={23} name="trending-up-outline"></Icon>}} />
              <Drawer.Screen name='Przekazanie' component={TransferScreen} options={{drawerIcon: config => <Icon size={23} name="bed-outline"></Icon>}} />
              <Drawer.Screen name='Dane pacjenta' component={PatientDataScreen} options={{drawerIcon: config => <Icon size={23} name="person-outline"></Icon>}} />
            </Drawer.Navigator>
          </NavigationContainer>
          <FAB icon="check" style={styles.fab} onPress={() => console.log('Pressed')}/>
        </Provider>
      <StatusBar style='auto' />
    </SafeAreaProvider>
  );
}
