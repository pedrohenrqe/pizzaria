'use strict';

const criarConta = () => {
    const nomeInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmationInput = document.getElementById('password-confirmation');
    const telefoneInput = document.getElementById('telephone');

    const nome = nomeInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirmation = passwordConfirmationInput.value;
    const telefone = telefoneInput.value;

    if (nome && email && password && passwordConfirmation && telefone) {
        if (password === passwordConfirmation) {
            const fotoPerfil = obterFotoPerfil();

            const novoUsuario = {
                nome,
                email,
                senha: password,
                telefone,
                fotoPerfil,
            };

            cadastrarUsuario(novoUsuario);

            // Limpar os campos após criar a conta
            nomeInput.value = '';
            emailInput.value = '';
            telefoneInput.value = '';
            passwordInput.value = '';
            passwordConfirmationInput.value = '';

            alert('Conta criada com sucesso');
        } else {
            alert('As senhas não coincidem. Por favor, informe senhas iguais.');
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
};

const obterFotoPerfil = () => {
    const inputFotoPerfil = document.getElementById('foto-perfil');
    const file = inputFotoPerfil.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', (e) => {
            const imagemUsuario = document.getElementById('imagem-usuario');
            const fotoPerfil = e.target.result;

            // Exibir a imagem de perfil
            imagemUsuario.style.backgroundImage = `url(${fotoPerfil})`;
            // Remover o ícone padrão
            imagemUsuario.removeChild(imagemUsuario.children[0]);
        });

        reader.readAsDataURL(file);
        return true;
    } else {
        return false;
    }
};

const botaoCriarConta = document.getElementById('criar-conta');
const inputFotoPerfil = document.getElementById('foto-perfil');

botaoCriarConta.addEventListener('click', criarConta);
inputFotoPerfil.addEventListener('change', obterFotoPerfil);
