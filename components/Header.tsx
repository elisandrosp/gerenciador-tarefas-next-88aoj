import type {NextPage} from 'next';

type HeaderProps = {
    sair(): void
}

export const Header : NextPage<HeaderProps> = ({sair}) =>{

    const fullName = localStorage.getItem('name');
    const firstName = fullName?.split(' ')[0] || '';

    return (
        <div className='container-header'>
            <img src='/logo.svg' alt='Logo Fiap' className='logo'/>
            <button><span>+</span> Adicionar tarefa</button>
            <div className='mobile'>
                <span>Olá, {firstName}</span>
                <img src='/exit-mobile.svg' alt="Sair" onClick={sair}/>
            </div>
            <div className='desktop'>
                <span>Olá, {firstName}</span>
                <img src='/exit-desktop.svg' alt="Sair" onClick={sair}/>
            </div>
        </div>
    );
}