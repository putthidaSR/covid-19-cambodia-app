import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

/**
 * The first component that the application will render when the app is loaded.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('test');
    return (
      <SafeAreaView>
        <View>
          <Text>Hello, world!</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
