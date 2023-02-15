import { buildRoutePath } from "./utils/build-route-path.js";

const tasks = [];

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      return response.end(JSON.stringify(tasks));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      return response.end(JSON.stringify(tasks));
    }
  },
]