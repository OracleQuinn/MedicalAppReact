import React from 'react';
import {View} from 'react-native';
import {Title} from 'react-native-paper';

interface IHomeScreenProps {}

const HomeScreen: React.FunctionComponent<IHomeScreenProps> = (props) => {
  return (
    <View>
      <Title>Home Screen</Title>
    </View>
  );
};
export default HomeScreen;