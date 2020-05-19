/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  View,
  Dimensions,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert, Text
} from 'react-native';

import {ListItem, Button, SearchBar } from 'react-native-elements';
import axios from 'axios';
import moment from 'moment';

import { PieChart } from 'react-native-chart-kit';

export default class WorldScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      totalConfirmedCases: -1,
      totalRecoveredCases: -1,
      totalDeathCases: -1,
      latestUSupdatedDate: '',
      cambodiaTimeStamp: {
        date: '',
        time: ''
      },
      countries: [],
      error: null
    };
  }

  componentDidMount() {
    this.getInitialData();
    this.getDataByCountries();
  }

  async getDataByCountries() {

    const response = await axios.get('https://api.covid19api.com/summary');

    try {
      this.setState({
        countries: response.data.Countries,
        isLoading: false
      });

    } catch (error) {
      this.setState({ error });
      console.log('Error', error);
    }
  }

  async getInitialData() {

    // Get total global numbers of each case type
    let summaryDataRequest = 'https://covid19.mathdro.id/api';

    await axios.get(summaryDataRequest).then(response => {
      
      const summaryResponse = response.data;
      //console.log(summaryResponse);

      const usDate = moment(summaryResponse.lastUpdate).format('YYYY-MM-DD HH:mm:ss');
      const cambodianDate = moment(usDate).add(14, 'hours').format('DD/MM/YYYY');
      const cambodianTime = moment(usDate).add(14, 'hours').format('HH:mm A');

      this.setState({
        isLoading: false,
        totalConfirmedCases: summaryResponse.confirmed.value,
        totalRecoveredCases: summaryResponse.recovered.value,
        totalDeathCases: summaryResponse.deaths.value,
        cambodiaTimeStamp: {
          date: cambodianDate,
          time: cambodianTime
        }
      });
    })
    .catch(error => {
      console.log('Error fetching global data', error);
    });
  }

  renderHeaderData() {

    return (
      <View style={{marginTop: 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        
        <View style={{...styles.eachCaseContainer}}>
          <View style={{flexDirection: 'row'}}>
            
            <View>
              <Text style={{...styles.textTitle, color: 'black'}}>ករណីឆ្លងជំងឺកូវីដសរុប</Text>
              <Text style={{...styles.subtitleText, color: 'black'}}>Global Confirmed Cases</Text>
            </View>

            <View style={{position: 'absolute', right: 0, marginRight: 20}}>
              <Text style={{fontSize: 30, alignSelf: 'center', paddingVertical: 10}}>{this.state.totalConfirmedCases}</Text>
            </View>
          
          </View>
        </View>

        <View style={{...styles.eachCaseContainer, marginTop: 30, backgroundColor: 'green'}}>
          <View style={{flexDirection: 'row'}}>
            
            <View>
              <Text style={{...styles.textTitle,}}>ករណីជាសះស្បើយ</Text>
              <Text style={styles.subtitleText}>Global Recovered Cases</Text>
            </View>

            <View style={{position: 'absolute', right: 0, marginRight: 20}}>
              <Text style={{fontSize: 30, alignSelf: 'center', paddingVertical: 10, color: 'white'}}>{this.state.totalRecoveredCases}</Text>
            </View>

          </View>
        </View>
        

        <View style={{...styles.eachCaseContainer, marginTop: 30, backgroundColor: 'red'}}>
          <View style={{flexDirection: 'row'}}>
            
            <View>
              <Text style={{...styles.textTitle}}>ករណីអ្នកជំងឺស្លាប់</Text>
              <Text style={styles.subtitleText}>Global Deaths</Text>
            </View>

            <View style={{position: 'absolute', right: 0, marginRight: 20}}>
              <Text style={{fontSize: 30, alignSelf: 'center', paddingVertical: 10, color: 'white'}}>{this.state.totalDeathCases}</Text>
            </View>

          </View>
        </View>

      </View>
    );
  }

  render() {

    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{textAlign: 'center', marginTop: 20}}>Sorry, there is an issue with our server :(</Text>
          <Text style={{textAlign: 'center'}}>Please try again later.</Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.AndroidSafeArea}>

        <ScrollView
          contentContainerStyle={styles.scrollableContainer}
          scrollEnabled={true}>
          
            {this.renderHeaderData()}

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
const GRAPH_HEIGHT_VIEW = (WHOLE_VIEW / (3 / 2)) - 160;
const DATA_LABEL_HEIGHT_VIEW = WHOLE_VIEW - GRAPH_HEIGHT_VIEW;
const EACH_CARD_HEIGHT = (Dimensions.get('window').height / 4) - 50;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  scrollableContainer: {
    flex: 1,
    height: Dimensions.get('window').height,
  },
  eachCaseContainer: {
    paddingTop: Dimensions.get('window').height > 800 ? 50 : 30,
    padding:15, 
    backgroundColor: 'white', 
    alignSelf: 'center',
    height: EACH_CARD_HEIGHT,
    width: Dimensions.get('window').width - 50,
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
  textTitle: {
    fontSize: 20,
    color: 'white'
  },
  subtitleText: {
    fontSize: 15,
    color: 'white'
  },
  caseNumber: {
    
  }
});
