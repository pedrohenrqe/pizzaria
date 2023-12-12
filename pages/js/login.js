'use strict';

const botaoLogin = document.getElementById('botao');
const login = localStorage.getItem('login');

const verificarLogin = async () => {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');

    const email = emailInput.value;
    const senha = senhaInput.value;

    try {
        const usuarios = await listarUsuarios();
        const usuarioEncontrado = usuarios.usuarios.find(user => user.email === email && user.senha === senha);

        if (usuarioEncontrado) {
            localStorage.setItem('usuarioID', usuarioEncontrado.id);
            localStorage.setItem('login', 'true');
            window.location.href = './home.html';
        } else {
            alert('Email e/ou senha incorreto(s)');
        }
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        alert('Erro ao verificar o login. Tente novamente mais tarde.');
    }
};

botaoLogin.addEventListener('click', verificarLogin);

window.addEventListener('load', () => {
    if (login === 'true') {
        window.location.href = './home.html';
    }
});
