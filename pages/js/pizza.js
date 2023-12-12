'use strict';

import { infoPizza, comentarios } from './funcoes-api.js';

const pizzaID = localStorage.getItem('pizzaID');
const like = document.getElementById('like');

const criarImagem = async () => {
    const pizza = await infoPizza(pizzaID);

    document.getElementById('header').style.backgroundImage = `url(../img${pizza.imagem})`;
    document.title = pizza.nome;

    document.getElementById('pizza-name').textContent = pizza.nome;
    document.getElementById('preco').textContent = pizza.preco;
    document.getElementById('descricao').textContent = pizza.descricao;
};

const darLike = () => {
    const img = like.children[0];
    img.src = img.src.includes('Off') ? '../img/icons/LikeOn.svg' : '../img/icons/LikeOff.svg';
};

const gerarComentarios = (comentario) => {
    const containerComentario = document.createElement('div');
    containerComentario.classList.add('container-comentario');

    const containerSuperior = document.createElement('div');
    containerSuperior.classList.add('container-superior');

    const avaliacao = document.createElement('h3');
    avaliacao.classList.add('avaliacao');
    avaliacao.textContent = comentario.titulo;

    const textoComentario = document.createElement('p');
    textoComentario.classList.add('comentario');
    textoComentario.textContent = comentario.comentario;

    const pessoa = document.createElement('div');
    pessoa.classList.add('pessoa');

    const estrelas = document.createElement('div');
    estrelas.classList.add('estrelas');

    for (let i = 0; i < comentario.estrelas; i++) {
        const estrela = document.createElement('img');
        estrela.src = '../img/icons/Star.svg';
        estrela.alt = 'Estrela';
        estrelas.appendChild(estrela);
    }

    const img = document.createElement('img');
    img.src = `../${comentario.fotoUsuario}`;
    img.alt = `../${comentario.nomeUsuario}`;

    const infoPessoa = document.createElement('div');
    infoPessoa.classList.add('info-pessoa');

    const nomePessoa = document.createElement('h3');
    nomePessoa.classList.add('nome-pessoa');
    nomePessoa.textContent = comentario.nomeUsuario;

    const data = document.createElement('span');
    data.classList.add('data');
    data.textContent = comentario.data;

    infoPessoa.append(nomePessoa, data);
    pessoa.append(img, infoPessoa);
    containerSuperior.append(pessoa, estrelas);
    containerComentario.append(containerSuperior, avaliacao, textoComentario);

    document.getElementById('container-comentarios').appendChild(containerComentario);
};

like.addEventListener('click', darLike);

window.addEventListener('load', async () => {
    await criarImagem();
    const comentariosArray = await comentarios(pizzaID);
    comentariosArray.comentarios.forEach(gerarComentarios);
});
