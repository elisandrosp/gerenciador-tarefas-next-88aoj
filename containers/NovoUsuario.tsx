/* eslint-disable @next/next/no-img-element */
import type {NextPage} from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { executeRequest } from '../services/api';


type NovoUsuarioProps = {
    setAccessToken(s:string) : void
}

export const NovoUsuario : NextPage<NovoUsuarioProps> = ({setAccessToken}) =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);



    return (
        <div className='container-login'>
            <img src='/logo.svg' alt='Logo Fiap' className='logo'/>
            <div className="form">
                {error && <p>{error}</p>}
                <div>
                    <img src='/mail.svg' alt='Name'/> 
                    <input type="text" placeholder="Name" 
                        value={email} onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <img src='/mail.svg' alt='E-mail'/> 
                    <input type="text" placeholder="Email" 
                        value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <img src='/lock.svg' alt='Senha'/> 
                    <input type="password" placeholder="Senha" 
                        value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type='button'  disabled={loading}>{loading ? '...Carregando' : 'Login'}</button>
               
            </div>
        </div>
    );
}