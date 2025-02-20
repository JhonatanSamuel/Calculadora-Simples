//seleção dos elementos
const botaoIgual = document.querySelector('.igual');
const botaoPonto = document.querySelector('.ponto');
const display = document.querySelector('#displayInput');
const botoesNumeros = document.querySelectorAll('.num');
const botoesOperadores = document.querySelectorAll('.operador');
const botaoReset = document.querySelector('.reset');

// Variáveis Globais
let operador = null;  // Os operadores +, -, *, /
let valorAnterior = '';  // O valor que foi calculado antes
let valorAtual = '';  // A operação que está sendo realizada
let calculando = false;  // Para saber se está sendo calculado alguma operação

function atualizaDisplay(evento) {
    display.value = valorAtual;
} 

function inserirNumero(evento) {
    if (calculando) {
        valorAtual = evento.target.textContent;  // Se estiver calculando, o valor atual recebe o número clicado
        calculando = false; 
    }else {
        valorAtual += evento.target.textContent;  
    }

    atualizaDisplay();
} 

function inserirPonto() {
    if(valorAtual.indexOf('.') === -1) {  // Verifica se já tem um ponto
        valorAtual += '.';  // Se não tiver, insere o ponto
        atualizaDisplay();  // Atualiza o display
    }    
}

function inserirOperador(evento){
    if(valorAtual !== '') {
        if (!calculando) {
            if (operador !== null) {
                calcular()
            }
            valorAnterior = valorAtual;
            valorAtual = '';
        }
        operador = evento.target.textContent;
    }
}

function calcular() {
    
    let resultado = null;
    const anterior = parseFloat(valorAnterior)  // Converte os valores para números
    const atual = parseFloat(valorAtual)

    switch (operador) {
        case "+":
            resultado = anterior + atual;
            break
        case "-":
            resultado = anterior - atual;
            break
        case "/":
            resultado = anterior / atual;
            break
        case "*":
            resultado = anterior * atual;
            break
    }

    valorAtual = String(resultado);  //convertido para string
    valorAnterior = atual;
    calculando = true;
    atualizaDisplay()
                                                  
}

function resetarCalculadora() {
    valorAtual = '';
    valorAnterior = '';
    operador = null;
    calculando = false;
    atualizaDisplay();
}


botaoPonto.addEventListener('click', inserirPonto);
botoesNumeros.forEach((botao) => botao.addEventListener('click', inserirNumero));
botoesOperadores.forEach((botao) =>
    botao.addEventListener('click', inserirOperador)
);
botaoIgual.addEventListener('click', calcular);
botaoReset.addEventListener('click', resetarCalculadora);