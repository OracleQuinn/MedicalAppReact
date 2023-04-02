import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {ScrollView, View} from 'react-native';
import {FAB, List, Portal} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import { styles } from '../styles/Styles';
import { eyeOpening, gcs, movementReaction, respiratoryRate, systolicRp, verbalReaction } from '../utils/types/labels';

interface IExaminationScreenProps {
  navigation: any,
}

const ExaminationScreen: React.FunctionComponent<IExaminationScreenProps> = ({navigation}) => {
  const isScreenFocused = useIsFocused();
  const [eye, setEye] = useState<number>(0);
  const [verbal, setVerbal] = useState<number>(0);
  const [movement, setMovement] = useState<number>(0);
  const [sumGlasgowComaScale, setSumGlasgowComaScale] = useState<number>(0);
  const [respiratory, setRespiratory] = useState<number>(0);
  const [systolic, setSystolic] = useState<number>(0);
  const [gcsValue, setGcsValue] = useState<number>(0);
  const [sumRts, setSumRts] = useState<number>(0);

  useEffect(() => {
    setSumGlasgowComaScale(eye + verbal + movement)
  }, [eye, verbal, movement])

  useEffect(() => {
    setSumRts(respiratory + systolic + gcsValue)
  }, [respiratory, systolic, gcsValue])
  
  return (
    <ScrollView keyboardDismissMode='on-drag'>
      <List.AccordionGroup>
        <List.Accordion title={"GLASGOW-COMA-SCALE: " + sumGlasgowComaScale} id="1" theme={{ colors: { primary: 'dodgerblue' }}} >
          <SelectDropdown buttonStyle={styles.dropDown} defaultButtonText='Otwieranie oczu' data={eyeOpening.slice().reverse()} onSelect={(selectedItem, index) => setEye(selectedItem.value)} 
            buttonTextAfterSelection={(selectedItem, index) => {return selectedItem.label}}
	          rowTextForSelection={(item, index) => {return item.label}}/>
          <SelectDropdown buttonStyle={styles.dropDown} defaultButtonText='Reakcja słowna' data={verbalReaction.slice().reverse()} onSelect={(selectedItem, index) => setVerbal(selectedItem.value)} 
            buttonTextAfterSelection={(selectedItem, index) => {return selectedItem.label}}
	          rowTextForSelection={(item, index) => {return item.label}}/>
          <SelectDropdown buttonStyle={styles.dropDown} defaultButtonText='Reakcja ruchowa' data={movementReaction.slice().reverse()} onSelect={(selectedItem, index) => setMovement(selectedItem.value)} 
            buttonTextAfterSelection={(selectedItem, index) => {return selectedItem.label}}
	          rowTextForSelection={(item, index) => {return item.label}}/>
        </List.Accordion>
        <List.Accordion title={"RTS: " + sumRts} id="2" theme={{ colors: { primary: 'dodgerblue' }}} >
          <SelectDropdown buttonStyle={styles.dropDown} defaultButtonText='Częstość oddechów' data={respiratoryRate.slice().reverse()} onSelect={(selectedItem, index) => setRespiratory(selectedItem.value)} 
            buttonTextAfterSelection={(selectedItem, index) => {return selectedItem.label}}
	          rowTextForSelection={(item, index) => {return item.label}}/>
          <SelectDropdown buttonStyle={styles.dropDown} defaultButtonText='RP Skurczowe' data={systolicRp.slice().reverse()} onSelect={(selectedItem, index) => setSystolic(selectedItem.value)} 
            buttonTextAfterSelection={(selectedItem, index) => {return selectedItem.label}}
	          rowTextForSelection={(item, index) => {return item.label}}/>
          <SelectDropdown buttonStyle={styles.dropDown} defaultButtonText='GCS' data={gcs.slice().reverse()} onSelect={(selectedItem, index) => setGcsValue(selectedItem.value)} 
            buttonTextAfterSelection={(selectedItem, index) => {return selectedItem.label}}
	          rowTextForSelection={(item, index) => {return item.label}}/>
        </List.Accordion>
        <List.Accordion title="Układ oddechowy" id="3" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
        <List.Accordion title="Źrenice" id="4" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
        <List.Accordion title="Ciśnienie tętnicze" id="5" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
        <List.Accordion title="Tętno" id="6" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
        <List.Accordion title="Objawy" id="7" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
        <List.Accordion title="Skóra" id="8" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
        <List.Accordion title="Jama brzuszna" id="9" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
        <List.Accordion title="Ocena psychologiczno-ruchowa" id="10" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
        <List.Accordion title="Tony serca" id="11" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
        <List.Accordion title="Niedowład/porażenie" id="12" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
        <List.Accordion title="Zapach z ust" id="13" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
        <List.Accordion title="Poziom glukozy" id="14" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
        <List.Accordion title="EKG" id="15" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
        <List.Accordion title="INNE" id="16" theme={{ colors: { primary: 'dodgerblue' }}}>
          
        </List.Accordion>
      </List.AccordionGroup>
      <Portal>
        <FAB icon="check" style={styles.fab} onPress={() => navigation.navigate("Rozpoznanie")} visible={isScreenFocused}/>
      </Portal>
    </ScrollView>
  );
};
export default ExaminationScreen;