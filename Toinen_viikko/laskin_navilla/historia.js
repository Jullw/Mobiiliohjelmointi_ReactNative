import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';


export default function historia({ route, navigation}) {
    const { tieto } = route.params;
    return (
    <View style={styles.container}>
        <Text style={styles.fontti} >Historia:</Text>
            <FlatList
                data={tieto}
                renderItem={({item}) =>( <Text>{item.key}</Text>)}
            />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    fontti: {
      color:'black',
      fontSize: 30,
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