/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Word</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7159c1',
  },
  text: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#FFF',
  },
});

export default App;
