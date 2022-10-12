import md5 from 'md5';
import type {NextApiRequest, NextApiResponse} from 'next';
import { connectDB } from '../../middlewares/connectDB';
import { UserModel } from '../../models/UserModel';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';

type LoginRequest = {
    login: string,
    password: string
}

const handler = async (req : NextApiRequest, res: NextApiResponse<DefaultResponseMsg | any>) =>{
    try{
        if(req.method !== 'POST'){
            return res.status(405).json({error: 'Metodo solicitado não existe'});
        }

        const {body} = req;
        const dados = body as LoginRequest;

        if(!dados.login || !dados.password){
            return res.status(400).json({error: 'Favor preencher os campos'});
        }

        const existsUsers = await UserModel.find({email: dados.login, password: md5(dados.password)});
        if(existsUsers && existsUsers.length > 0){
            return res.status(200).json(existsUsers);
        }
        return res.status(400).json({error : 'Login e senha não conferem'});
    }catch(e : any){
        console.log('Erro ao efetuar cadastro:', e);
        return res.status(500).json({error: 'Ocorreu erro ao cadastrar, tente novamente!'});
    }
}
