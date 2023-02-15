import http from 'http';

import { routes } from './routes.js';

import { json } from './middleware/json.js';

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
       
  await json(request, response);

  const route = routes.find((route) => route.method === method && route.path.test(url))

  if(route) {
    return route.handler(request, response);
  }

  return response.end('Url not allowed')
})

server.listen(3333);