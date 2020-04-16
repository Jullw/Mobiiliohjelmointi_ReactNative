import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, AsyncStorage} from 'react-native';

let satunnainen = Math.floor(Math.random() * 100) + 1

export default function App() {
  
  const [arvaus, asetaArvaus] = useState();
  const [teksti, asetaTeksti] = useState("Arvaa numero 1-100 väliltä");
  const [luku, asetaLuku] = useState(0);
  const [ennatys, asetaEnnatys] = useState();



  const arvauss = () =>{
    asetaLuku(luku + 1)
    if (satunnainen > parseInt(arvaus)){
        asetaTeksti("Arvauksesi " + arvaus + " on liian matala")
    }else if (satunnainen < parseInt(arvaus)){
      asetaTeksti("Arvauksesi " + arvaus + " on liian korkea")
    }else if (satunnainen == parseInt(arvaus)){
      asetaTeksti("Arvasit oikein")
      Alert.alert('Arvasit oikean numeron ' + luku + ' arvauksella');
      satunnainen = Math.floor(Math.random() * 100) + 1 // Arvotaan uusi satunnainen numero, kun kierros on ohi.
      if(ennatys == null){
        lueEnnatys() // Asettaa ennatyksen asetaEnnatyksellä funktion sisällä
        // Koska halutaan ennatys muuttujaan arvo != null
      }else if(ennatys > luku){ // Verrataan tallennettua arvoa(ennatys(poimittu asyncistä)) muuttuvaan luku arvoon, joka kieroksella.
        tallenna_ennatys()  
        lueEnnatys()
      }
      asetaLuku(0) 
    }
  }

  tallenna_ennatys = async () => {
    let en_luku = JSON.stringify(luku)
    try {
      await AsyncStorage.clear(); // Koska käytän vain yhtä avainta tyhjennetään storage 'Avain' avaimesta ja sen omaavasta arvoparista
      await AsyncStorage.setItem('Avain', en_luku);
    } catch (error) {
      Alert.alert('Dataa ei pystynyt tallentamaan');
    }
  };

  lueEnnatys = async () => {
    try {
      let arvo = await AsyncStorage.getItem('Avain');
      asetaEnnatys(JSON.parse(arvo)) // HOX! 
    } catch (error) {
        Alert.alert('Dataa ei pystynyt tallentamaan');
    }
  };

  lueEnnatys()
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
      <Text style={styles.fontti}> Ennatys: {ennatys} </Text>
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
