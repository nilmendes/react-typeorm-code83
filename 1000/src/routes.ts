import { Router, Request, Response } from 'express';
import { fineshedTask, getTask, getTasks, removeTask, saveTask, updateTask } from './controller/TasksController';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Olá typeorm + REACT' })
});

routes.get('/tasks', getTasks);
routes.get('/tasks/:id', getTask);
routes.post('/tasks', saveTask);
routes.put('/tasks/:id', updateTask);
routes.patch('/tasks/:id', fineshedTask);
routes.delete('/tasks/:id', removeTask);

export default routes;
