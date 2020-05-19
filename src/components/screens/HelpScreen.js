/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, Image, View, SafeAreaView, Linking} from 'react-native';
import {ListItem, Button} from 'react-native-elements';

export default class HelpScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <View style={{marginTop: 30}}>
          <ListItem
            title={'ក្រសួងសុខាភិបាលកម្ពុជា'}
            subtitle={'Ministry of Health in Cambodia'}
            titleStyle={styles.titleText}
            leftIcon={
              <Image
                style={{width: 40, height: 40}}
                source={require('./../../assets/images/moh.png')}
              />
            }
            rightElement={
              <Text style={{color: 'blue'}}
                onPress={() => Linking.openURL('http://cdcmoh.gov.kh/')}>
                Visit Site
              </Text>
            }
            bottomDivider
          />
          <ListItem
            title={'COVID-19 Dashboard'}
            subtitle={'Provided by Johns Hopkins University'}
            titleStyle={styles.titleText}
            leftIcon={
              <Image
                style={{width: 40, height: 40}}
                source={require('./../../assets/images/jhu.jpg')}
              />
            }
            rightElement={
              <Text style={{color: 'blue'}}
                onPress={() => Linking.openURL('https://coronavirus.jhu.edu/map.html')}>
                Visit Site
              </Text>
            }
            bottomDivider
          />
          <ListItem
            title={'World Health Organization'}
            titleStyle={styles.titleText}
            leftIcon={
              <Image
                style={{width: 40, height: 40}}
                source={require('./../../assets/images/who.png')}
              />
            }
            rightElement={
              <Text style={{color: 'blue'}}
                onPress={() => Linking.openURL('https://www.who.int/health-topics/coronavirus#tab=tab_1')}>
                Visit Site
              </Text>
            }
            bottomDivider
          />
        </View>

          <Button
            type="solid"
            title=" សម្រាប់ព័ត៌មានទាន់ហេតុការណ៍ សូមទូរស័ព្ទទៅ ១១៥ "
            titleStyle={{fontSize: 15, fontWeight: 'bold'}}
            containerStyle={{width: (Dimensions.get('window').width) - 30, alignSelf: 'center', paddingBottom: 15, position: 'absolute', bottom: 0, marginBottom: 15}}
            buttonStyle={{
              borderWidth: 3,
              borderColor: 'white',
              borderRadius:10,
              shadowOffset: {width: 5, height: 5},
              shadowColor: 'rgba(0,0,0,1)',
              shadowOpacity: 0.43,
              height: 50,
              backgroundColor: '#517fa4'
            }}
            icon={<Image style={{width: 35, height: 35}} source={require('./../../assets/images/call-icon.png')} />}
          />

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2980b9',
    paddingBottom: 5
  },
  contactContainer: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: 200,
    borderRadius: 30,
    shadowOffset: {
      width: 5,
      height: 10
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.73,
    shadowRadius: 10,
    elevation: 15
  }
});
