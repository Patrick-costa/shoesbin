import { Produto } from "./produto";

export interface Favoritos{
    id?: number;
    produto: Produto;
    idUsuario?: number;
}