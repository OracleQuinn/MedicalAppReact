import { useIsFocused } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView,  } from 'react-native-gesture-handler';
import { FAB, List, Portal, RadioButton, TextInput} from 'react-native-paper';
import { styles } from '../../styles/Styles';

interface IInterviewScreenProps {
  navigation: any,
}

const InterviewScreen: React.FunctionComponent<IInterviewScreenProps> = ({ navigation }) => {
  const [accidentPlace, setAccidentPlace] = useState("");
  const [diseases, setDiseases] = useState("");
  const [medicines, setMedicines] = useState("");
  const [notes, setNotes] = useState("");
  const isScreenFocused = useIsFocused();

  return (
    <ScrollView keyboardDismissMode='on-drag'>
      <List.AccordionGroup>
        <List.Accordion title="Miejsce zdarzenia" id="1" theme={{ colors: { primary: 'dodgerblue' }}} >
          <RadioButton.Group onValueChange={newValue => setAccidentPlace(newValue)} value={accidentPlace}>
            <RadioButton.Item label='w domu' value="home" />
            <RadioButton.Item label='w miejscu publicznym' value="public" />
            <RadioButton.Item label='w ruchu uliczno-drogowym' value="street" />
            <RadioButton.Item label='w pracy' value="work" />
            <RadioButton.Item label='w szkole' value="school" />
            <RadioButton.Item label='w rolnictwie' value="farm" />
          </RadioButton.Group>
        </List.Accordion>
        <List.Accordion title="Choroby i historia medyczna" id="2" theme={{ colors: { primary: 'dodgerblue' }}} >
          <TextInput mode='outlined' label='Choroby i historia medyczna pacjenta...' multiline={true} onChangeText={text => setDiseases(text)} value={diseases} activeOutlineColor="dodgerblue" />
        </List.Accordion>
        <List.Accordion title="Przyjmowane leki" id="3" theme={{ colors: { primary: 'dodgerblue' }}}>
          <TextInput mode='outlined' label='Przyjmowane leki...' multiline={true} onChangeText={text => setMedicines(text)} value={medicines} activeOutlineColor="dodgerblue" />
        </List.Accordion>
      </List.AccordionGroup>
      <TextInput mode='outlined' label='Dodatkowe uwagii...' multiline={true} onChangeText={text => setNotes(text)} value={notes} activeOutlineColor="dodgerblue" />
      <Portal>
        <FAB icon="check" style={styles.fab} onPress={() => navigation.navigate("Badanie")} visible={isScreenFocused}/>
      </Portal>
    </ScrollView>
  );
};
export default InterviewScreen;