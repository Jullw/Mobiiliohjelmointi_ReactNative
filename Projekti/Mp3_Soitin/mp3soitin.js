import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Slider, Button } from 'react-native';
import { Audio } from 'expo-av';
import { Icon } from 'react-native-elements';


// Luodaan expo audio kirjaston soundObjectista ilmentymä
const soundObject = new Audio.Sound();

export default function App({ navigation }) {
  // Kappale tiedot olioihin
  const allThat = {
    id: 0,
    nimi: 'All That',
    polku: require('./assets/sounds/bensoundallthat.mp3'),
    kuva: require('./assets/sounds/allthat.jpg')
  }
  const jazzyFrenchy = {
    id: 1,
    nimi: 'Jazzy Frenchy',
    polku: require('./assets/sounds/bensoundjazzyfrenchy.mp3'),
    kuva: require('./assets/sounds/jazzyfrenchy.jpg')
  }
  const thejazzPiano = {
    id: 2,
    nimi: 'The Jazz Piano',
    polku: require('./assets/sounds/bensoundthejazzpiano.mp3'),
    kuva:  require('./assets/sounds/thejazzpiano.jpg')
  }
  // Kappale oliot taulukkoon
  const kappaleLista = [allThat, jazzyFrenchy, thejazzPiano]
  
  // Indeksi tarkailemaan, mikä biisin olio on taulukosta käsittelystä
  const [index, setIndex] = useState(0);


  // Lataa kappale tiedoston, määrätystä kansiosta
  async function vaihda_kappale(){
    try {
      await soundObject.unloadAsync()
      await soundObject.loadAsync(kappaleLista[index].polku)
      await soundObject.playAsync()
    }   catch (error) {
      console.log('Virhe lataa_kappale asyncissa')
    }
  }

  // Muuttaa mp3 tiedoston ääneksi, joka soi sovelluksessa

  async function soita_kappale(){
    try {
      if(soundObject != null){
        await soundObject.playAsync()
      } 
        await soundObject.loadAsync(kappaleLista[index].polku) 
    }   catch (error) {
      console.log('Virhe soita_kappale asyncissa')
    }
  }


  // Pysäyttää kappaleen
  async function pysayta_kappale(){
    try {
      await soundObject.pauseAsync();
    } catch (error) {
      console.log('Virhe pysayta_kappale asyncissa')
    }
  }

  // Säätää soundObjectin volyymia, slider:in avulla  
  async function saadaVolyymi(arvo){
      soundObject.setVolumeAsync(arvo)
  }

  // Vaihtaa indeksia, saadaan eri olio taulukosta käsittelyyn
  const plusIndex = () => {
    console.log(index)
    if(index >= 2){
      setIndex(0)
    }else{
      setIndex(index + 1)
    }
    vaihda_kappale()
    console.log(index)
  }

  // Vaihtaa indeksia, saadaan eri olio taulukosta käsittelyyn
  const miinusIndex = () => {
    console.log(index)
    if(index <= 0){
      setIndex(2)
    }else{
      setIndex(index - 1)
    }
    vaihda_kappale()
    console.log(index)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.otsikko}>{kappaleLista[index].nimi}</Text>
      <Image source={kappaleLista[index].kuva}
      style={{width : 300, height : 200}}
      />
      <View style={styles.napit}>
        <View style={styles.nappi}> 
          <Icon name = 'arrow-back' size={45} onPress={miinusIndex}/> 
        </View> 
        <View style={styles.nappi}> 
          <Icon name = 'play-arrow' size={45} onPress={soita_kappale}/>
        </View>
        <View style={styles.nappi}> 
          <Icon name = 'pause' size={45} onPress={pysayta_kappale}/>
        </View>
        <View style={styles.nappi} > 
          <Icon name = 'arrow-forward' size={45} onPress={plusIndex}/>
        </View> 
      </View>
      <View>
        <Slider style={styles.volyymiSaadin}
                thumbTintColor='black'
                minimumTrackTintColor= 'black'
                value = {1} onValueChange={arvo => saadaVolyymi(arvo)}></Slider>
      </View>
      <View style={styles.pohjaNappi}>
        <Button title='Kanye Westin sanontoihin' onPress={() => navigation.navigate('quotesApi')}> </Button>
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
    backgroundColor: 'lightblue'
  },
  napit: {
    top: 50,
    padding: 3,
    flexDirection:"row",
  },
  nappi: {
    borderColor: 'black',
    padding: 3,
    margin: 2,
    borderRadius: 50,
    borderWidth: 3
  }, 
  volyymiSaadin: {
    top: 60,
    width: 300,
    color: 'black'
  },
  otsikko:{
    fontSize: 50,
    color: 'navy'
  },
  pohjaNappi:{
    top: 120
  }
});