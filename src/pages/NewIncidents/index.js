import React, {useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncidents(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value,setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncidents(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try{
            const response = await api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                }
            });

            history.push('/profile');
            
        }catch(err){
            alert(`Erro no cadastro tente novamente`);
        }

    }

    return(
        <div className="new-incident">
            
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva um caso detalhadamente para encontrar um herói para resolter isso.</p>

                    <Link className="back-link" to='/profile'>
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para Home
                    </Link>

                </section>
                <form onSubmit={handleNewIncidents}>
                    <input 
                        placeHolder="Título do caso:" 
                        value = {title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea 
                        placeHolder="Descrição:"
                        value = {description}
                        onChange={e => setDescription(e.target.value)}
                    />
  
                    <input 
                        placeHolder="Valor em reais: "
                        value = {value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit"> Cadastrar </button>
                </form>
            </div>
        </div>
    );
}