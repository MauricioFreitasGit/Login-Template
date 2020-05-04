
import styled from 'styled-components/native';
import {Platform} from 'react-native';
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px ${Platform.OS === 'android' ? 80 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 10px 0 24px;
`;

export const Description = styled.Text`
  font-size: 24px;
  text-align:center;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 10px 0 24px;
`;

export const NumberUsers = styled.Text`
font-size: 24px;
color: #2893c1;
font-family: 'RobotoSlab-Medium';
`;