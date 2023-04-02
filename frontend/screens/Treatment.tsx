import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { TextInput, FAB, List, Portal } from 'react-native-paper';
import { styles } from '../styles/Styles';
import { EmsDrugs, getEmsDrugs } from '../utils/api/get-ems-drugs';
import { CheckBox } from 'react-native-elements';
import { RescueOperations } from '../utils/types/labels';
import { useIsFocused } from '@react-navigation/native';
import { DoseByOption } from '../utils/types/types';

interface ITreatmentScreenProps {
  navigation: any,
}

const TreatmentScreen: React.FunctionComponent<ITreatmentScreenProps> = ({navigation}) => {
  const isScreenFocused = useIsFocused();
  const [selectedMedicines, setSelectedMedicines] = useState<EmsDrugs[]>([]);
  const [medicines, setMedicines] = useState<EmsDrugs[]>();
  const [selectedOperations, setSelectedOperations] = useState<string[]>([]);
  const [otherOperations, setOtherOperations] = useState<string>('');
  const [otherSelected, setOtherSelected] = useState(false);
  const [recommendations, setRecommendations] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [doseByOption, setDoseByOption] = useState<DoseByOption>({});

  useEffect(() => {
    async function fetch() {
      const data = await getEmsDrugs();
      setMedicines(data);
    }
    fetch();
  }, []);

  const onSlectedMedicinesChange = (option: EmsDrugs) => {
    if (selectedMedicines.includes(option)) {
      setSelectedMedicines(selectedMedicines.filter((o) => o !== option));
    } else {
      setSelectedMedicines([...selectedMedicines, option]);
    }
  };

  const onSlectedMedicinesDoseChange = (option: EmsDrugs, dose: string) => {
    setDoseByOption({ ...doseByOption, [option.id]: dose });
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
  };
  
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
            {medicines && medicines.filter((option, i) => option.latin_name.toLowerCase().includes(searchTerm.toLowerCase())).map((option) => (
              <View key={option.id}>
                <CheckBox title={option.latin_name} key={option.id + 'id'} checked={selectedMedicines.includes(option)} onPress={() => onSlectedMedicinesChange(option)}/>
                {selectedMedicines.includes(option) && <TextInput mode='outlined' label='Dawka' activeOutlineColor="dodgerblue" value={doseByOption[option.id] || ''} onChangeText={(dose) => onSlectedMedicinesDoseChange(option, dose)}/>}
              </View>
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