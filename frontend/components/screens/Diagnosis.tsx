import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {FAB, Portal} from 'react-native-paper';
import { styles } from '../../styles/Styles';

interface IDiagnosisScreenProps {
  navigation: any,
}

const DiagnosisScreen: React.FunctionComponent<IDiagnosisScreenProps> = ({navigation}) => {
  const isScreenFocused = useIsFocused();
  
  return (
    <ScrollView keyboardDismissMode='on-drag'>
      <Portal>
        <FAB icon="check" style={styles.fab} onPress={() => navigation.navigate("Postępowanie")} visible={isScreenFocused}/>
      </Portal>
    </ScrollView>
  );
};
export default DiagnosisScreen;