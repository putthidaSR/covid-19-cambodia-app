/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
} from 'react-native';
import {ListItem, Button, Text} from 'react-native-elements';
import axios from 'axios';
import moment from 'moment';

import { PieChart } from 'react-native-chart-kit';

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalConfirmedCases: -1,
      totalActiveCases: -1,
      totalRecoveredCases: -1,
      totalDeathCases: -1,
      latestUSupdatedDate: '',
      cambodiaTimeStamp: {
        date: '',
        time: ''
      }
    };
  }

  componentDidMount() {
    
    // Fetch the data from the APIs
    this.getInitialData();
  }

  async getInitialData() {

    // Get total numbers of each case type
    let summaryDataRequest = 'https://covid19.mathdro.id/api/countries/cambodia';

    // Get List Of Cases By Case Type From The First Recorded Case
    let detailedDataRequest = 'https://api.covid19api.com/dayone/country/cambodia';

    const requestOne = axios.get(summaryDataRequest); 
    const requestTwo = axios.get(detailedDataRequest); 

    await axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {   
      const summaryResponse = responses[0].data;
      const detailedCasesResponse = responses[1];
      
      const usDate = moment(summaryResponse.lastUpdate).format('YYYY-MM-DD HH:mm:ss');
      const cambodianDate = moment(usDate).add(14, 'hours').format('DD/MM/YYYY');
      const cambodianTime = moment(usDate).add(14, 'hours').format('HH:mm A');
      console.log(cambodianDate, cambodianTime);

      // access the results
      this.setState({
        totalConfirmedCases: summaryResponse.confirmed.value,
        totalRecoveredCases: summaryResponse.recovered.value,
        totalDeathCases: summaryResponse.deaths.value,
        totalActiveCases: summaryResponse.confirmed.value - (summaryResponse.recovered.value + summaryResponse.deaths.value),
        latestUSupdatedDate: moment(summaryResponse.lastUpdate).format('YYYY-MM-DD h:mm:ss a'),
        cambodiaTimeStamp: {
          date: cambodianDate,
          time: cambodianTime
        }
      });

    })).catch(errors => {
      console.log('Error fetching data from APIs', errors);
    });
  }

  renderGraph() {}

  renderDataLabels() {

    const data = [
      {
        name: 'Active Cases',
        population: this.state.totalActiveCases,
        color: 'green',
        legendFontColor: '#7F7F7F',
        legendFontSize: 11
      },
      {
        name: 'Recovered Cases',
        population: this.state.totalRecoveredCases,
        color: 'blue',
        legendFontColor: '#7F7F7F',
        legendFontSize: 11,
      },
      {
        name: 'Deaths',
        population: this.state.totalDeathCases,
        color: 'red',
        legendFontColor: '#7F7F7F',
        legendFontSize: 11
      }
    ];

    return (
      <PieChart
        data={data}
        width={Dimensions.get('window').width - 30}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}
        accessor="population"
        backgroundColor="transparent"
        absolute
      />

    );
  }

  render() {
    console.log('test');
    return (
      <SafeAreaView style={styles.AndroidSafeArea}>

        <ScrollView
          contentContainerStyle={styles.scrollableContainer}
          keyboardShouldPersistTaps="never"
          scrollEnabled={true}>

        {/*********************************************
         *  Top half of the screen: Graph container view
         *********************************************/}
          <View style={styles.pieCharContainer}>
            {this.renderDataLabels()}
          </View>

        {/*********************************************
         *  Bottom half of the screen: Data label container view
         *********************************************/}
          <View style={styles.dataLabelContainer}>

            <ListItem
              title={'ករណីឆ្លងជំងឺកូវីដសរុប'}
              titleStyle={styles.titleText}
              subtitle={'Total Confirmed Cases'}
              rightElement={<Text>{this.state.totalConfirmedCases}</Text>}
              leftIcon={<Image style={{width: 40, height: 40}} source={require('./../../assets/images/covid-icon.png')} />}
              bottomDivider
            />

            <ListItem
              title={'ករណីអ្នកកំពុងផ្ទុកជំងឺ'}
              titleStyle={styles.titleText}
              subtitle={'Total Active Cases'}
              rightElement={<Text>{this.state.totalActiveCases}</Text>}
              leftIcon={<Image style={{width: 40, height: 40}} source={require('./../../assets/images/covid-icon.png')} />}
              bottomDivider
            />

            <ListItem
              title={'ករណីជាសះស្បើយ'}
              titleStyle={styles.titleText}
              subtitle={'Total Recovered Cases'}
              rightElement={<Text>{this.state.totalRecoveredCases}</Text>}
              leftIcon={<Image style={{width: 40, height: 40}} source={require('./../../assets/images/covid-icon.png')} />}
              bottomDivider
            />

            <ListItem
              title={'ករណីអ្នកជំងឺស្លាប់'}
              titleStyle={styles.titleText}
              subtitle={'Total Deaths'}
              rightElement={<Text>{this.state.totalDeathCases}</Text>}
              leftIcon={<Image style={{width: 40, height: 40}} source={require('./../../assets/images/covid-icon.png')} />}
              bottomDivider
            />

                
          </View>
        </ScrollView>

        <Text style={{color: '#517fa4', position: 'absolute', bottom: 0, marginBottom: 40, right: 0, marginRight: 20}}>
          Last Update (Local Time in Phnom Penh):
        </Text>
        <Text style={{color: '#517fa4', position: 'absolute', bottom: 0, marginBottom: 20, right: 0, marginRight: 20, fontWeight: 'bold'}}>
          {this.state.cambodiaTimeStamp.date} {this.state.cambodiaTimeStamp.time}
        </Text>     
      </SafeAreaView>
    );
  }
}

const WHOLE_VIEW = Dimensions.get('window').height;
const GRAPH_HEIGHT_VIEW = (WHOLE_VIEW / (3 / 2)) - 210;
const DATA_LABEL_HEIGHT_VIEW = WHOLE_VIEW - GRAPH_HEIGHT_VIEW;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  scrollableContainer: {
    height: Dimensions.get('window').height
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphContainer: {
    height: GRAPH_HEIGHT_VIEW
  },
  dataLabelContainer: {
    marginTop: 30,
    height: DATA_LABEL_HEIGHT_VIEW
  },
  pieCharContainer: {
    marginTop: 20,
    backgroundColor: 'white', 
    alignSelf: 'center',
    height: Dimensions.get('window').height < 800 ? GRAPH_HEIGHT_VIEW : GRAPH_HEIGHT_VIEW - 100,
    width: Dimensions.get('window').width - 30,
    borderRadius: 30,
    shadowOffset: {
      width: 5,
      height: 10
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.73,
    shadowRadius: 10,
    elevation: 15
  },
});
