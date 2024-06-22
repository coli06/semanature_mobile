import React, { useEffect, useState, memo } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import styles from './Map.component.style';
import { getParcoursDonne } from './../../../utils/queries';
import NetInfo from "@react-native-community/netinfo";

const MapComponent = memo(() => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null); // State to store user location
  const [parcours, setParcours] = useState([]); // State to store circuits
  const [loading, setLoading] = useState(true); // State to indicate loading
  const [selectedParcours, setSelectedParcours] = useState(null); // State for selected spot

  useEffect(() => {
    let isMounted = true; // Flag to check if component is mounted

    const fetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync(); // Request location permissions
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
        } else {
          const tempLocation = await Location.getCurrentPositionAsync({});
          if (isMounted) {
            setLocation(tempLocation); // Set location state if component is still mounted
          }
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }

      const tempParcours = await getParcoursDonne();
      if (isMounted) {
        setParcours(tempParcours);
      }
    };

    fetchData();

    const locationSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 10000, // Update every 10 seconds
        distanceInterval: 10, // Update every 10 meters
      },
      newLocation => {
        if (newLocation && isMounted) {
          setLocation(newLocation);
        }
      }
    );

    return () => {
      isMounted = false; // Cleanup function to set flag when component unmounts
      locationSubscription.then(sub => sub.remove());
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

  const handleOnMessage = (event) => {
    const tempParcours = event.nativeEvent.data ? JSON.parse(event.nativeEvent.data) : null;
    setSelectedParcours(tempParcours);
  };

  const barycentre = { coords: { latitude: 0, longitude: 0 } };
  if (parcours.length > 0) {
    parcours.forEach(p => {
      barycentre.coords.latitude += p.latitude;
      barycentre.coords.longitude += p.longitude;
    });
    if (location) {
      barycentre.coords.latitude = (barycentre.coords.latitude + location.latitude) / (parcours.length + 1);
      barycentre.coords.longitude = (barycentre.coords.longitude + location.longitude) / (parcours.length + 1);
    } else {
      barycentre.coords.latitude /= parcours.length;
      barycentre.coords.longitude /= parcours.length;
    }
  }

  const mapLocation = location ?? barycentre;

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
            const bounds = [];

            // Default blue marker for current location
            const posMarker = L.icon({
              iconUrl: 'https://cdn1.iconfinder.com/data/icons/navigation-197/64/position_marker_current_navigation_user-256.png',
              iconSize: [100, 100],
              iconAnchor: [50, 100],
              popupAnchor: [0, -100],
              shadowSize: [100, 100]
            });

            if(${location !== null}) {
              const marker = L.marker([${mapLocation.coords.latitude}, ${mapLocation.coords.longitude}], { icon: posMarker })
                .addTo(map)
                .bindPopup('Vous êtes ici');
              bounds.push([${mapLocation.coords.latitude}, ${mapLocation.coords.longitude}]);

              // Add event listener for popup open
              marker.on('popupopen', function () {
                window.ReactNativeWebView.postMessage(JSON.stringify(null));
              });
            }

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
                markerIcon = L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12.5, 20.5], popupAnchor: [0, -41], shadowSize: [41, 41] });
              }

              // Add marker with popup to the map
              const marker = L.marker([spot.latitude, spot.longitude], { icon: markerIcon }).addTo(map)
                .bindPopup(\`
                  <div>
                    <strong>\${spot.titre}</strong><br>
                    \${spot.difficulte}<br>
                    Durée: \${spot.duree}
                  </div>
                \`);

              bounds.push([spot.latitude, spot.longitude]);
              
              // Add event listener for popup open & close
              marker.on('popupopen', function () {
                window.ReactNativeWebView.postMessage(JSON.stringify(spot));
              });
              marker.on('popupclose', function () {
                window.ReactNativeWebView.postMessage(null);
              });
            });

            if (bounds.length > 0) {
              const mapBounds = L.latLngBounds(bounds);
              const southWest = mapBounds.getSouthWest();
              const northEast = mapBounds.getNorthEast();

              const latDiff = northEast.lat - southWest.lat;
              const lngDiff = northEast.lng - southWest.lng;

              const expandedBounds = L.latLngBounds(
                [
                  [southWest.lat - latDiff * 0.25, southWest.lng - lngDiff * 0.25],
                  [northEast.lat + latDiff * 0.25, northEast.lng + lngDiff * 0.25]
                ]
              );

              map.fitBounds(expandedBounds, { padding: [50, 50] });
            }
          });
        </script>
      </body>
    </html> 
  `;

  if (!internetAvailable) {
    return (
      <View style={styles.container}>
        <Text>Internet indisponible</Text>
        <Text>Merci de vérifier que la connexion Internet est disponible</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={styles.activityIndicator.color} />
      </View>
    );
  }

  return (
    <>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.map}
        cacheEnabled={true}
        javaScriptEnabled={true} // Ensure JavaScript execution is enabled
        startInLoadingState={true}
        onMessage={handleOnMessage}
        renderLoading={() => (
          <View style={styles.container}>
            <ActivityIndicator size="large" color={styles.activityIndicator.color} />
          </View>
        )}
      />
      {selectedParcours && (<TouchableOpacity
        onPress={() => {
          navigation.navigate("ParcoursChoicePage", { commune: selectedParcours.commune, mapRequestId: selectedParcours.identifiant });
        }}
        style={styles.bouton}
      >
        <Text style={styles.boutonText}>Choisir ce parcours</Text>
      </TouchableOpacity>)}
    </>
  );
});

export default MapComponent;
