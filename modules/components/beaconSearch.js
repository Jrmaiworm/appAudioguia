import React, { useEffect } from 'react';
import { BleManager } from 'react-native-ble-plx';
//componente que escaneia beacons
const ScanBeacons = ({ onDeviceFound }) => {
  useEffect(() => {
    const manager = new BleManager();

    const startScan = () => {
      manager.startDeviceScan(null, { allowDuplicates: false }, (error, device) => {
        if (error) {
          console.log('Erro na varredura:', error);
          manager.stopDeviceScan();
          return;
        }

        onDeviceFound(device);
      });
    };

    startScan();

    return () => {
      manager.stopDeviceScan();
    };
  }, [onDeviceFound]);

  return null;
};

export default ScanBeacons;
