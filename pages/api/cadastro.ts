import type { NextApiRequest, NextApiResponse } from "next";


type CadastroRequest = {
    email : string,
    password : string

}
const handler= (req: NextApiRequest, res: NextApiResponse) => {

    try{
        
        if(req.method !=='POST'){
            return res.status(405).json({error: 'Método solicidado não existe'});
        }

        const {body} = req;
        const dados = body as CadastroRequest;
        if(!dados.email || dados.password){
            return res.status(400).json({error : ' por favor preeencher os campos'});
        }
        return res.status(200).json({msg: 'Cadastro efetuado com sucesso'});
    }
    catch(e:any){
        console.log('Erro ao efetuar cadastro:', e)
    }
    


}
export default handler;