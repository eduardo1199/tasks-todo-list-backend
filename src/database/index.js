import fs from 'node:fs/promises';

const dataBasePath = new URL('./db.json', import.meta.url);

export class Database {
  #database = {}

  constructor() {
    fs.readFile(dataBasePath, 'utf8').then((response) => {
      this.#database = JSON.parse(response)
    })
    .catch((error) => {
      this.#persist()
    })
  }

  #persist() {
    fs.writeFile(dataBasePath, JSON.stringify(this.#database))
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if(search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value?.toLowerCase() ?? '');
        })
      })
    }

    return data
  }

  update(table, id, data) {
    const { title, description } = data;

    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if(rowIndex > -1) {
      const updateNewTask = {
        ...this.#database[table][rowIndex],
        title: title ? title : this.#database[table][rowIndex].title,
        description: description ? description : this.#database[table][rowIndex].description,
        updated_at: new Date()
      }
      
      this.#database[table].splice(rowIndex, 1, updateNewTask);

      this.#persist()
    }
  }
}