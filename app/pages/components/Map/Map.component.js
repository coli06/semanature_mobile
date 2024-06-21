import React, { useEffect, useState, memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import styles from './Map.component.style';
import { getParcoursDonne } from './../../../utils/queries';
import NetInfo from "@react-native-community/netinfo";

const MapComponent = memo(() => {
  const [location, setLocation] = useState(null); // State to store user location
  const [parcours, setParcours] = useState([]); // State to store circuits

  useEffect(() => {
    let isMounted = true; // Flag to check if component is mounted

    const fetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync(); // Request location permissions
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
        } else {
          const location = await Location.getCurrentPositionAsync({});
          if (isMounted) {
            setLocation(temp); // Set location state if component is still mounted
          }
        }

        const temp = await getParcoursDonne();
        if (isMounted) {
          setParcours(temp);
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

  const [internetAvailable, setInternetAvailable] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setInternetAvailable(state.isInternetReachable);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const barycentre = { coords: { latitude: 0, longitude: 0 } };
  parcours.forEach(p => {
    barycentre.coords.latitude += p.latitude;
    barycentre.coords.longitude += p.longitude;
  });
  const defaultLocation = barycentre;
  const mapLocation = location || defaultLocation;

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
          .leaflet-popup-content-wrapper { font-size: 32px; } /* Adjust popup content font size */
          .leaflet-popup-content { font-size: 32px; } /* Adjust popup content font size */
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <script>
          document.addEventListener('DOMContentLoaded', function () {
            const map = L.map('map').setView([${mapLocation.coords.latitude}, ${mapLocation.coords.longitude}], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

	    // Set map tiles
	    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	      maxZoom: 19,
	    }).addTo(map);
           
        // Default blue marker for current location
        const posMarker = L.icon({
          iconUrl: 'https://cdn1.iconfinder.com/data/icons/navigation-197/64/position_marker_current_navigation_user-256.png',
          iconSize: [100, 100],
          iconAnchor: [50, 100],
          popupAnchor: [0, -100],
          shadowSize: [100, 100]
        });
        L.marker([${mapLocation.coords.latitude}, ${mapLocation.coords.longitude}], { icon: blueMarker }).addTo(map)
          .bindPopup('Vous êtes ici !')
          .openPopup();

            // Add markers for circuits
            const circuits = ${JSON.stringify(parcours)};
            circuits.forEach(spot => {
              let markerIcon;
              if (spot.difficulte === 'Très facile') {
                markerIcon = L.icon({ iconUrl: 'https://cdn-icons-png.freepik.com/256/183/183390.png?ga=GA1.1.1350229908.1718375323&semt=ais_hybrid', iconSize: [100, 100], iconAnchor: [50, 100], popupAnchor: [0, -100], shadowSize: [100, 100] });
              } else if (spot.difficulte === 'Facile') {
                markerIcon = L.icon({ iconUrl: 'https://cdn-icons-png.freepik.com/256/9132/9132016.png?semt=ais_hybrid', iconSize: [100, 100], iconAnchor: [50, 100], popupAnchor: [0, -100], shadowSize: [100, 100] });
              } else if (spot.difficulte === 'Moyen') {
                markerIcon = L.icon({ iconUrl: 'https://cdn-icons-png.freepik.com/256/170/170384.png?semt=ais_hybrid', iconSize: [100, 100], iconAnchor: [50, 100], popupAnchor: [0, -100], shadowSize: [100, 100] });
              } else if (spot.difficulte === 'Difficile') {
                markerIcon = L.icon({ iconUrl: 'https://cdn-icons-png.freepik.com/256/252/252025.png?semt=ais_hybrid', iconSize: [100, 100], iconAnchor: [50, 100], popupAnchor: [0, -100], shadowSize: [100, 100] });
              } else if (spot.difficulte === 'Très difficile') {
                markerIcon = L.icon({ iconUrl: 'https://cdn-icons-png.freepik.com/256/285/285807.png?ga=GA1.1.1350229908.1718375323&semt=ais_hybrid', iconSize: [100, 100], iconAnchor: [50, 100], popupAnchor: [0, -100], shadowSize: [100, 100] });
              } else {
                markerIcon = L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', iconSize: [100, 100], iconAnchor: [50, 100], popupAnchor: [0, -100], shadowSize: [100, 100] });
              }

              // Popup content for each marker
              const popupContent = \`
                <div>
                  <strong>\${spot.titre}</strong><br>
                  \${spot.difficulte}<br>
                  Durée: \${spot.duree}
                </div>
              \`;

              // Add marker with popup to the map
              L.marker([spot.latitude, spot.longitude], { icon: markerIcon }).addTo(map)
                .bindPopup(popupContent);
            });
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
      cacheEnabled={true}
      javaScriptEnabled={true} // Ensure JavaScript execution is enabled
      startInLoadingState={true}
      renderLoading={() => (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={styles.activityIndicator.color} />
        </View>
      )}
    />
  );
});

export default MapComponent;
