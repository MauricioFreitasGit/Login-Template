import React, { useRef,useCallback} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidationErrors';

import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import api from '../../services/api';

interface SignUpFormData{
  nome:string;
  email:string;
  senha:string;
}
export default function SignUp() {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          senha: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        navigation.goBack();

        Alert.alert(
          'Conta criada com sucesso!',
          'Você já pode fazer login na sua conta!',
        );

      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        if (error.status) {
          Alert.alert(error.message);
        }
        Alert.alert(
          'Erro no cadastro',
          JSON.stringify(error),
        );
      }
    },
    [navigation],
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
            <Image source={logoImg} style={{ width: 250, height: 250 }} />
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="nome"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={()=>{
                  emailInputRef.current?.focus();
                }}
              />
              <Input
              ref={emailInputRef}
                returnKeyType="next"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                onSubmitEditing={()=>{
                  passwordInputRef.current?.focus();
                }}

              />
              <Input
              ref={passwordInputRef}
                textContentType="newPassword"
                secureTextEntry
                name="senha"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={()=>formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#FFF" />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
}
