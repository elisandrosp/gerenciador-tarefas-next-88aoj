/* eslint-disable @next/next/no-img-element */
import type {NextPage} from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { executeRequest } from '../services/api';
import { Modal } from 'react-bootstrap';


type LoginProps = {
    setAccessToken(s:string) : void
}

export const Login : NextPage<LoginProps> = ({setAccessToken}) =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [nameModal, setNameModal] = useState('');
    const [emailModal, setEmailModal] = useState('');
    const [passwordModal, setPasswordModal] = useState('');



    const doLogin = async() => {
        try{
            if(!email || !password){
                return setError('Favor preencher os campos.');
            }

            setLoading(true);

            const body = {
                login: email,
                password
            };

            const result = await executeRequest('login', 'POST', body);
            if(result && result.data){
               localStorage.setItem('accessToken', result.data.token);
               localStorage.setItem('name', result.data.name);
               localStorage.setItem('email', result.data.email);
               setAccessToken(result.data.token);
            }
        }catch(e : any){
            console.log('Ocorreu erro ao efetuar login:', e);
            if(e?.response?.data?.error){
                setError(e?.response?.data?.error);
            }else{
                setError('Ocorreu erro ao efetuar login, tente novamente.');
            }
        }

        setLoading(false);

    }
    function abrirModal(){
        setShowModal(true);
    }

    const saveUser = async() => {
        try{
            if(!nameModal || !emailModal || !passwordModal){
                return setError('Favor preencher os campos.');
            }

           //setLoading(true);

            const body = {
                name : nameModal,
                email: emailModal,
                password : passwordModal
            };

            const result = await executeRequest('cadastro', 'POST', body);
             if(result && result.data){
               
                console.log(result)
             }
        }catch(e : any){
            console.log('Ocorreu erro ao cadastrar usuário:', e);
            if(e?.response?.data?.error){
                setError(e?.response?.data?.error);
            }else{
                setError('Ocorreu erro ao tentar cadastrar um novo usuário, tente novamente.');
            }
        }
        setShowModal(false);
    }


    return (
        <>
        <div className='container-login'>
            <img src='/logo.svg' alt='Logo Fiap' className='logo'/>
            <div className="form">
                {error && <p>{error}</p>}
                <div>
                    <img src='/mail.svg' alt='Login'/> 
                    <input type="text" placeholder="Login" 
                        value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <img src='/lock.svg' alt='Senha'/> 
                    <input type="password" placeholder="Senha" 
                        value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type='button' onClick={doLogin} disabled={loading}>{loading ? '...Carregando' : 'Login'}</button>
                <div>
                    <p>Não possui conta?</p>
                    <span onClick={abrirModal}>Cadastrar </span>
                    
                </div>
            </div>
        </div>
        <Modal
                show={showModal}
                className="container-modal">
                <Modal.Body>
                <p>Cadastro de usuário</p>
                <div className="form">
                    {error && <p>{error}</p>}
                    <div>
                        <img src='/mail.svg' alt='Nome'/> 
                        <input type="text" placeholder="Nome" 
                            value={nameModal} onChange={e => setNameModal(e.target.value)}/>
                    </div>
                    <div>
                        <img src='/mail.svg' alt='E-mail'/> 
                        <input type="text" placeholder="E-mail" 
                            value={emailModal} onChange={e => setEmailModal(e.target.value)}/>
                    </div>
                    <div>
                        <img src='/lock.svg' alt='Senha'/> 
                        <input type="password" placeholder="Senha" 
                            value={passwordModal} onChange={e => setPasswordModal(e.target.value)}/>
                    </div>
                    <button type='button' onClick={saveUser} > Salvar</button>
                   
                </div>
                </Modal.Body>
                <Modal.Footer>
                   
                </Modal.Footer>
            </Modal>
        </>
        
    );
}