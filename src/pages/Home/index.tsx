import React, { useEffect, useState } from 'react';
import { Title, Container, Description, NumberUsers } from './styles';
import { View, ActivityIndicator } from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';


const Home: React.FC = () => {
    const [usuarios, setUsuarios] = useState(0);
    const [nome, setNome] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadStorageData() {
            console.log("response.data")

            const user = await AsyncStorage.getItem('user');
            const response = await api.get('users');
            const usuarios = response.headers["total-usuarios"];
            setNome(user)
            setUsuarios(usuarios)
            setLoading(false);

        }
        loadStorageData();
    }, []);
    return loading ?
        <Container><ActivityIndicator color="#999" size="large" /></Container> :
        <Container>
            <Title >Olá {nome}</Title>
            <Description >Você faz parte de um time de <NumberUsers>{usuarios}</NumberUsers> usúarios</Description>
        </Container>
}

export default Home;