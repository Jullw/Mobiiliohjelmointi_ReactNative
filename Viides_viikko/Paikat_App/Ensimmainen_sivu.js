import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import {Input, Button } from 'react-native-elements';


const db = SQLite.openDatabase('ostoslista.db');

export default function App({ navigation }) {
  const [tuote, setTuote] = useState('');
  const [ostos, setOstos] = useState([]);


  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists ostoslista (id integer primary key not null, tuote text);');
    });
    updateList();    
  }, []);
  
  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into ostoslista (tuote) values (?);', [tuote]);    
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
          height: 5,
          width: "100%",
          backgroundColor: "black",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Input inputStyle={{borderBottomColor: 'green', borderBottomWidth: 2}} label = 'Paikka' labelStyle={{color:'green'}} placeholder='Paikka'
        onChangeText={(tuote) => setTuote(tuote)}
        value={tuote}/>     
      <Button onPress={saveItem} type="outline" title="Tallenna" titleStyle={{ color: 'white' }} buttonStyle={{backgroundColor: 'grey'}} />
      <Text >    </Text>
      <FlatList
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => <TouchableOpacity style={styles.listcontainer} onLongPress={() => deleteItem(item.id)} onPress={() => navigation.navigate('historia', {tieto: item})}>
        <Text style={{fontSize: 18}}>{item.tuote}</Text>
        </TouchableOpacity>}
        data={ostos} 
        ItemSeparatorComponent={listSeparator} 
      />      
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
 },
 listcontainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'lightgrey'
 },
});