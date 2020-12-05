import React, { ChangeEvent, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../services/api';


/* import api from '../../../services/api' */

interface ITask {
    title: string;
    description: string;
}

const Tasks = () => {


    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    const [model, setModel] = useState<ITask>({
        title: '',
        description: ''
    });
    useEffect(() => {
        if (id !== undefined) {
            findTask(id)
        }
        //findTask(id);
    }, [id])

    function updatedModel(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        /* console.log(model); */
        if (id !== undefined) {
            /* conexão com o bando de dados */
            const response = await api.put(`/tasks/${id}`, model);
        } else {
            const response = await api.post('/tasks', model);
        }

        back();

    }

    async function findTask(id: string) {
        const response = await api.get(`tasks/${id}`);
        setModel({
            title: response.data.title,
            description: response.data.description
        });
    }


    function back() {
        history.goBack();
    }



    return (
        <div className="container">
            <div className="row mt-5 shadow-sm p-3 mb-5 bg-white rounded">
                <div className="col">
                    <h1 className="text-info">Tarefas</h1>
                </div>
                <div className="col">
                    <button
                        type="button" className="btn btn-primary float-right"
                        onClick={back}
                    >
                        Voltar
                        </button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="cap01">Título</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={model.title}
                                id="cap01"
                                placeholder="Título"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cap02">Descrição</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={model.description}
                                id="cap02"
                                rows={3}
                                placeholder="Descrição"
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updatedModel(e)}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-dark">Salvar</button>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default Tasks;
