import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import { styles } from '../../styles/Styles';
import axios from 'axios';
import { EmsDrugs } from '../../types/interfaces';
import MultiSelect from 'react-native-multiple-select';

interface ITreatmentScreenProps {
  navigation: any,
}

const TreatmentScreen: React.FunctionComponent<ITreatmentScreenProps> = ({navigation}) => {
  const isScreenFocused = useIsFocused();
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [medicines, setMedicines] = useState<EmsDrugs[]>();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get('https://40dd-2a02-a317-a036-9e00-904f-29b-e4e2-3a46.eu.ngrok.io/api/ems/drugs', {
          headers: {
            "ngrok-skip-browser-warning":"any"
          }
        });
        setMedicines(result.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const onSelectedItemsChange = (selectedItems: any[]) => {
    setSelectedItems(selectedItems);
  }

  //TO DO: rozwijalna lista leków na cały ekran.
  
  return (
    medicines !== undefined && <SafeAreaView>
       <MultiSelect 
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