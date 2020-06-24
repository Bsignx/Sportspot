import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Main,
  Title,
  Description,
  Footer,
  Button,
  ButtonText,
  Input,
} from './styles';

const Home: React.FC = () => {
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const navigation = useNavigation();

  function handleNavigationGroups(): void {
    navigation.navigate('Groups', {
      uf,
      city,
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <Container
        source={require('../../assets/Network.png')}
        imageStyle={{ width: 355, height: 382, opacity: 0.1 }}
      >
        <Main>
          <Image source={require('../../assets/Logo.png')} />
          <View>
            <Title>Seu buscador de turmas fitness</Title>
            <Description>
              Ajudamos pessoas a encontrarem outras pessoas que possuam os
              mesmos objetivos fitness.
            </Description>
          </View>
        </Main>
        <Footer>
          <Input
            placeholder="Digite a UF"
            value={uf}
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
            onChangeText={setUf}
          />
          <Input
            placeholder="Digite a Cidade"
            value={city}
            autoCorrect={false}
            onChangeText={setCity}
          />
        </Footer>

        <Button onPress={handleNavigationGroups}>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Home;
