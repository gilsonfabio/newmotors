import React, { useEffect, useState} from "react";
import { Text, View, StyleSheet, Pressable, ImageBackground, Image } from "react-native";
import { Link } from "expo-router";
import usePushNotifications from './components/usePushNotifications';

export default function Index() {

    const expoPushToken = usePushNotifications();

    return (
        <View style={styles.container}>
            <ImageBackground source={require('@/assets/images/imgbackground.jpg')} alt="" resizeMode="cover" style={styles.image}>
                <View>
                    <Image source={require('@/assets/images/logomarca_rodape.png')} alt="" resizeMode="cover" style={styles.imgLogo} />
                </View>
                
                <Link href={{pathname: "/"}} asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.txtButton}>Entrar</Text>
                    </Pressable>
                </Link>
                <View>
                    <Text>Expo Push Token:</Text>
                    <Text>{expoPushToken}</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },

    imgLogo: {
        width: 300,
        height: 100,
        marginTop: 20,
        marginBottom: 200,
        alignItems: 'center'      
    }, 

    image: {
        flex: 1,
        alignItems: 'center',
    },

    boxTitle: {
        marginTop: 60,
        marginBottom: 80,
    },

    txtTitle: {
        fontSize: 35,
        color: "#FFF",
        textAlign: 'center',
    },

    button: {
        width: 250,
        height: 60,
        backgroundColor: "#facc15",
        borderRadius: 12,
        justifyContent: 'center',
    },

    txtButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000",
        textAlign: 'center',
    },

})