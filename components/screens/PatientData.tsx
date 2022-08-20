import React, { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { transparent } from 'react-native-paper/lib/typescript/styles/colors';
import RNPickerSelect from 'react-native-picker-select';
import { styles } from '../../styles/Styles';

enum GenderEnum {
  female = "female",
  male = "male",
}

interface IPatientDataScreenProps {
  firstName: string,
  lastName: string,
  gender: GenderEnum,
  address: string,
  idDocument: string,
  age: number,
  birthDate: string,
  idNFZ: string,
  pesel: number,
}

const PatientDataScreen: React.FunctionComponent<IPatientDataScreenProps> = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<GenderEnum>();
  const [address, setAddress] = useState("");
  const [idDocument, setIdDocument] = useState("");
  const [age, setAge] = useState(0);
  const [birthDate, setBirthDate] = useState("");
  const [idNFZ, setIdNFZ] = useState("");
  const [pesel, setPesel] = useState(0);
  
  return (
    <View >
      <ScrollView>
        <TextInput mode='outlined' label='Imię' onChangeText={text => setFirstName(text)} value={firstName} activeOutlineColor="dodgerblue" />
        <TextInput mode='outlined' label='Nazwisko' onChangeText={text => setLastName(text)} value={lastName} activeOutlineColor="dodgerblue" />
        <View style={styles.picker}>
        <RNPickerSelect placeholder={{label: 'Wybierz płeć...', value: null}} onValueChange={(value) => setGender(value)} value={gender}
          items={[
            {label: 'Kobieta', value: "female"},
            {label: 'Mężczyzna', value: "male"}
          ]} 
        />
        </View>
        <TextInput mode='outlined' label='Adres zamieszkania' onChangeText={text => setAddress(text)} value={address} activeOutlineColor="dodgerblue" />
        <TextInput mode='outlined' label='Rodzaj i nr dokumentu tosamości' onChangeText={text => setIdDocument(text)} value={idDocument} activeOutlineColor="dodgerblue" />
        <TextInput mode='outlined' label='Wiek' activeOutlineColor="dodgerblue" />
        <TextInput mode='outlined' label='Data urodzenia' onChangeText={text => setBirthDate(text)} value={birthDate} activeOutlineColor="dodgerblue" />
        <TextInput mode='outlined' label='Identyfikator NFZ' onChangeText={text => setIdNFZ(text)} value={idNFZ} activeOutlineColor="dodgerblue" />
        <TextInput mode='outlined' label='Numer PESEL pacjenta' activeOutlineColor="dodgerblue" />
      </ScrollView>
    </View>
  );
};
export default PatientDataScreen;