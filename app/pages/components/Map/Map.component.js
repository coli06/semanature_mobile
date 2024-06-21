import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import styles from './Map.component.style';
import { getParcoursDonne } from './../../../utils/queries';

const MapComponent = () => {
  const [location, setLocation] = useState(null);
  const [parcours, setParcours] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
        } else {
          const location = await Location.getCurrentPositionAsync({});
          if (isMounted) {
            setLocation(location);
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
      isMounted = false;
    };
  }, []);

  const defaultLocation = { coords: { latitude: 48.8566, longitude: 2.3522 } }; // Default to Paris coordinates
  const mapLocation = location || defaultLocation;

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

            const blueMarker = L.icon({
              iconUrl: 'https://cdn1.iconfinder.com/data/icons/navigation-197/64/position_marker_current_navigation_user-256.png',
              iconSize: [100, 100], // Adjust icon size if necessary
              iconAnchor: [50, 100], // Adjust anchor to the middle bottom
              popupAnchor: [0, -100], // Adjust popup to open above the icon
              shadowSize: [100, 100] // Adjust shadow size if necessary
            });

            // Add user's current location marker
            L.marker([${mapLocation.coords.latitude}, ${mapLocation.coords.longitude}], { icon: blueMarker }).addTo(map)
              .bindPopup('<strong>Vous êtes ici !</strong>').openPopup();

            // Add markers for hiking spots
            const hikingSpots = ${JSON.stringify(parcours)};
            hikingSpots.forEach(spot => {
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
};

export default MapComponent;
