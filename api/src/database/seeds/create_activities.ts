import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('activities').insert([
    { title: 'Calistenia', image: 'calistenia.svg' },
    { title: 'Corrida', image: 'corrida.svg' },
    { title: 'Ioga', image: 'yoga.svg' },
    { title: 'Basquete', image: 'basquete.svg' },
    { title: 'Ciclismo', image: 'ciclismo.svg' },
    { title: 'Futebol', image: 'futebol.svg' },
  ]);
}

