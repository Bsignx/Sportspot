import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 32px 32px 64px;
`;

export const Main = styled.View`
  flex: 1;
  margin-top: 140px;
`;

export const Title = styled.Text`
  color: #ffffff;
  font-size: 32px;
  font-family: 'Ubuntu_700Bold';
  max-width: 260px;
  margin-top: 64px;
`;

export const Description = styled.Text`
  color: #6c6c6c;
  font-size: 16px;
  margin-top: 16px;
  font-family: 'Saira_400Regular';
  max-width: 260px;
  line-height: 24px;
`;

export const Footer = styled.View``;

export const Input = styled.TextInput`
  height: 60px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 0 24px;
  font-size: 16px;
`;

export const Button = styled(RectButton)`
  background-color: #50d06f;
  height: 60px;
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  flex: 1;
  justify-content: center;
  text-align: center;
  color: #fff;
  font-family: 'Saira_700Bold';
  font-size: 16px;
`;
