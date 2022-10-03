import { Endereco } from "../Models/endereco"
import { Favoritos } from "../Models/favoritos"
import { Location } from "../Models/geolocation"
import { Produto } from "../Models/produto"
import { Usuario } from "../Models/usuario"


export function newProdutos(): Produto[] {
  return [
    {
      titulo: '',
      marca: '',
      tamanho: 0,
      preco: 0.0,
      descricao: '',
      imagem: '../../assets/img/branco.webp',
      status: true,
      quantidade: 10,
      cor: '',
      hex: '',
      categoria: '',
    }
  ]
};

export function newProduto(): Produto {
  return {
    titulo: '',
    marca: '',
    tamanho: 0,
    preco: 0.0,
    descricao: '',
    imagem: '../../assets/img/branco.webp',
    status: true,
    quantidade: 10,
    cor: '',
    hex: '',
    categoria: '',
  }
}

export function newFavorito(): Favoritos {
  return {
    produto: {
      titulo: '',
      marca: '',
      tamanho: 0,
      preco: 0.0,
      descricao: '',
      imagem: '../../assets/img/branco.webp',
      status: true,
      quantidade: 10,
      cor: '',
      hex: '',
      categoria: '',
    },
    id: 0,
    idUsuario: 0,
  }
}

export function newFavoritos(): Favoritos[] {
  return [{
    produto: {
      titulo: '',
      marca: '',
      tamanho: 0,
      preco: 0.0,
      descricao: '',
      imagem: '../../assets/img/branco.webp',
      status: true,
      quantidade: 10,
      cor: '',
      hex: '',
      categoria: '',
    },
    id: 0,
    idUsuario: 0,
  }]
}

export function newUsuario(): Usuario {
  return {
    cpf: '',
    email: '',
    telefone: '',
    endereco: [
      {
        cep: '',
        localidade: '',
        complemento: '',
        uf: '',
        numero: 0,
        logradouro: '',
        bairro: '',
        id: 0
      }
    ],
    id: 0,
    nome: '',
    senha: '',
    perfis: ['']
  }
}

export function newEndereco(): Endereco {
  return {
    cep: '',
    localidade: '',
    complemento: '',
    uf: '',
    numero: 0,
    logradouro: '',
    bairro: '',
    id: 0
  }
}

export function newGeolocation(): Location{
  return {
    administrativeArea: '',
    postalCode: '',
    subAdministrativeArea: '',
    subLocality: '',
    subThoroughfare: '',
    thoroughfare: ''
  }
}