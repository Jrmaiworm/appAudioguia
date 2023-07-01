import { Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export async function requestBluetoothPermission() {
    try {
      if (Platform.OS === 'android') {
        const granted = await request(Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
        }));
        if (granted === RESULTS.GRANTED) {
          console.log('Bluetooth permission granted');
          // Aqui você pode iniciar a detecção de beacons que requerem o uso do Bluetooth
        } else {
          console.log('Bluetooth permission denied');
        }
      } else if (Platform.OS === 'ios') {
        const granted = await check(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
        if (granted === RESULTS.GRANTED) {
          console.log('Bluetooth permission granted (iOS)');
          // Aqui você pode iniciar a detecção de beacons que requerem o uso do Bluetooth
        } else {
          const requestResult = await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
          if (requestResult === RESULTS.GRANTED) {
            console.log('Bluetooth permission granted (iOS)');
            // Aqui você pode iniciar a detecção de beacons que requerem o uso do Bluetooth
          } else {
            console.log('Bluetooth permission denied (iOS)');
          }
        }
      }
    } catch (err) {
      console.log('Error requesting Bluetooth permission:', err);
    }
  }