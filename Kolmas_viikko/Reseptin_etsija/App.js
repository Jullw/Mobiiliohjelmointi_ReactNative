import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image} from 'react-native';

export default function App (){

  const [hakusana, setHakusana] = useState('');
  const [reseptit, setReseptit] = useState([]);
 

  const haeReseptit  = () =>{
    const url = "http://www.recipepuppy.com/api/?i=" + hakusana;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {   
        setReseptit(responseJson.results);
      })
      .catch(error => {
        Alert.alert(error);
      });
  };


  listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };


    return (
      <View style={styles.container}>
        <FlatList
          data={reseptit}
          ItemSeparatorComponent={listSeparator}
          style={{ marginLeft: "5%" }} 
          keyExtractor={(item) => item} 
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item.thumbnail }}
                style={{ width: 50, height: 50 }}
              />
              <Text>{item.title}</Text>
            </View>
          )}
        />
        <TextInput
          style={{ fontSize: 18, width: 200 }}
          placeholder="Etsi resepti"
          onChangeText={hakusana => setHakusana(hakusana)}
        />
      <Button title="Etsi" onPress={haeReseptit} />
     </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});