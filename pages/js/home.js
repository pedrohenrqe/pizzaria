'use strict';

import { listarCategorias, listarPizzas, listarPizzasFavoritas, listarBebidas, infoUsuario } from './funcoes-api.js';

const montarUsuario = async () => {
    const usuarioID = localStorage.getItem('usuarioID');
    const usuario = await infoUsuario(usuarioID);

    const foto = document.getElementById('foto-usuario');
    const nome = document.getElementById('nome-usuario');

    foto.src = `../${usuario.foto}`;
    foto.alt = usuario.nome;
    nome.textContent = `Bom dia, ${usuario.nome}`;
};

const criarElemento = (tipo, classes = []) => {
    const elemento = document.createElement(tipo);
    elemento.classList.add(...classes);
    return elemento;
};

const criarCategorias = (categoria) => {
    const li = criarElemento('li');
    const button = criarElemento('button', ['categoria']);
    const img = criarElemento('img');
    img.src = `../img/${categoria.imagem}`;
    img.alt = categoria.nome;

    li.appendChild(button);
    button.appendChild(img);

    const container = document.getElementById('container-categorias');
    container.appendChild(li);
};

const criarProduto = (produto) => {
    const button = criarElemento('button', ['pizza-favorita']);
    const a = criarElemento('a');
    const span = criarElemento('span', ['preco']);
    const pizzaContainer = criarElemento('div', ['produto']);
    const img = criarElemento('img');
    img.src = `../img${produto.imagem}`;
    img.alt = produto.nome;
    const div = criarElemento('div', ['bebida-info']);
    const h3 = criarElemento('h3', ['nome-bebida']);
    h3.textContent = produto.nome;
    const ul = criarElemento('ul', ['descricao-bebida']);

    produto.caracteristicas.forEach((descricao) => {
        const li = criarElemento('li');
        li.textContent = descricao;
        ul.appendChild(li);
    });

    button.appendChild(a);
    a.replaceChildren(pizzaContainer, span);
    pizzaContainer.replaceChildren(img, div);
    div.replaceChildren(h3, ul);

    return button;
};

const criarBebida = (bebida) => {
    const button = criarProduto(bebida);
    button.classList.add('bebida');

    const bebidaContainer = document.getElementById('container-bebidas');
    bebidaContainer.appendChild(button);
};

const selecionarPizza = async () => {
    const botaoPizzas = await document.getElementsByClassName('pizza-favorita');
    for (let pizza of botaoPizzas) {
        pizza.addEventListener('click', () => {
            localStorage.setItem('pizzaID', pizza.id);
        });
    }
};

window.addEventListener('load', async () => {
    await montarUsuario();
    await selecionarPizza();

    const categoriasJSON = await listarCategorias();
    const pizzasFavoritasJSON = await listarPizzasFavoritas();
    const pizzasRecomendadasJSON = await listarPizzas();
    const bebibasCompraJSON = await listarBebidas();

    categoriasJSON.categorias.forEach((categoria) => {
        criarCategorias(categoria);
    });

    pizzasFavoritasJSON.pizzas.forEach((pizza) => {
        criarProduto(pizza);
    });

    pizzasRecomendadasJSON.pizzas.forEach((pizza) => {
        criarProduto(pizza).classList.add('nome-pizza-recomendada');
        const pizzaContainer = document.getElementById('pizzas-recomendadas');
        pizzaContainer.appendChild(criarProduto(pizza));
    });

    bebibasCompraJSON.bebidas.forEach((bebida) => {
        criarBebida(bebida);
    });
});
