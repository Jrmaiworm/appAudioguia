
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image  } from 'react-native';
import CompassHeading from 'react-native-compass-heading';

//conponente compasso
const Compass = (props) => {
  const [heading, setHeading] = useState(null);
  const [location, setLocation] = useState('');
  const [beacons, setBeacons] =useState([]);
  
 
const beacon = props.matchedBeaconId;
 
  useEffect(() => {
    CompassHeading.start(1, (degree) => {
      setHeading(degree);
      setLocation(getLocationFromHeading(degree));
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

// console.log("bea", beacon)


 //seta label de acordo com posicao do compasso e variavel vindo beacon localizado
  const getLocationFromHeading = (heading) => {
    const directions = [
        { label: beacon?.norte || "N", start: 0, end: 22.5 },
        { label: beacon?.nordeste || "NE", start: 22.5, end: 67.5 },
        { label: beacon?.leste || "L", start: 67.5, end: 112.5 },
        { label: beacon?.sudeste || "SE", start: 112.5, end: 157.5 },
        { label: beacon?.sul ||"S", start: 157.5, end: 202.5 },
        { label: beacon?.sudoeste ||"SO", start: 202.5, end: 247.5 },
        { label: beacon?.oeste  || "O", start: 247.5, end: 292.5 },
        { label: beacon?.noroeste || "NO", start: 292.5, end: 337.5 },
        { label: beacon?.norte || "N", start: 337.5, end: 360 },
    ];

    const roundedHeading = Math.round(heading.heading);

    for (const direction of directions) {
      if (roundedHeading >= direction.start && roundedHeading < direction.end) {
        return { label: direction.label };
      }
    }

    return { label: '-'};
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
      <Image  source={require('../../assets/seta-para-cima.png')} style={styles.arrowImage} />
        <Text style={styles.headingText}>{!heading ? '-' : `${Math.round(heading.heading)}°`}</Text>
        <Text style={styles.locationText}>{location.label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A3B87',
  },
  box: {
    backgroundColor: '#0A3B87',
    padding: 60,
    borderRadius: 10,
    alignItems: 'center',
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color:"#f0f0f0"
  },
  locationText: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    color:"#f0f0f0"
  },
  arrowImage:{
    width:50,
    height:50
  }
});

export default Compass;
