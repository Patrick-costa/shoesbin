import { Carrinho } from "./carrinho";

export interface Venda{
    id?: number;
    valor?: number;
    clientId?: number;
    carrinho: Carrinho
}