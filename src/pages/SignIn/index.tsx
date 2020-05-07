import React, { useCallback, useRef, useState ,useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Image,
  TextInput,
  Alert
} from 'react-native';
import logoImg from '../../assets/logo.png';
import * as Yup from 'yup';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';


import getValidationErrors from '../../utils/getValidationErrors';
import { AuthProvider } from '../../hooks/auth';

import Button from '../../components/Button';
import Input from '../../components/Input';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButtonText,
  CreateAccountButton,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles, useField } from '@unform/core';
export default function SignIn() {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);
  interface SignInFormData {
    email: string;
    senha: string;
  }

  useEffect(() => {
    async function loadStorageData(){
      const user = await AsyncStorage.getItem('user');

    }

    loadStorageData();
  }, []);
    
  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          senha: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('session',data);
        await AsyncStorage.setItem('user',response.data.nome)
        navigation.navigate('home')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
console.log(error)
        Alert.alert(
          'Erro na autenticação',
          JSON.stringify(error)
        );
      }
    },
    [],
  );

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}>
          <Container>
            <Image
              source={logoImg}
              style={{ width: 250, height: 250, marginBottom: 40 }}
            />

            {/*          <View>
              <Title>Faça seu logon</Title>
            </View> */}
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordRef.current?.focus()
                }}
              />
              <Input
                ref={passwordRef}
                secureTextEntry
                name="senha"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm()
                }}
              >
                Entrar
                </Button>
            </Form>
            <ForgotPassword onPress={() => { }}>
              <ForgotPasswordText>Esqueci Minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#2893c1" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
}
