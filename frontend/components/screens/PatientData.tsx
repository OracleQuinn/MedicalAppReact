import { useIsFocused } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { FAB, Portal, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { styles } from '../../styles/Styles';
import { GenderEnum, NFZDepartmentEnum } from '../../utils/types/enums';
import { Gender, NFZDepartment } from '../../utils/types/labels';

interface IPatientDataScreenProps {
}

const PatientDataScreen: React.FunctionComponent<IPatientDataScreenProps> = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<GenderEnum>();
  const [address, setAddress] = useState("");
  const [idDocument, setIdDocument] = useState("");
  const [age, setAge] = useState<Number>();
  const [birthDate, setBirthDate] = useState("");
  const [idNFZ, setIdNFZ] = useState<NFZDepartmentEnum>();
  const [pesel, setPesel] = useState<Number>();
  const isScreenFocused = useIsFocused();

  const onChanged = (text: string, type: string) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
    }
    ((type === "age") ? setAge(Number(newText)) : setPesel(Number(newText)));
  }
  
  return (
    <ScrollView keyboardDismissMode='on-drag' >
      <TextInput mode='outlined' label='Imię' onChangeText={text => setFirstName(text)} value={firstName} activeOutlineColor="dodgerblue" />
      <TextInput mode='outlined' label='Nazwisko' onChangeText={text => setLastName(text)} value={lastName} activeOutlineColor="dodgerblue" />
      <View style={styles.picker}>
        <RNPickerSelect placeholder={{label: 'Wybierz płeć...', value: null}} onValueChange={(value) => setGender(value)} value={gender}
          items={Gender} 
        />
      </View>
      <TextInput mode='outlined' label='Adres zamieszkania' onChangeText={text => setAddress(text)} value={address} activeOutlineColor="dodgerblue" />
      <TextInput mode='outlined' label='Rodzaj i nr dokumentu tosamości' onChangeText={text => setIdDocument(text)} value={idDocument} activeOutlineColor="dodgerblue" />
      <TextInput keyboardType='numeric' mode='outlined' label='Wiek' activeOutlineColor="dodgerblue" onChangeText={text => onChanged(text, "age")} value={age?.toString()} maxLength={3} />
      <TextInput mode='outlined' label='Data urodzenia' onChangeText={text => setBirthDate(text)} value={birthDate} activeOutlineColor="dodgerblue" />
      <View style={styles.picker} >
        <RNPickerSelect placeholder={{label: 'Identyfikator NFZ...', value: null}} onValueChange={(value) => setIdNFZ(value)} value={idNFZ}
          items={NFZDepartment}
        />
      </View>
      <TextInput keyboardType='numeric' mode='outlined' label='Numer PESEL pacjenta' activeOutlineColor="dodgerblue" onChangeText={text => onChanged(text, "pesel")} value={pesel?.toString()} maxLength={11} />
      <Portal>
        <FAB icon="check" style={styles.fab} onPress={() => console.log('Patient Data Screen')} visible={isScreenFocused}/>
      </Portal>
    </ScrollView>
  );
};
export default PatientDataScreen;