import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';



export default function App() {
  const [ostos, asetaOstos] = useState('');
  const [data, setData] = useState([]);

  const lisaa = () =>{
      setData([...data, {key: ostos}]);
      asetaOstos("")
    
  }
  const tyhjenna = () =>{
    setData([]);
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.inputt}
      onChangeText={ostos => asetaOstos(ostos)}
      value={ostos}
      />
      <View style={styles.napit}>
        <Button onPress={lisaa} title="Lisää" />
        <Button onPress= {tyhjenna} title="Tyhjennä" />
      </View>
      <Text> OstosLista: </Text>
      <FlatList
        data={data}
        renderItem={({item}) =>( <Text>{item.key}</Text>)}
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
    padding: 100,
  },
  fontti: {
    color:'green',
    fontSize: 50,
  },
  napit: {
    flexDirection:"row",
    padding: 20,
  },
  inputt:{
    width: 200, 
    borderColor: 'gray',
    borderWidth: 1,
  },
});

