//Import openDB method from idb
import { openDB } from 'idb';

const initdb = async () =>
  //Create a new database named jate that will use version 1 of the database
  openDB('jate', 1, {
    //Add database schema if database has not been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //Create a new Object Store for the data with its identifier that will autoincrement
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//Define method to accept content and add it to the database
export const putDb = async (content) => {
  //Create database connection, with the defined version
  const contactDb = await openDB('jate', 1);
  //Create a new transaction, specifying the database and the permissions
  const tx = contactDb.transaction('jate', 'readwrite');
  //Open the desired Object Store
  const store = tx.objectStore('jate');
  //Use the put method to add data to the database
  const request = store.put({value: content});
  //Obtain confirmation
  const result = await request;
  console.log('Data added to database', result);
  return result;
};

//Define method to get the database content
export const getDb = async () => {
  //Create database connection, with the defined version
  const contactDb = await openDB('jate', 1);
  //Create a new transaction, specifying the database and the permissions
  const tx = contactDb.transaction('jate', 'readonly');
  //Open the desired Object Store
  const store = tx.objectStore('jate');
  //Use the getAll method to obtain all data from the database
  const request = store.getAll();
  //Obtain confirmation
  const result = await request;
  console.log('result.value', result);
  return result;

};

initdb();
