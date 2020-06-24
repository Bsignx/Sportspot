import React, { useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import api from '../../services/api';

import {
  Container,
  Address,
  AddressContent,
  AddressTitle,
  ClassActivities,
  Button,
  ButtonText,
  ClassImage,
  ClassName,
  Footer,
} from './styles';

interface Params {
  class_id: number;
}

interface Data {
  class: {
    image: string;
    image_url: string;
    name: string;
    description: string;
    address: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  activities: {
    title: string;
  }[];
}

const Detail: React.FC = () => {
  const [data, setData] = useState<Data>({} as Data);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`classes/${routeParams.class_id}`).then(response => {
      setData(response.data);
    });
  }, [routeParams.class_id]);

  function handleNavigationBack(): void {
    navigation.goBack();
  }

  function handleWhatsapp(): void {
    Linking.openURL(
      `whatsapp://send?phone=${data.class.whatsapp}&text= Tenho interesse em fazer parte da turma ${data.class.title}`,
    );
  }

  function handleComposeMail(): void {
    MailComposer.composeAsync({
      subject: `Interesse em fazer parte da turma ${data.class.name}`,
      recipients: [data.class.email],
    });
  }

  if (!data.class) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TouchableOpacity onPress={handleNavigationBack}>
          <Icon name="arrow-left" size={24} color="#50d06f" />
        </TouchableOpacity>

        <ClassImage source={{ uri: data.class.image_url }} />

        <ClassName>{data.class.name}</ClassName>
        <ClassActivities>
          {data.activities.map(activity => activity.title).join(', ')}
        </ClassActivities>

        <Address>
          <AddressTitle>Descrição</AddressTitle>
          <AddressContent>{data.class.description}</AddressContent>
        </Address>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>
            {`${data.class.address}
${data.class.city}, ${data.class.uf}
            `}
          </AddressContent>
        </Address>
      </Container>

      <Footer>
        <Button onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <ButtonText>Whatsapp</ButtonText>
        </Button>
        <Button onPress={handleComposeMail}>
          <Icon name="mail" size={20} color="#fff" />
          <ButtonText>E-mail</ButtonText>
        </Button>
      </Footer>
    </SafeAreaView>
  );
};

export default Detail;
