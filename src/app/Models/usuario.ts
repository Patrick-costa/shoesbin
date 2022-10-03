import { Endereco } from "./endereco";

export interface Usuario{
    id?: number;
    nome: string;
    cpf: string;
    perfis?: string[];
    telefone?: string;
    email: string;
    senha: string;
    imagemUrl?: string;
    endereco: Endereco[];
    data?: string;
}
