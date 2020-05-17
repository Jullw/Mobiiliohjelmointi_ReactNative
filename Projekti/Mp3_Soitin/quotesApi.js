  import React, { useState, useEffect } from 'react';
  import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
  import * as SQLite from 'expo-sqlite';
  import { Button } from 'react-native-elements';
  
  const db = SQLite.openDatabase('quotes.db');
  
  export default function App({route, navigation}) {

    const haeSanonta  = () =>{
      const url = 'https://api.kanye.rest/';
      fetch(url)
        .then(response => response.json())
        .then(responseJson => {   
          setSanonta(responseJson.quote);
        })
        .catch(error => {
          Alert.alert(error);
        });
    };


    const [sanonta, setSanonta] = useState('');
    const [quote, setQuote] = useState([]);
  
    useEffect(() => {
      db.transaction(tx => {
        tx.executeSql('create table if not exists quotes (id integer primary key not null, sanonta text);');
      });
      updateList();    
    }, []);
  
  
    const saveItem = () => {
      db.transaction(tx => {
          tx.executeSql('insert into quotes ( sanonta ) values ( ? );', [ sanonta ]);    
        }, null, updateList
      )
    }
  
    const updateList = () => {
      db.transaction(tx => {
        tx.executeSql('select * from quotes;', [], (_, { rows }) =>
          setQuote(rows._array)
        ); 
      });
    }
  
    const deleteItem = (id) => {
      db.transaction(
        tx => {
          tx.executeSql(`delete from quotes where id = ?;`, [id]);
        }, null, updateList
      )    
    }
  
    const listSeparator = () => {
      return (
        <View
          style={{
            height: 2,
            width: "100%",
            backgroundColor: "black",
          }}
        />
      );
    };
  
    // Databasesta pystyy poistamaan sanontoja painamalla pitkään pohjaan sanontaa
    return (
      
      <View style={styles.container}>
        <View style={styles.kk}>
        <Text> {sanonta} </Text>
        <Button type="outline"  title='Hae sanonta' onPress={haeSanonta} buttonStyle={{borderColor: 'white'}} >  </Button>
        <Button type="outline" onPress={saveItem} title="Tallenna databaseen" titleStyle={{ color: 'green' }} buttonStyle={{borderColor: 'white'}}/> 
        <Text style={{marginTop: 15, fontSize: 20}}>Quotes by Kanye West</Text>
        <FlatList 
          keyExtractor={item => item.id.toString()} 
          renderItem={({item}) => <TouchableOpacity style={styles.listcontainer}onLongPress={() => deleteItem(item.id)} ><Text style={{fontSize: 13}}>{item.sanonta}</Text>
          </TouchableOpacity>} 
          data={quote} 
          ItemSeparatorComponent={listSeparator} 
        />
        </View>
      </View>
    );
  }
  
  
  const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   },
   listcontainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center'
   },
   kk: {
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%'
   }
  });