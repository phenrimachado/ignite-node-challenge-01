import { randomUUID } from 'node:crypto';
import { Database } from "./database.js";
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database;

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { search } = request.query;

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search
      } : null);

      return response.end(JSON.stringify(tasks));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const actualDate = new Date();

      const { title, description } = request.body;

      if (!title || !description) {
        return response.writeHead(400).end();
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: actualDate,
        updated_at: actualDate
      }

      database.insert('tasks', task);

      return response.writeHead(201).end();
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      try {
        const { id } = request.params;

        const actualDate = new Date();

        const { title, description } = request.body;

        if (!title || !description) {
          return response.writeHead(400).end();
        }

        database.update('tasks', id, {
          title,
          description,
          updated_at: actualDate
        });

        return response.writeHead(204).end();
      } catch (error) {
        return response.writeHead(404).end(JSON.stringify({
          error: error.message,
        }));
      }
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      try {
        const { id } = request.params;

        database.delete('tasks', id);

        return response.writeHead(204).end();
      } catch (error) {
        return response.writeHead(404).end(JSON.stringify({
          error: error.message,
        }));
      }
    }
  },
];