import { Database } from "./database/index.js";
import { buildRoutePath } from "./utils/build-route-path.js";
import { randomUUID } from 'node:crypto'

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const queryParams = request.query

      const tasksFiltered = database.select('task', queryParams)

      return response.writeHead(200).end(JSON.stringify(tasksFiltered))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { title, description } = request.body;

      if(!title) {
        return response.writeHead(400).end(
          JSON.stringify({ message: 'title is required' }),
        )
      }

      if(!description) {
        return response.writeHead(400).end(
          JSON.stringify({ message: 'description is required' }),
        )
      }

      const task = {
        title,
        description,
        id: randomUUID(),
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: null
      }

      database.insert('task', task)

      return response.writeHead(201).end(
        JSON.stringify({ message: 'Task created successfully' }),
      )
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      return response.end(JSON.stringify());
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      return response.end(JSON.stringify());
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (request, response) => {
      return response.end(JSON.stringify());
    }
  },
]