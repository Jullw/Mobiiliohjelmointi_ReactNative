import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';



export default function App() {

  const [hakusana, setHakusana] = useState('');
  const [lat, setLat] = useState(60.200692);
  const [lng, setLng] = useState(24.934302);
    
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to access location');
    }else {
      let location = await Location.getCurrentPositionAsync({});
      setLat(location.coords.latitude)
      setLng(location.coords.longitude)
    }
  };




  const haePaikka  = () =>{
    const url = "http://www.mapquestapi.com/geocoding/v1/address?key=msupCExKg4h6tMZJR0gGanFMZdraoJc6&location=" + hakusana;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {   
        setLat(responseJson.results[0].locations[0].latLng.lat)
        setLng(responseJson.results[0].locations[0].latLng.lng)
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  return (
  <View style={styles.container}>
    <MapView style={styles.map}
      Region={{
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
      }}>
      <Marker
        coordinate={{
        latitude: lat,
        longitude: lng}}
        title={hakusana} />
    </MapView>
  <View style={styles.hakuView}>
    <TextInput
      style={styles.tekstiIn}
      placeholderTextColor="black"
      placeholder={"Kirjoita paikka"}
      onChangeText={hakusana => setHakusana(hakusana)}
    />
    <Button
      title="Etsi"
      onPress={haePaikka}
      />
  </View>
  </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hakuView: {
    backgroundColor: 'lightgrey',
    position: 'absolute',
    bottom: 15
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 70
  },
  tekstiIn: {
    borderColor: 'black',
    fontSize: 30,
    width: Dimensions.get('window').width - 20
  },
  nappi: {
    color: 'green'

  }                                              
});
                                      