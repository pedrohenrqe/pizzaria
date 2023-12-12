'use strict'

const botaoVoltar = document.getElementById('voltar')

const voltar = () => {

    window.history.back()

}

botaoVoltar.addEventListener('click', voltar)
