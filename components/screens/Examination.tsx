import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {FAB, Portal} from 'react-native-paper';
import { styles } from '../../styles/Styles';

interface IExaminationScreenProps {
  navigation: any,
}

const ExaminationScreen: React.FunctionComponent<IExaminationScreenProps> = ({navigation}) => {
  const isScreenFocused = useIsFocused();
  
  return (
    <ScrollView keyboardDismissMode='on-drag'>
      <Portal>
        <FAB icon="check" style={styles.fab} onPress={() => navigation.navigate("Rozpoznanie")} visible={isScreenFocused}/>
      </Portal>
    </ScrollView>
  );
};
export default ExaminationScreen;