// Importar métodos para guardar y obtener datos de la base de datos indexedDB en './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // verificar si CodeMirror está cargado
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // Cuando el editor esté listo, establecer el valor en lo que se almacene en indexeddb.
    // Volver a localStorage si no hay nada almacenado en indexeddb y si ninguno está disponible, establecer el valor como el encabezado.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Guardar el contenido del editor cuando el editor en sí pierda el enfoque
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}
