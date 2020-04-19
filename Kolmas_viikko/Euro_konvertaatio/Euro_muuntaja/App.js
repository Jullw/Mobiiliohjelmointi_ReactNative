import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, Picker } from 'react-native';

export default function App() {
  const [rate, setRate] = useState([]);
  const [euro, setEuro] = useState();
  const [tulos, setTulos] = useState(0);
  const [valuutta, setValuutta] = useState([]);

  const [arvonPitaja, setArvonPitaja] = useState('CSS');
  const [arvonPaikka, setArvonPaikka] = useState();

  let i = 0;

  const haeTiedot = async () => {
    const url = 'http://data.fixer.io/api/latest?access_key=d30627ad6634a7b1eb51323be88a37eb&format=1';
    
    console.log(url)
    try{
      const response = await fetch(url);
      const data = await response.json();
      setRate(data.rates);
      setValuutta(Object.keys(data.rates));

      console.log(rate)
      console.log(valuutta)

    } catch(error){
        Alert.alert(error, 'Error')
    }
  }

  if(i == 0){
      haeTiedot()
      i++;
  }
  

  const muunna = () =>{
      let raa = rate[arvonPaikka]
      let eura = euro
      let muunnettuTulos = eura / raa
      setTulos(muunnettuTulos)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.fontti}> Euromuuntaja </Text>
      <Text> {tulos} </Text>

      <View style={styles.vierekkain}>
      <TextInput 
        style={{fontSize: 18, width: 100}} 
        value={euro} 
        placeholder="Anna eurot"
        onChangeText={(euro) => setEuro(euro)}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={arvonPitaja}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {setArvonPitaja(itemValue), setArvonPaikka(itemIndex)}}
      >
        {valuutta.map((item, index) =>{
            return (<Picker.Item label={item} value={index}/>)
        })}
      </Picker>

      </View>
     <Button title="Muunna" onPress={muunna} />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
 },
 fontti: {
  color:'green',
  fontSize: 30,
},
vierekkain: {
  flexDirection:"row",
  padding: 110
},
});


