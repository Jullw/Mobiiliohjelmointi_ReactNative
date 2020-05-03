import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';
import {Input, Button } from 'react-native-elements';



const db = SQLite.openDatabase('ostoslista.db');

export default function App() {
  const [tuote, setTuote] = useState('');
  const [maara, setMaara] = useState('');
  const [ostos, setOstos] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists ostoslista (id integer primary key not null, maara text, tuote text);');
    });
    updateList();    
  }, []);


  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into ostoslista (maara, tuote) values (?, ?);', [ maara, tuote]);    
      }, null, updateList
    )
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from ostoslista;', [], (_, { rows }) =>
        setOstos(rows._array)
      ); 
    });
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from ostoslista where id = ?;`, [id]);
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


  return (
    
    <View style={styles.container}>

      <Input inputStyle={{borderBottomColor: 'green', borderBottomWidth: 2}} label = 'Tuote' labelStyle={{color:'green'}} placeholder='Tuote'
        onChangeText={(tuote) => setTuote(tuote)}
        value={tuote}/>  
      <Input inputStyle={{borderBottomColor: 'green', borderBottomWidth: 2}} labelStyle={{color:'green'}} label='Määrä' placeholder='Maara' 
        onChangeText={(maara) => setMaara(maara)}
        value={maara}/>    

      <Button type="outline" onPress={saveItem} title="Tallenna" titleStyle={{ color: 'white' }} buttonStyle={{backgroundColor: 'green', borderColor: 'green'}}/> 
      <Text style={{marginTop: 30, fontSize: 22}}>Ostoslista</Text>
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 20}}>{item.tuote}, {item.maara}</Text>
        <Button title='Ostettu' titleStyle={{ color: 'black' }} buttonStyle={{backgroundColor: 'lightgrey'}} onPress={() => deleteItem(item.id)}></Button></View>} 
        data={ostos} 
        ItemSeparatorComponent={listSeparator} 
      />      
    </View>
  );
}


const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  top: 100
 },
 listcontainer: {
  flexDirection: 'row',
  backgroundColor: 'white',
  alignItems: 'center'
 },
});