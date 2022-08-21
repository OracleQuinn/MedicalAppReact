import { useIsFocused } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { FAB, Portal, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { styles } from '../../styles/Styles';

enum GenderEnum {
  female = "female",
  male = "male",
}

enum NFZDepartment {
  dolnoslaski = "001", 
  kujawskoPomorski = "002", 
  lubelski = "003", 
  lubuski ="004", 
  lodzki = "005", 
  malopolski = "006", 
  mazowiecki = "007", 
  opolski = "008", 
  podkarpacki = "009", 
  podlaski = "010", 
  pomorski = "011", 
  slaski = "012", 
  swietokrzyski = "013", 
  warminskoMazurski = "014", 
  wielkopolski = "015", 
  zachodniopomorski = "016"
}

interface IPatientDataScreenProps {
  firstName: string,
  lastName: string,
  gender: GenderEnum,
  address: string,
  idDocument: string,
  age: number,
  birthDate: string,
  idNFZ: NFZDepartment,
  pesel: number,
}

const PatientDataScreen: React.FunctionComponent<IPatientDataScreenProps> = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<GenderEnum>();
  const [address, setAddress] = useState("");
  const [idDocument, setIdDocument] = useState("");
  const [age, setAge] = useState<Number>();
  const [birthDate, setBirthDate] = useState("");
  const [idNFZ, setIdNFZ] = useState<NFZDepartment>();
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

  //TO DO: Zapis wszystkich danych i przesył do bazy po naciśnięciu przycisku FAB. 
  
  return (
    <ScrollView keyboardDismissMode='on-drag' >
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
      <TextInput keyboardType='numeric' mode='outlined' label='Wiek' activeOutlineColor="dodgerblue" onChangeText={text => onChanged(text, "age")} value={age?.toString()} maxLength={3} />
      <TextInput mode='outlined' label='Data urodzenia' onChangeText={text => setBirthDate(text)} value={birthDate} activeOutlineColor="dodgerblue" />
      <View style={styles.picker} >
        <RNPickerSelect placeholder={{label: 'Identyfikator NFZ...', value: null}} onValueChange={(value) => setIdNFZ(value)} value={idNFZ}
          items={[
            {label: 'Dolnośląski Oddział NFZ we Wrocławiu', value: "001"},
            {label: 'Kujawsko-Pomorski Oddział NFZ w Bydgoszczy', value: "002"},
            {label: 'Lubelski Oddział NFZ w Lublinie', value: "003"},
            {label: 'Lubuski Oddział NFZ w Zielonej Górze', value: "004"},
            {label: 'Łódzki Oddział NFZ w Łodzi', value: "005"},
            {label: 'Małopolski Oddział NFZ w Krakowie', value: "006"},
            {label: 'Mazowiecki Oddział NFZ w Warszawie', value: "007"},
            {label: 'Opolski Oddział NFZ w Opolu', value: "008"},
            {label: 'Podkarpacki Oddział NFZ w Rzeszowie', value: "009"},
            {label: 'Podlaski Oddział NFZ w Białymstoku', value: "010"},
            {label: 'Pomorski Oddział NFZ w Gdańsku', value: "011"},
            {label: 'Śląski Oddział NFZ w Katowicach', value: "012"},
            {label: 'Świętokrzyski Oddział NFZ w Kielcach', value: "013"},
            {label: 'Warmińsko-Mazurski Oddział NFZ w Olsztynie', value: "014"},
            {label: 'Wielkopolski Oddział NFZ w Poznaniu', value: "015"},
            {label: 'Zachodniopomorski Oddział NFZ w Szczecinie', value: "016"},
          ]} 
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