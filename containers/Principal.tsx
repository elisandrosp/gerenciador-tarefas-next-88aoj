import type {NextPage} from 'next';
import { useState } from 'react';
import { Header } from '../components/Header';
import { executeRequest } from '../services/api';

type PrincipalProps = {
    setAccessToken(s:string) : void
}

export const Principal : NextPage<PrincipalProps> = ({setAccessToken}) =>{

    const sair = () =>{
        localStorage.clear();
        setAccessToken('');
    }

    return (
        <>
            <Header sair={sair}/>
        </>
    );
}