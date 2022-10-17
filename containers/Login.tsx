import type {NextPage} from 'next';
import { Component } from 'react';

export const Login : NextPage = () =>{

    return (
        <div className='container-login'>
            <img src='/logo.svg' alt='Logo Fiap' className='logo'/>
            <div className="form">
                <div>
                    <img src='/mail.svg' alt='Login'/> 
                    <input type="text" placeholder="Login" />
                </div>
                <div>
                    <img src='/lock.svg' alt='Senha'/> 
                    <input type="password" placeholder="Senha" />
                </div>
                <button type='button'>Login</button>
            </div>
        </div>
    );
}