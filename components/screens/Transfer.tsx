import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {FAB, Portal} from 'react-native-paper';
import { styles } from '../../styles/Styles';

interface ITransferScreenProps {
  navigation: any,
}

const TransferScreen: React.FunctionComponent<ITransferScreenProps> = ({navigation}) => {
  const isScreenFocused = useIsFocused();
  
  return (
    <ScrollView keyboardDismissMode='on-drag'>
      <Portal>
        <FAB icon="check" style={styles.fab} onPress={() => navigation.navigate("Dane pacjenta")} visible={isScreenFocused}/>
      </Portal>
    </ScrollView>
  );
};
export default TransferScreen;