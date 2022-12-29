import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import { styles } from '../styles/Styles';
import { EmsDrugs, getEmsDrugs } from '../utils/api/get-ems-drugs';
import MultiSelect from 'react-native-multiple-select';

interface ITreatmentScreenProps {
  navigation: any,
}

const TreatmentScreen: React.FunctionComponent<ITreatmentScreenProps> = ({navigation}) => {
  const isScreenFocused = useIsFocused();
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [medicines, setMedicines] = useState<EmsDrugs[]>();

  useEffect(() => {
    async function fetch() {
      const data = await getEmsDrugs();
      setMedicines(data);
    }
    fetch();
  }, []);

  const onSelectedItemsChange = (selectedItems: any[]) => {
    setSelectedItems(selectedItems);
  }
  
  return (
    <SafeAreaView>
      {medicines && <MultiSelect 
        items={medicines}
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
        displayKey="latin_name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="dodgerblue"
        submitButtonText="Zatwierdź"
        hideDropdown={true}
        fixedHeight={true}
      />}
      <Portal>
        <FAB icon="check" style={styles.fab} onPress={() => navigation.navigate("Przekazanie")} visible={isScreenFocused}/>
      </Portal>
    </SafeAreaView>
  );
};
export default TreatmentScreen;