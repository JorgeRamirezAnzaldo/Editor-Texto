import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Agregar lógica a un método que acepte algo de contenido y lo agregue a la base de datos
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Agregar lógica para un método que obtiene todo el contenido de la base de datos
export const getDb = async () => console.error('getDb not implemented');

initdb();
