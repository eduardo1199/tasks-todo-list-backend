import fs from 'node:fs';
import { parse } from 'csv-parse';

const csvPath = new URL('./file.csv', import.meta.url) //import URL file

const stream = fs.createReadStream(csvPath) //created stream read

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
}) //parse file

async function run() {
   // Initialise the parser by generating random records
  const lineParse = stream.pipe(csvParse)

  for await (const line of lineParse) {
    const [title, description] = line;

    await fetch('http://localhost:3333/tasks', {
      body: JSON.stringify({
        title,
        description
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST'
    })
  }
}

run()

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
