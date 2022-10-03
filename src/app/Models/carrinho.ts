import { Produto } from "./produto";

export interface Carrinho{
    id?: number;
    clienteId?: number;
    produto?: Produto[];
    status?: boolean;
}