import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import api from '../../services/api';

import moment from 'moment';

interface ITask {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}

const Tasks = () => {

    const [tasks, setTasks] = useState<ITask[]>([]);
    const history = useHistory();

    useEffect(() => {
        loadTasks();
    }, [])

    async function loadTasks() {
        const response = await api.get('/tasks');
        console.log(response);
        setTasks(response.data)
    }
    async function finishedTask(id: number) {
        await api.patch(`/tasks/${id}`)
        loadTasks()
    }
    async function deleteTask(id: number) {
        await api.delete(`/tasks/${id}`)
        loadTasks()
    }
    function formateDate(date: Date) {
        return moment(date).format("DD/MM/YYYY");
    }

    function newTask() {
        history.push('/tarefas_cadastro')
    }
    function editTask(id: number) {
        history.push(`/tarefas_cadastro/${id}`);
    }


    function viewTask(id: number) {
        history.push(`/tarefas/${id}`);
    }


    return (
        <>

            <div className="container">
                <div className="row mt-5 shadow-sm p-3 mb-5 bg-white rounded">
                    <div className="col">
                        <h1 className="text-info">Tarefas</h1>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary float-right" onClick={newTask}>
                            Nova Tarefa
                        </button>
                    </div>

                </div>
                <div className="row">
                    <div className=" col mt-3 shadow-sm p-3 mb-5 bg-white rounded">
                        <table className="table table-hover text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Data de Atualização</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tasks.map(task => (
                                        <tr key={task.id}>
                                            <td> {task.id} </td>
                                            <td> {task.title}</td>
                                            <td>
                                                {formateDate(task.updated_at)}
                                            </td>
                                            <td>
                                                <button className="btn">
                                                    <span
                                                        className={task.finished ? "badge badge-success" : "badge badge-warning"}>
                                                        {task.finished ? 'FINALIZADO' : 'PENDENTE'}
                                                    </span>
                                                </button>
                                            </td>
                                            <td colSpan={2}>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => editTask(task.id)}
                                                    disabled={task.finished}
                                                >Editar
                                                </button>{' '}
                                                <button
                                                    className="btn btn-success"
                                                    disabled={task.finished}
                                                    onClick={() => finishedTask(task.id)}
                                                >
                                                    Finalizar
                                                </button>{' '}
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => viewTask(task.id)}
                                                >
                                                    Visualizar
                                                </button>{' '}
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => deleteTask(task.id)}
                                                >
                                                    Remover
                                                </button>{' '}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Tasks;
