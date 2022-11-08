
import type {NextPage} from 'next';
import { useState } from 'react';
import { executeRequest } from '../services/api';
import { Modal } from 'react-bootstrap';


type LoginProps = {
    setAccessToken(s:string) : void
}

export const Login : NextPage<LoginProps> = ({setAccessToken}) =>{

    //usado na tela de login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    //usado no modal de cadastro de usuário
    const [showModal, setShowModal] = useState(false);
    const [nameModal, setNameModal] = useState('');
    const [emailModal, setEmailModal] = useState('');
    const [passwordModal, setPasswordModal] = useState('');
    const [errorModal, setErrorModal] = useState('');


    // chama a api para fazer login
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
    //função que abre o modal 
    function openModal(){
        setShowModal(true);
       
    }
    //função que fecha o modal e limpa todos campos do modal
    function closeModal(){
        setShowModal(false);
        setErrorModal("");
        setNameModal("");
        setEmailModal("");
        setPasswordModal("");
    }

    //Salvar novo usuário
    const saveUser = async() => {
        try{
            //validação para verificar se nome. email e senha estejam preeenchidos
            if(!nameModal || !emailModal || !passwordModal){
                return setErrorModal('Favor preencher os campos.');
            }
            //monta o body que será enviado para salvar o usuário
            const body = {
                name : nameModal,
                email: emailModal,
                password : passwordModal
            };
            //chama a api para salvar o novo usuário
            const result = await executeRequest('cadastro', 'POST', body);
             if(result && result.data){
               //se tudo ocorrer certo, fecho o modal de cadastro
                setShowModal(false);

             }
        }catch(e : any){
            console.log('Ocorreu erro ao cadastrar usuário:', e);
            if(e?.response?.data?.error){
                setErrorModal(e?.response?.data?.error);
            }else{
                setErrorModal('Ocorreu erro ao tentar cadastrar um novo usuário, tente novamente.');
            }
        }
       
    }
    return (
        <>
        <div className='container-login'>
            <img src='/logo.svg' alt='Logo Fiap' className='logo'/>
            <div className="form">
                {error && <p className='error'>{error}</p>}
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
                    <p>Não possui conta? </p>
                    <span style={{cursor:"pointer"}} onClick={openModal}>Clique aqui</span>
                    
                </div>
            </div>
        </div>
        <Modal
                show={showModal}
                className="container-modal">
                <Modal.Body>
                <p>Cadastro de usuário</p>
                <div className="form">
                    {errorModal && <p className='error'>{errorModal}</p>}
                    <div>
                        {/* <img src='/user.svg' alt='Nome'/>  */}
                        <input type="text" placeholder="Nome" 
                            value={nameModal} onChange={e => setNameModal(e.target.value)}/>
                    </div>
                    <div>
                        {/* <img src='/mail.svg' alt='E-mail'/>  */}
                        <input type="text" placeholder="E-mail" 
                            value={emailModal} onChange={e => setEmailModal(e.target.value)}/>
                    </div>
                    <div>
                        {/* <img src='/lock.svg' alt='Senha'/>  */}
                        <input type="password" placeholder="Senha" 
                            value={passwordModal} onChange={e => setPasswordModal(e.target.value)}/>
                    </div>
                    <button type='button' onClick={saveUser} > Salvar</button>
                    <span onClick={closeModal}>Cancelar</span>
                </div>
                </Modal.Body>
                <Modal.Footer>
                   
                </Modal.Footer>
            </Modal>
        </>
        
    );


}
