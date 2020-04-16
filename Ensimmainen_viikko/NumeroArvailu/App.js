import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert} from 'react-native';

const satunnainen = Math.floor(Math.random() * 100) + 1

export default function App() {
  
  const [arvaus, asetaArvaus] = useState();
  const [teksti, asetaTeksti] = useState("Arvaa numero 1-100 väliltä");
  const [luku, asetaLuku] = useState(0);

  const arvauss = () =>{
    asetaLuku(luku + 1)
    if (satunnainen > parseInt(arvaus)){
        asetaTeksti("Arvauksesi " + arvaus + " on liian matala")
    }else if (satunnainen < parseInt(arvaus)){
      asetaTeksti("Arvauksesi " + arvaus + " on liian korkea")
    }else if (satunnainen == parseInt(arvaus)){
      asetaTeksti("Arvasit oikein")
      Alert.alert('Arvasit oikean numeron ' + luku + ' arvauksella');
      asetaLuku(0)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.fontti}>{teksti}</Text>
      <TextInput style={styles.inputt}
      onChangeText={arvaus => asetaArvaus(arvaus)}
      value={arvaus}
      keyboardType="numeric"/>

      <View style={styles.napit}>
        <Button onPress={arvauss} title="Arvaa" />
      </View>
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
  fontti: {
    color:'green',
    fontSize: 20,
  },
  napit: {
    flexDirection:"row"
  },
  inputt:{
    width: 200, 
    borderColor: 'gray',
    borderWidth: 1
  },
});

