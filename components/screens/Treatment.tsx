import { useIsFocused } from '@react-navigation/native';
import React, { useState } from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import {FAB, Portal} from 'react-native-paper';
import { styles } from '../../styles/Styles';

interface ITreatmentScreenProps {
  navigation: any,
}

export const Medicines = [
  {id: "1", name: "Acidum acetylsalicylicum"},
  {id: "2", name: "Adenosinum"},
  {id: "3", name: "Amiodaroni hydrochloridum"},
  {id: "4", name: "Atropini sulfas"},
  {id: "5", name: "Isosorbidi mononitras"},
  {id: "6", name: "Budesonidum"},
  {id: "7", name: "Captoprilum"},
  {id: "8", name: "Clemastinum"},
  {id: "9", name: "Clonazepamum"},
  {id: "10", name: "Clopidogrelum"},
  {id: "11", name: "Dexamethasoni phosphas"},
  {id: "12", name: "Diazepamum"},
  {id: "13", name: "Drotaverini hydrochloridum"},
  {id: "14", name: "Epinephrinum"},
  {id: "15", name: "Fentanylum"},
  {id: "16", name: "Flumazenilum"},
  {id: "17", name: "Furosemidum"},
  {id: "18", name: "Glyceroli trinitras"},
  {id: "19", name: "Glucagoni hydrochloridum"},
  {id: "20", name: "Glucosum 5%"},
  {id: "21", name: "Glucosum 20%"},
  {id: "22", name: "Heparinum natricum"},
  {id: "23", name: "Hydrocortisonum"},
  {id: "24", name: "Hydroxyzinum"},
  {id: "25", name: "Ibuprofenum"},
  {id: "26", name: "Ketoprofenum"},
  {id: "27", name: "Lidocaini hydrochloridum"},
  {id: "28", name: "Magnesii sulfas"},
  {id: "29", name: "Mannitolum – 15%"},
  {id: "30", name: "Metamizolum natricum"},
  {id: "31", name: "Metoclopramidum"},
  {id: "32", name: "Metoprololi tartras"},
  {id: "33", name: "Midazolamum"},
  {id: "34", name: "Morphini sulfas"},
  {id: "35", name: "Naloxoni hydrochloridum"},
  {id: "36", name: "Natrii chloridum 0,9%"},
  {id: "37", name: "Natrii hydrogenocarbonas 8,4%"},
  {id: "38", name: "Papaverini hydrochloridum"},
  {id: "39", name: "Paracetamolum"},
  {id: "40", name: "Płyn fizjologiczny wieloelektrolitowy izotoniczny"},
  {id: "41", name: "Płyny koloidowe"},
  {id: "42", name: "Salbutamolum"},
  {id: "43", name: "Solutio Ringeri/zbilansowany roztwór elektrolitowy"},
  {id: "44", name: "Thiethylperazinum"},
  {id: "45", name: "Ticagrelor"},
  {id: "46", name: "Tlen medyczny"},
  {id: "47", name: "Urapidilum"},
]

const TreatmentScreen: React.FunctionComponent<ITreatmentScreenProps> = ({navigation}) => {
  const isScreenFocused = useIsFocused();
  const [selectedItems, setSelectedItems] = useState<any>([]);

  const onSelectedItemsChange = (selectedItems: any[]) => {
    setSelectedItems(selectedItems);
  }

  console.log(selectedItems);
  //TO DO: rozwijalna lista leków na cały ekran.
  
  return (
    <SafeAreaView>
      <MultiSelect 
        items={Medicines}
        uniqueKey="id"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText="Wybierz lek"
        searchInputPlaceholderText="Jakiego leku szukasz..."
        styleMainWrapper={{borderColor: 'grey', borderWidth: 2, borderRadius: 8, backgroundColor: 'white', padding: 1}}
        tagRemoveIconColor="red"
        tagTextColor="black"
        selectedItemTextColor="dodgerblue"
        selectedItemIconColor="dodgerblue"
        itemTextColor="black"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="dodgerblue"
        submitButtonText="Zatwierdź"
        hideDropdown={true}
        fixedHeight={true}
      />
      <Portal>
        <FAB icon="check" style={styles.fab} onPress={() => navigation.navigate("Przekazanie")} visible={isScreenFocused}/>
      </Portal>
    </SafeAreaView>
  );
};
export default TreatmentScreen;