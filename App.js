import React, {useState, useEffect} from 'react';
import { Rating } from 'react-native-ratings';

import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Button
} from 'react-native';
import api from './api/api';

const App = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);

  useEffect(() => {
    api.get().then((Response) => {
      for(var i = 0; i < Response.data.hits.length; i++){
        if(Response.data.hits){
          setFilteredData(Response.data.hits);
          setMasterData(Response.data.hits);
        }
      }
    })
  }, []);

  const searchFilter = (text) => {
    if (text) {
      api.get(text).then((Response) => {
        for(var i = 0; i < Response.data.hits.length; i++){
          if(Response.data.hits){
            setFilteredData(Response.data.hits);
          }
        }
        setSearch(text);
      });
    } else {
      setFilteredData(filteredData);
      setSearch(text);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
 }

 const ItemView = ({item}) => {
  return (
    <View> 
      <Text
      style={styles.itemStyle}>
      {'Author: '}
      {item.author + '\n'}
      {'Title: '}
      {item.title + '\n'}
      {'Url: '}
      {item.url + '\n'}
      {'Rate: '}
    </Text>
    <Rating
        type='star'
        ratingCount={5}
        imageSize={20}
      />
    </View>
  );
};

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText = {(text) => handleSearch(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Procure Aqui"
        />
        <Button
        onPress = {() => searchFilter(search)}
        title="Search"
        color="blue"
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => 'key'+ index}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: 'white',
  },
  itemStyle: {
    backgroundColor: '#0066CC',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    color: 'white',
  },
  starRating: {
    backgroundColor: '#0066CC',
    marginLeft: 0
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#0066CC',
  }
});

export default App;