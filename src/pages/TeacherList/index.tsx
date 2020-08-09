import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

function TeacherList(){
    const [isFiltersVisibile, setIsFiltersVisible] = useState(false)

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    const [favorites, setFavorites] = useState<number[]>([])

    const [teachers, setTeachers] = useState([])

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })
                setFavorites(favoritedTeachersIds) 
            }
        })
    }

    function handleToggleIsFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisibile)
    }

    async function handleFiltersSubmit(){
        loadFavorites()
        const subjectWithOutSpaces = subject.trim()
        const response = await api.get('classes', {
            params: {
                subject: subjectWithOutSpaces,
                week_day,
                time,
            }
        })
        setIsFiltersVisible(false)
        setTeachers(response.data)
    }
    
      useFocusEffect(
        React.useCallback(() => {
          setTeachers([])
        }, [])
      )

    return (

        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
            <PageHeader 
                title='Proffys disponíveis'
                headerRight={(
                    <BorderlessButton onPress={handleToggleIsFiltersVisible}>
                        <Feather name='filter' size={25} color='#fff'/>
                    </BorderlessButton>
                )}
            >
            {isFiltersVisibile && 
                <View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput
                        style={styles.input}
                        value={subject}
                        onChangeText={text => setSubject(text)}
                        placeholder='Qual a matéria'
                        placeholderTextColor='#c1bccc'
                    />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput
                                style={styles.input}
                                value={week_day}
                                onChangeText={text => setWeekDay(text)}
                                placeholder='De que dia?'
                                placeholderTextColor='#c1bccc'
                            />                        
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder='Que horas?'
                                    placeholderTextColor='#c1bcc9'
                            /> 
                        </View>
                    </View>
                    <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>
            }
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom:16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
            </ScrollView>
            
        </KeyboardAvoidingView>
        
    )
}

export default TeacherList