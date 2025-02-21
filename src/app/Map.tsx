import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput  } from "react-native";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from 'expo-location';
import MapView,{ Marker }  from 'react-native-maps';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function Map(){
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [Addrees, setAddress] = useState("");

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync()
    
    if(granted) {
        const currentPosition = await getCurrentPositionAsync();
        setLocation(currentPosition);
    }

  }
  
  useEffect(() => {
    requestLocationPermissions()
  }, [])

  return (
    <View style={styles.container}>
        {
            location &&
            <MapView 
                style={styles.map}
                initialRegion={{
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
                }}            
            >
                <Marker 
                    coordinate={{
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude,
                    }}
                />
            </MapView>  
        }
        <View style={styles.boxDestino}>
          <Text style={styles.txtUser}>Olá, Gilson Fábio!</Text> 
          <Text style={styles.txtUser}>Você quer ir para onde?</Text>
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details:any = null) => {
              setAddress(details.description);
                console.log(details.coords);
                console.log("Comming from Address UseState: ", Addrees)
              }}
            query={{
              key: "AIzaSyBuPbfFh0fw8nhJhRGi_WWiR_GyRoM6Xa4",
              language: "en",
            }}
            styles={{
              textInput: isFocused ? styles.textInputFocused : styles.textInput,
              container: styles.inputContainer,
            }}
            textInputProps={{
              onFocus: () => setIsFocused(true),
              onBlur: () => setIsFocused(false),
            }}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },

  map: {
    width: '100%',
    height: '100%',
  },

  boxDestino: {
    position: 'absolute',
    flexDirection: "column",
    width: '100%',
    height: '30%',
    backgroundColor: "#FFF",    
    alignItems: 'center'
  },

  txtUser: {
    fontSize: 14,
    fontWeight: '500',
    color: "#000",    
  },

  destino: {
    width: 300,
      height: 45,
      margin: 12,
      borderWidth: 1,
      borderColor: "#CCC",
      borderRadius: 10,
      padding: 10,
      color: "#FFF",
      fontSize: 14,
  },
  
  googlePlacesText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    height: 50,
    borderRadius: 25,
    paddingLeft: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputContainer: {
    width: "95%",
  },
  textInputFocused: {
    borderWidth: 1,
    borderColor: "darkblue",
    height: 50,
    borderRadius: 25,
    paddingLeft: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});