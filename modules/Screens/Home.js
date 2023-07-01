import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  ScrollView
 
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import ScanBeacons from '../components/beaconSearch';
import {styles} from './styles/styles';
import LocationTracker from '../components/locationTracker';
import {requestLocationPermission} from '../components/requestLocationPermission ';
import Compass from '../components/compass';
import axios from 'axios';


const Home = ({navigation}) => {
  const [message, setMessage] = useState('Scanear de Beacons');
  const [devices, setDevices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [beaconBd, setBeaconsBd] = useState();
  const [isScanning, setIsScanning] = useState(false);
  const [location, setLocation] = useState({lat: null, lng: null});
  const [matchBeacon, setMatchBeacon] = useState(false);
  const [distances, setDistances] = useState({});
  const [matchedBeaconId, setMatchedBeaconId] = useState(null);

//verifica beacons cadastrados no banco de dados
  const beaconsCadastrados = useMemo(
    () => beaconBd?.data?.map(item => item.id),
    [beaconBd],
  );
 //verifica beacons scaneados 
  const beaconsLocalizados = useMemo(
    () => devices?.map(item => item.id),
    [devices],
  );



  const handleScanToggle = () => {
    setMessage(' Buscando beacons...');
    setIsScanning(true);

  };

  const handleLocationUpdate = newLocation => {
    setLocation(newLocation);
  };

  //abre fecha modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    if (modalVisible) {
      setIsScanning(false);
      
    }
  };
//chamada da api lista beacons cadastrados
  const verifyBeacons = async () => {
    const response = await axios.get('http://177.70.102.109:3007/biomob-api/beacon/lista');
    setBeaconsBd(response);
    console.log("bd", response.data)
  };

  //filtra beacons
  const checkBeaconMatch = () => {
    if (beaconBd && devices) {
      const detectedBeacons = devices.map(device => device.id);
      const matchedBeacons = beaconBd.data.filter(beacon =>
        detectedBeacons.includes(beacon.beaconId),
      );

      matchedBeacons.forEach(beacon => {
        const device = devices.find(device => device.id === beacon.beaconId);
        const distance = calculateDistance(device.rssi, -61);

        if (distance >= 0 && distance < 2) {
          // Emitir o alerta com o ID do beacon
          // Alert.alert('Alerta', `Beacon cadastrado ${beacon.beaconId} foi localizado a menos de 2 metros!`);

          // Armazenar o ID do beacon na variável de estado
          setMatchedBeaconId(beacon);
        }
      });
    }
  };
  
  //calcula distacia
  const calculateDistance = (rssi, txPower) => {
    if (rssi == 0) {
      return -1; // Valor inválido
    }

    const ratio = (rssi * 1.0) / txPower;
    if (ratio < 1.0) {
      return Math.pow(ratio, 10);
    } else {
      const distance = 0.89976 * Math.pow(ratio, 7.7095) + 0.111;
      return distance;
    }
  };

  useEffect(() => {
    verifyBeacons();
    requestLocationPermission(setLocation);
    checkBeaconMatch(); // chamando a função no useEffect
  }, [devices]); // observando a alteração do estado devices

  useEffect(() => {
    verifyBeacons();

    requestLocationPermission(setLocation);
  }, []);
  // console.log("devs", devices)

  const handleDeviceFound = device => {
    setDevices(prevDevices => {
      const newDevices = [...prevDevices];
      const index = newDevices.findIndex(d => d.id === device.id);
      if (index >= 0) {
        // Atualizar o dispositivo existente com o novo sinal de RSSI
        newDevices[index] = {
          ...newDevices[index],
          rssi: device.rssi,
        };
      } else {
        // Adicionar um novo dispositivo
        newDevices.push(device);
      }
      // Calcular a distância para cada dispositivo e atualizar o estado distances
      const newDistances = {...distances};
      newDevices.forEach(d => {
        const distance = calculateDistance(d.rssi, -61);
        newDistances[d.id] = distance >= 0 ? distance.toFixed(2) + ' m' : 'N/A';
      });
      setDistances(newDistances);

      return newDevices;
    });
  };


  return (
    <ScrollView style={{backgroundColor:"#0A3B87"}}>
      <View>
        <View
          style={{
            backgroundColor: '#0A3B87',
            padding: 12,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <LocationTracker />
          
        </View>

        {isScanning && <ScanBeacons onDeviceFound={handleDeviceFound} />}
        <View style={{flex: 2}}></View>
      </View>
      <Compass matchedBeaconId={matchedBeaconId} />
      <View
          style={{
            backgroundColor: '#0A3B87',
            padding: 12,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
         <TouchableOpacity
         accessibilityLabel="escaneia Beacons"
         accessibilityRole="button"
            style={{backgroundColor: '#D80A20', padding: 32, borderRadius: 4}}
            onPress={() => {
              handleScanToggle();
              toggleModal();
            }}>
            <Text style={styles.searchButtonText}>
              {isScanning ? 'Parar' : 'Scanear'}
            </Text>
            
          </TouchableOpacity>
          
        </View>
     
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          toggleModal();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Beacons Encontrados:</Text>
            <FlatList
              data={devices}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={{backgroundColor: '#f0f0f0', margin: 5}}>
                  <Text>
                    {item?.id} - {item?.name}
                  </Text>
                
                  <Text>sinal: {item?.rssi}</Text>
                  <Text>distância: {distances[item.id]}</Text>
                
                 
                </View>
              )}
            />

            <TouchableOpacity
               accessibilityLabel="parar de scanear beacons"
               accessibilityRole="button"
              style={{...styles.button, backgroundColor: '#2196F3'}}
              onPress={toggleModal}>
           
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView >
  );
};

export default Home;
