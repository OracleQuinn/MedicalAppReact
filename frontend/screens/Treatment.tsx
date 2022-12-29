import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { TextInput, FAB, List, Portal } from 'react-native-paper';
import { styles } from '../styles/Styles';
import { EmsDrugs, getEmsDrugs } from '../utils/api/get-ems-drugs';
import { CheckBox } from 'react-native-elements';
import { RescueOperations } from '../utils/types/labels';
import { useIsFocused } from '@react-navigation/native';

interface ITreatmentScreenProps {
  navigation: any,
}

const TreatmentScreen: React.FunctionComponent<ITreatmentScreenProps> = ({navigation}) => {
  const isScreenFocused = useIsFocused();
  const [selectedMedicines, setSelectedMedicines] = useState<any[]>([]);
  const [medicines, setMedicines] = useState<EmsDrugs[]>();
  const [selectedOperations, setSelectedOperations] = useState<string[]>([]);
  const [otherOperations, setOtherOperations] = useState<string>('');
  const [otherSelected, setOtherSelected] = useState(false);
  const [recommendations, setRecommendations] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function fetch() {
      const data = await getEmsDrugs();
      setMedicines(data);
    }
    fetch();
  }, []);

  const onSlectedMedicinesChange = (option: string) => {
    if (selectedMedicines.includes(option)) {
      setSelectedMedicines(selectedMedicines.filter((o) => o !== option));
    } else {
      setSelectedMedicines([...selectedMedicines, option]);
    }
  };

  const onSlectedOperationsChange = (operation: string, other: boolean) => {
    let newOptions = [...selectedOperations];
    other ? setOtherOperations(operation) : {}
    if (newOptions.includes(operation)) {
      newOptions = newOptions.filter(o => o !== operation);
    } else {
      newOptions.push(operation);
    }
    setSelectedOperations(newOptions);
  }
  
  return (
    <SafeAreaView>
      <ScrollView>
        <List.AccordionGroup>
          <List.Accordion title="Czynności" id="1" theme={{ colors: { primary: 'dodgerblue' }}} >
            {RescueOperations.map(operation => (
              <CheckBox key={operation} title={operation} checked={selectedOperations.includes(operation)} onPress={() => onSlectedOperationsChange(operation, false)}/>
            ))}
            <CheckBox
              title='Inne'
              checked={otherSelected}
              onPress={() => setOtherSelected(!otherSelected)}
            />
            {otherSelected && (
                <TextInput mode='outlined' label='Wpisz wartość' activeOutlineColor="dodgerblue" value={otherOperations} onChangeText={(text: string) => onSlectedOperationsChange(text, true)}/>
            )}
          </List.Accordion>
          <List.Accordion title="Zastosowane wyroby medyczne" id="2" theme={{ colors: { primary: 'dodgerblue' }}} >
            <TextInput
              placeholder="Wpisz nazwę leku"
              onChangeText={setSearchTerm}
              value={searchTerm}
            />
            {medicines && medicines.filter((option) => option.latin_name.toLowerCase().includes(searchTerm.toLowerCase())).map((option) => (
              <CheckBox title={option.latin_name} key={option.id} checked={selectedMedicines.includes(option)} onPress={() => onSlectedMedicinesChange(option.latin_name)}/>
            ))}
          </List.Accordion>
          <List.Accordion title="Zalecenia i uwagi" id="3" theme={{ colors: { primary: 'dodgerblue' }}} >
            <TextInput mode='outlined' onChangeText={text => setRecommendations(text)} value={recommendations} activeOutlineColor="dodgerblue" />
          </List.Accordion>
        </List.AccordionGroup>
      </ScrollView>
      <Portal>
        <FAB icon="check" style={styles.fab} onPress={() => navigation.navigate("Przekazanie")} visible={isScreenFocused}/>
      </Portal>
    </SafeAreaView>
  );
};
export default TreatmentScreen;