import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Vibration } from 'react-native';


const backgroundImage = require('../../assets/splash.jpg');

const MainScreen = ({ navigation }) => {

  const handleAudioGuidePress = () => {

    Vibration.vibrate(1000);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
      <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => navigation.navigate('BeaconRegister')}>
          <Text style={styles.buttonText}>Adicionar Beacons</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.text}>Audio Guia</Text>
        </TouchableOpacity>

     
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 40
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 150,
    color: '#fff',
    
   
  },
  button: {
    backgroundColor:"#D80A20",
    padding: 42,
    fontSize: 24,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10, // Adicionei um espaçamento entre os botões
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
   
  },
  buttonAdd: {
    color: '#fff',
    fontWeight: 'bold',
  
   alignItems:"center",
   justifyContent:"center",
    borderRadius: 20,
    width:150,
    height:80
   
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
   
  },
});

export default MainScreen;
