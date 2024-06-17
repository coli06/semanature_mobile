import React, { useEffect, useState, memo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import styles from './Map.component.style';
import { getParcoursDonne } from './../../../utils/queries'; // Ensure the path is correct

const MapComponent = memo(() => {
  const [location, setLocation] = useState(null); // State to store user location
  const [parcours, setParcours] = useState([]); // State to store hiking spots

  useEffect(() => {
    let isMounted = true; // Flag to check if component is mounted

    const fetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync(); // Request location permissions
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({}); // Get current location
        if (isMounted) {
          setLocation(location); // Set location state if component is still mounted
        }

        const temp = await getParcoursDonne(); // Fetch circuits from Firebase
        if (isMounted) {
          setParcours(temp); // Set circuits state if component is still mounted
          console.log('Fetched circuits :', parcours);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to set flag when component unmounts
    };
  }, []);

  // If location is not yet available, show a loading indicator
  if (!location) {
    return (
      <View style={styles.container}>
          <Text>Position inaccessible</Text>
          <Text>merci de vérifier que la position et Internet sont activés</Text>
      </View>
    );
  }

  // HTML content for the WebView, including Leaflet map setup
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Leaflet Map</title>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <style>
        #map { height: 100vh; width: 100%; margin: 0; padding: 0; }
        body { margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <script>
        // Initialize Leaflet map
        const map = L.map('map').setView([${location.coords.latitude}, ${location.coords.longitude}], 13);

        // Set map tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);

        // Add marker for current location
        L.marker([${location.coords.latitude}, ${location.coords.longitude}]).addTo(map)
          .bindPopup('Votre position')
          .openPopup();

        // Add markers for circuits
        const circuits = ${JSON.stringify(parcours)};
        circuits.forEach(circuit => {
          L.marker([circuit.latitude, circuit.longitude]).addTo(map)
            .bindPopup(circuit.titre + '<br>' + circuit.difficulte + '<br>' + circuit.duree);
        });
      </script>
    </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      style={styles.map}
      cacheEnabled={true} // Enable caching to improve performance
      startInLoadingState={true} // Show loading indicator while loading
      renderLoading={() => (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={styles.activityIndicator.color} />
        </View>
      )}
    />
  );
});

export default MapComponent;
