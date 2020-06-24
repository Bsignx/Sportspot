import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import api from '../../services/api';

import { Container, ContainerSuccess } from './styles';
import Dropzone from '../../components/Dropzone';

import logo from '../../assets/logo.svg';

interface Activity {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreateClass: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [pageSuccess, setPageSuccess] = useState({
    divHide: 'hide',
    map: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
    whatsapp: '',
    address: '',
  });
  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    api.get('activities').then(response => {
      setActivities(response.data);
    });
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then(response => {
        const ufInicitals = response.data.map(uf => uf.sigla);
        setUfs(ufInicitals);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome);
        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>): void {
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>): void {
    const city = event.target.value;

    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent): void {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleSelectActivity(id: number): void {
    const alreadySelected = selectedActivities.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredActivities = selectedActivities.filter(item => item !== id);

      setSelectedActivities(filteredActivities);
    } else {
      setSelectedActivities([...selectedActivities, id]);
    }
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    const { name, email, whatsapp, description, address } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    // eslint-disable-next-line no-shadow
    const activities = selectedActivities;

    const data = new FormData();

    data.append('name', name);
    data.append('description', description);
    data.append('address', address);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('activities', activities.join(','));

    if (selectedFile) {
      data.append('image', selectedFile);
    }

    setPageSuccess({
      map: 'mapHide',
      divHide: 'divShow',
    });

    await api.post('classes', data);
  }

  return (
    <>
      <Container>
        <header>
          <img src={logo} alt="Sportspot" />

          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <form onSubmit={handleSubmit}>
          <h1>
            Cadastro
            <br />
            turma fitness
          </h1>

          <Dropzone onFileUploaded={setSelectedFile} />

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <div className="field">
              <label htmlFor="name">Nome da turma</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="description">Descrição da turma</label>
              <textarea
                rows={8}
                name="description"
                id="description"
                onChange={handleTextAreaChange}
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>

            <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
              <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> '
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              />
              <Marker position={selectedPosition} />
            </Map>

            <div className="field">
              <label htmlFor="address">Endereço</label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={handleInputChange}
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado (UF)</label>
                <select
                  name="uf"
                  id="uf"
                  value={selectedUf}
                  onChange={handleSelectUf}
                >
                  <option value="0">Selecione um Estado</option>
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="city">Cidade</label>
                <select
                  name="city"
                  id="city"
                  value={selectedCity}
                  onChange={handleSelectCity}
                >
                  <option value="0">Selecione uma Cidade</option>
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Opções de atividades</h2>
              <span>Selecione uma ou mais opções abaixo</span>
            </legend>

            <ul className="items-grid">
              {activities.map(activity => (
                <li
                  key={activity.id}
                  onClick={() => handleSelectActivity(activity.id)}
                  className={
                    selectedActivities.includes(activity.id) ? 'selected' : ''
                  }
                >
                  <img src={activity.image_url} alt={activity.title} />
                  <span>{activity.title}</span>
                </li>
              ))}
            </ul>
          </fieldset>

          <button type="submit">Cadastrar turma fitness</button>
        </form>
      </Container>

      <ContainerSuccess>
        <div id="hide" className={pageSuccess.divHide}>
          <div className="content">
            <FiCheckCircle size={70} />
            <main>
              <h1>Cadastro concluído!</h1>
              <Link to="/">
                <span>
                  <FiArrowLeft />
                </span>
                <strong>Voltar para home</strong>
              </Link>
            </main>
          </div>
        </div>
      </ContainerSuccess>
    </>
  );
};

export default CreateClass;
