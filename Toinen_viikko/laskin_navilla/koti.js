import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';

import historia from './historia';

export default function koti({ navigation }) {
    const [ekaNumero, asetaEka] = useState('');
    const [tokaNumero, asetaToka] = useState('');
    const [tulos, asetaTulos] = useState(0);
  
    const [data, setData] = useState([]);

    const miinus = () =>{
      asetaTulos(parseInt(ekaNumero) - parseInt(tokaNumero));
      const tulos_tekstina = ekaNumero + " - " + tokaNumero + " = " + tulos
      setData([...data, {key: tulos_tekstina}]);
      
    }
    const plus = () =>{
      asetaTulos(parseInt(ekaNumero) + parseInt(tokaNumero));
      const tulos_tekstina = ekaNumero + " + " + tokaNumero + " = " + tulos
      setData([...data, {key: tulos_tekstina}]);
    }
    

    return (
    <View style={styles.container}>
        
        <Text style={styles.fontti} >Tulos: {tulos}</Text>      
        <TextInput style={styles.inputt}
            onChangeText={ekaNumero => asetaEka(ekaNumero)}
            value={ekaNumero}
            keyboardType="numeric"/>
        
        <TextInput style={styles.inputt}
            onChangeText={tokaNumero => asetaToka(tokaNumero)}
            value={tokaNumero}
            keyboardType="numeric"/>

        <View style={styles.napit}>
            <Button onPress={miinus} title="miinus" />
            <Button onPress= {plus} title="plus" />
            <Button onPress={() => navigation.navigate('historia', {tieto: data})}
                title="historia"/> 
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
      padding: 20,
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