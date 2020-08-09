import React from 'react'
import { View, ImageBackground, Text } from 'react-native'

import styles from './styles'

import giveClassesBgImage from '../../assets/images/give-classes-background.png'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

function GiveClasses(){
    const {goBack} = useNavigation()

    function handleNavigateBack(){
        goBack()
    }

    return (
    <View style={styles.container}>
        <ImageBackground
            resizeMode='contain'
            source={giveClassesBgImage}
            style={styles.content}
        >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
            Para começar, você precisa se cadastrar como professor na nossa plataforma web
        </Text>
        </ImageBackground>
        {/* ideias: -direcionar para a plataforma web, abrindo uma WebView
                -Fazer o forms no mobile depois */}
        <RectButton style={styles.okButton} onPress={handleNavigateBack}> 
            <Text style={styles.okButtonText}>Ok</Text>
        </RectButton>
    </View>
)}
export default GiveClasses