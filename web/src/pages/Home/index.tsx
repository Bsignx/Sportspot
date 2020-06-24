import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import { Container, Content } from './styles';

import logo from '../../assets/logo.svg';

const Home: React.FC = () => {
  return (
    <Container>
      <Content>
        <header>
          <img src={logo} alt="Sportspot" />
        </header>

        <main>
          <h1>Seu buscador de turmas fitness</h1>
          <p>
            Ajudamos pessoas a encontrarem outras pessoas que possuam os mesmos
            objetivos fitness.
          </p>

          <Link to="/create-class">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre uma turma fitness</strong>
          </Link>
        </main>
      </Content>
    </Container>
  );
};

export default Home;
