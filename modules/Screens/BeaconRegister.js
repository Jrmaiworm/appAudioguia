// ./modules/Screens/BeaconRegister.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Compass from '../components/compass';

const BeaconRegister = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState('');
  const [id, setId] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [beacons, setBeacons] = useState([]);
  const [norte, setNorte] = useState('');
  const [nordeste, setNordeste] = useState('');
  const [leste, setLeste] = useState('');
  const [sudeste, setSudeste] = useState('');
  const [sul, setSul] = useState('');
  const [sudoeste, setSudoeste] = useState('');
  const [oeste, setOeste] = useState('');
  const [noroeste, setNoroeste] = useState('');



  useEffect(() => {
    fetchBeacons();
  }, []);

  const fetchBeacons = async () => {
    try {
      const response = await axios.get('http://177.70.102.109:3007/biomob-api/beacon/lista');
      setBeacons(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const beaconData = {
        nome,
        descricao,
        foto,
        id,
        lat,
        lng,
        norte,
        nordeste,
        leste,
        sudeste,
        sul,
        sudoeste,
        oeste,
        noroeste,
      };
      await axios.post('http://177.70.102.109:3007/biomob-api/beacon/', beaconData);
      alert('Beacon cadastrado com sucesso!');
      fetchBeacons();
    } catch (error) {
      console.log(error);
      alert('Erro ao cadastrar o beacon. Por favor, tente novamente.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastro de Beacon</Text>
      <Compass />
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNome}
          value={nome}
          placeholder="Nome do beacon"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDescricao}
          value={descricao}
          placeholder="Descrição do beacon"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Foto (URL):</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFoto}
          value={foto}
          placeholder="URL da foto do beacon"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>ID:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setId}
          value={id}
          placeholder="ID do beacon"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Latitude:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLat}
          value={lat}
          keyboardType="numeric"
          placeholder="Latitude"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Longitude:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLng}
          value={lng}
          keyboardType="numeric"
          placeholder="Longitude"
        />
      </View>
      <View style={styles.inputGroup}>
  <Text style={styles.label}>Norte:</Text>
  <TextInput
    style={styles.input}
    onChangeText={setNorte}
    value={norte}
    placeholder="Localização norte"
  />
</View>

<View style={styles.inputGroup}>
  <Text style={styles.label}>Nordeste:</Text>
  <TextInput
    style={styles.input}
    onChangeText={setNordeste}
    value={nordeste}
    placeholder="descrição nordeste"
  />
</View>

<View style={styles.inputGroup}>
  <Text style={styles.label}>Leste:</Text>
  <TextInput
    style={styles.input}
    onChangeText={setLeste}
    value={leste}
    placeholder="descrição leste"
  />
</View>

<View style={styles.inputGroup}>
  <Text style={styles.label}>Sudeste:</Text>
  <TextInput
    style={styles.input}
    onChangeText={setSudeste}
    value={sudeste}
    placeholder="descrição sudeste"
  />
</View>

<View style={styles.inputGroup}>
  <Text style={styles.label}>Sul:</Text>
  <TextInput
    style={styles.input}
    onChangeText={setSul}
    value={sul}
    placeholder="descrição sul"
  />
</View>

<View style={styles.inputGroup}>
  <Text style={styles.label}>Sudoeste:</Text>
  <TextInput
    style={styles.input}
    onChangeText={setSudoeste}
    value={sudoeste}
    placeholder="descrição sudoeste"
  />
</View>

<View style={styles.inputGroup}>
  <Text style={styles.label}>Oeste:</Text>
  <TextInput
    style={styles.input}
    onChangeText={setOeste}
    value={oeste}
    placeholder="descrição oeste"
  />
</View>

<View style={styles.inputGroup}>
  <Text style={styles.label}>Noroeste:</Text>
  <TextInput
    style={styles.input}
    onChangeText={setNoroeste}
    value={noroeste}
    placeholder="descrição noroeste"
  />
</View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar
        </Text>
      </TouchableOpacity>
      <View style={styles.beaconsList}>
        <Text style={styles.listTitle}>Beacons Cadastrados</Text>
        {beacons.map((beacon) => (
          <View key={beacon.id} style={styles.beaconItem}>
            <Image source={{ uri: beacon.foto }} style={styles.beaconImage} />
            <View style={styles.beaconInfo}>
              <Text style={styles.beaconName}>{beacon.nome}</Text>
              <Text>{beacon.descricao}</Text>
              <Text>ID: {beacon.beaconId}</Text>
              <Text>N: {beacon.norte}</Text>
              <Text>S: {beacon.sul}</Text>
              <Text>L: {beacon.leste}</Text>
              <Text>
                Lat: {beacon.lat}, Lng: {beacon.lng}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  button: {
    backgroundColor: '#3b5998',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  beaconsList: {
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  beaconItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  beaconImage: {
    width: 64,
    height: 64,
    marginRight: 8,
    borderRadius: 4,
  },
  beaconInfo: {
    flex: 1,
  },
  beaconName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default BeaconRegister;

