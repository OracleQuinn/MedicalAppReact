import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {FAB, List, Portal} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import { styles } from '../../../styles/Styles';

interface IExaminationScreenProps {
  navigation: any,
}

const ExaminationScreen: React.FunctionComponent<IExaminationScreenProps> = ({navigation}) => {
  const isScreenFocused = useIsFocused();
  const eyeOpening = ["4 spontanicznie", "3 na głos", "2 na ból", "1 brak"];
  const verbalReaction = ["5 zorientowany", "4 splątany", "3 niewłaściwe słowa", "2 niezrozumiałe dźwięki", "1 brak"];
  
  return (
    <ScrollView keyboardDismissMode='on-drag'>
      <List.AccordionGroup>
        <List.Accordion title="GLASGOW-COMA-SCALE" id="1" theme={{ colors: { primary: 'dodgerblue' }}} >
          <SelectDropdown buttonStyle={styles.dropDown} defaultButtonText='Otwieranie oczu' data={eyeOpening} onSelect={(selectedItem, index) => {console.log(selectedItem, index)}} 
            buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
	          rowTextForSelection={(item, index) => {return item}}/>
            <SelectDropdown buttonStyle={styles.dropDown} defaultButtonText='Reakcja słowna' data={verbalReaction} onSelect={(selectedItem, index) => {console.log(selectedItem, index)}} 
            buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
	          rowTextForSelection={(item, index) => {return item}}/>
        </List.Accordion>
        <List.Accordion title="RTS" id="2" theme={{ colors: { primary: 'dodgerblue' }}} >
          
        </List.Accordion>
        <List.Accordion title="Układ oddechowy" id="3" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
      </List.AccordionGroup>
      <Portal>
        <FAB icon="check" style={styles.fab} onPress={() => navigation.navigate("Rozpoznanie")} visible={isScreenFocused}/>
      </Portal>
    </ScrollView>
  );
};
export default ExaminationScreen;