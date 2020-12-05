import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../services/api';
import moment from 'moment';
import './index.css';

interface ITask {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}

const Detail = () => {

    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<ITask>();

    useEffect(() => {
        findTask()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    function back() {
        history.goBack()
    }

    async function findTask() {
        const response = await api.get<ITask>(`/tasks/${id}`);
        console.log(response);
        setTask(response.data)

    }
    function formateDate(date: Date | undefined) {
        return moment(date).format("DD/MM/YYYY");
    }

    return (
        <>
            <div className="container">
                <div className="row mt-5 shadow-sm p-3 mb-5 bg-white rounded">
                    <div className="col">
                        <h1 className="text-info">Detalhes da Tarefas</h1>
                    </div>
                    <div className="col">
                        <button
                            type="button"
                            className="btn btn-primary float-right"
                            onClick={back}
                        >
                            Voltar
                        </button>
                    </div>

                </div>
                <div className="row">
                    <div className="col">
                        <div className="card cardcolor" style={{ width: "70rem" }} key={task?.id}>
                            <div className="card-body">
                                <h5 className="card-title">
                                    {task?.title}
                                </h5>
                                <p className="card-text">
                                    {task?.description}
                                </p>
                                <ul className="list-group list-group-horizontal shadow p-3 mb-5 bg-white rounded">
                                    <li className="list-group-item">
                                        <span className="text-info">
                                            Status:{' '}
                                        </span>
                                        <span
                                            className={task?.finished ? "badge badge-success" : "badge badge-warning"}>
                                            {task?.finished ? 'FINALIZADO' : 'PENDENTE'}
                                        </span>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="text-info">
                                            Criado em:{' '}
                                        </span>
                                        <span className="badge badge-primary badge-pill">
                                            {formateDate(task?.created_at)}
                                        </span>

                                    </li>
                                    <li className="list-group-item">
                                        <span className="text-info">
                                            Atualizado em:{' '}
                                        </span>
                                        <span className="badge badge-primary badge-pill">
                                            {formateDate(task?.updated_at)}
                                        </span>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Detail;
