'use strict';

const icon = document.getElementById('imagem-usuario');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');
const nomeUsuario = document.getElementById('nome');
const cidade = document.getElementById('cidade');
const localizacao = document.getElementById('localizacao');
const input = document.getElementById('foto-perfil');
const botaoSair = document.getElementById('sair');

import { infoUsuario } from './funcoes-api.js';

const montarPerfil = async () => {
    try {
        const usuarioID = localStorage.getItem('usuarioID');
        const usuario = await infoUsuario(usuarioID);

        icon.style.backgroundImage = `url(..${usuario.foto})`;
        nomeUsuario.textContent = usuario.nome;
        telefone.textContent = usuario.telefone;
        email.textContent = usuario.email;
        cidade.textContent = `${usuario.endereco[0].cidade} - ${usuario.endereco[0].uf}`;
        localizacao.textContent = `${usuario.endereco[0].logradouro}, ${usuario.endereco[0].cidade} - ${usuario.endereco[0].uf}`;
        console.log(usuario);
    } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
        // Adicione um tratamento de erro adequado aqui, como exibir uma mensagem para o usuário.
    }
};

const handleInputChange = () => {
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            icon.style.backgroundImage = `url(${reader.result})`;
        });

        reader.readAsDataURL(file);
    }
};

const handleSairClick = () => {
    window.location.href = './login.html';
    localStorage.clear();
};

input.addEventListener('change', handleInputChange);
botaoSair.addEventListener('click', handleSairClick);

window.addEventListener('load', async () => {
    await montarPerfil();
});
