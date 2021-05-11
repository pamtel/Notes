import { Note, AbstractNotesStore } from './Notes';

const notes = [];

export class InMemoryNotesStores extends AbstractNotesStore {
    async close() { }

    async update(key, title, body) {
        notes[key] = new Notes(key, title, body);
        return notes[key];
    }

    async create(key, title, body) {
        notes[key] = new Note(key, title, body);
        return notes[key];
    }

    async read(key) {
        if(notes[key]) return notes[key];
        else throw new Error(`Notes ${key} does not exist`);
    }

    async destory(key) {
    if (notes[key]) {
        delete notes[key];
    } else throw new Error(`Notes ${key} does not exist`);
  }

  async keylist() {
      return Object.keys(notes);
  }

  async count() {
      return notes.length;
  }
}

