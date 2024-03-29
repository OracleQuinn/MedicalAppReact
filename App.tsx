import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './frontend/screens/Home';
import InterviewScreen from './frontend/screens/Interview';
import TransferScreen from './frontend/screens/Transfer';
import PatientDataScreen from './frontend/screens/PatientData';
import ExaminationScreen from './frontend/screens/Examination';
import MenuIcon from './frontend/menu/MenuIcon';
import MenuContent from './frontend/menu/MenuContent';
import {Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import DiagnosisScreen from './frontend/screens/Diagnosis';
import TreatmentScreen from './frontend/screens/Treatment';

export default function App() {
  const Drawer = createDrawerNavigator();

  return (
    <SafeAreaProvider>
      <Provider>
          <NavigationContainer>
            <Drawer.Navigator screenOptions={{headerShown: true, headerLeft: () => <MenuIcon />}} drawerContent={(props) => <MenuContent {...props} />}>
              <Drawer.Screen name='Strona Główna' component={HomeScreen} options={{drawerIcon: config => <Icon size={23} name="md-home-outline"></Icon>}} />
              <Drawer.Screen name='Wywiad' component={InterviewScreen} options={{drawerIcon: config => <Icon size={23} name="medical-outline"></Icon>}} />
              <Drawer.Screen name='Badanie' component={ExaminationScreen} options={{drawerIcon: config => <Icon size={23} name="pulse-outline"></Icon>}} />
              <Drawer.Screen name='Rozpoznanie' component={DiagnosisScreen} options={{drawerIcon: config => <Icon size={23} name="bandage-outline"></Icon>}} />
              <Drawer.Screen name='Postępowanie' component={TreatmentScreen} options={{drawerIcon: config => <Icon size={23} name="medkit-outline"></Icon>}} />
              <Drawer.Screen name='Przekazanie' component={TransferScreen} options={{drawerIcon: config => <Icon size={23} name="bed-outline"></Icon>}} />
              <Drawer.Screen name='Dane pacjenta' component={PatientDataScreen} options={{drawerIcon: config => <Icon size={23} name="person-outline"></Icon>}} />
            </Drawer.Navigator>
          </NavigationContainer>
        </Provider>
      <StatusBar style='auto' />
    </SafeAreaProvider>
  );
}
