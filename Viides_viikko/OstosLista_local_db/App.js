import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';


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
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder='Tuote' style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(tuote) => setTuote(tuote)}
        value={tuote}/>  
      <TextInput placeholder='Maara' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(maara) => setMaara(maara)}
        value={maara}/>      
      <Button onPress={saveItem} title="Tallenna" /> 
      <Text style={{marginTop: 30, fontSize: 20}}>Ostoslista</Text>
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 18}}>{item.tuote}, {item.maara}</Text>
        <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => deleteItem(item.id)}> Ostettu</Text></View>} 
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
 },
 listcontainer: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center'
 },
});