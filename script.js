/* =========================================
   CONFIGURAÇÕES
   ========================================= */

// Data de início do relacionamento (EDITE AQUI)
const DATA_INICIO = new Date('2025-09-06T20:10:00');

// Texto da carta (EDITE AQUI)
const TEXTO_CARTA = `Amor, fiz essa surpresa pra você, pra termos um momento de paz no meio das brigas 🕊️. Fiz pra reforçar o meu amor por você ❤️. Você é incrível, linda, e eu sou muito orgulhoso de ter você do meu lado. Sei que ainda vamos chegar muito longe juntos 🚀. Apesar dos traumas, inseguranças e problemas, sei que com você ao meu lado tudo é possível 💪❤️. Eu te escolhi hoje e sempre 💍, e não tinha como ser diferente.

Para: Anny, 
Minha namorada,
Minha melhor amiga, 
Minha vida,
Minha paz,
Meu tudo,
O amor da minha vida, 
Meu maior amor.`;

// Velocidade de digitação em milissegundos (EDITE AQUI se quiser mais rápido ou lento)
const VELOCIDADE_DIGITACAO = 50;

/* =========================================
   ELEMENTOS DO DOM
   ========================================= */
const telaInicial = document.getElementById('tela-inicial');
const telaCarta = document.getElementById('tela-carta');
const btnAbrir = document.getElementById('btn-abrir');
const textoCartaElement = document.getElementById('texto-carta');
const elementosDias = document.getElementById('dias');
const elementosHoras = document.getElementById('horas');
const elementosMinutos = document.getElementById('minutos');
const elementosSegundos = document.getElementById('segundos');

/* =========================================
   VARIÁVEIS GLOBAIS
   ========================================= */
let indiceTexto = 0;
let intervalContador = null;

/* =========================================
   FUNÇÃO PRINCIPAL - INICIAR CARTA
   ========================================= */
function iniciarCarta() {
    // Esconde a tela inicial com fade
    telaInicial.style.opacity = '0';
    
    setTimeout(() => {
        telaInicial.classList.add('hidden');
        telaCarta.classList.remove('hidden');
        
        // Pequeno delay para garantir que a tela está visível
        setTimeout(() => {
            telaCarta.style.opacity = '1';
            efeitoDigitacao();
            iniciarContador();
        }, 100);
    }, 500);
}

/* =========================================
   EFEITO DE DIGITAÇÃO (TYPEWRITER)
   ========================================= */
function efeitoDigitacao() {
    // Reseta o texto
    textoCartaElement.textContent = '';
    indiceTexto = 0;
    
    // Função recursiva para digitar cada caractere
    function digitarProximoCaractere() {
        if (indiceTexto < TEXTO_CARTA.length) {
            textoCartaElement.textContent += TEXTO_CARTA.charAt(indiceTexto);
            indiceTexto++;
            setTimeout(digitarProximoCaractere, VELOCIDADE_DIGITACAO);
        } else {
            // Marca como completo para remover o cursor piscante
            textoCartaElement.classList.add('typing-complete');
        }
    }
    
    digitarProximoCaractere();
}

/* =========================================
   CONTADOR DE TEMPO
   ========================================= */
function iniciarContador() {
    // Atualiza imediatamente
    atualizarContador();
    
    // Atualiza a cada segundo
    intervalContador = setInterval(atualizarContador, 1000);
}

function atualizarContador() {
    const agora = new Date();
    const diferenca = agora - DATA_INICIO;
    
    // Calcula o tempo decorrido
    const segundosTotais = Math.floor(diferenca / 1000);
    const minutosTotais = Math.floor(segundosTotais / 60);
    const horasTotais = Math.floor(minutosTotais / 60);
    const diasTotais = Math.floor(horasTotais / 24);
    
    // Calcula os valores para exibição
    const dias = diasTotais;
    const horas = horasTotais % 24;
    const minutos = minutosTotais % 60;
    const segundos = segundosTotais % 60;
    
    // Atualiza o DOM com animação suave
    atualizarElementoComAnimacao(elementosDias, dias);
    atualizarElementoComAnimacao(elementosHoras, horas);
    atualizarElementoComAnimacao(elementosMinutos, minutos);
    atualizarElementoComAnimacao(elementosSegundos, segundos);
}

function atualizarElementoComAnimacao(elemento, valor) {
    const valorFormatado = valor.toString().padStart(2, '0');
    
    if (elemento.textContent !== valorFormatado) {
        elemento.style.transform = 'scale(1.1)';
        elemento.textContent = valorFormatado;
        
        setTimeout(() => {
            elemento.style.transform = 'scale(1)';
        }, 200);
    }
}

/* =========================================
   EVENT LISTENERS
   ========================================= */
btnAbrir.addEventListener('click', iniciarCarta);

// Adiciona transição suave aos números do contador
document.querySelectorAll('.numero').forEach(elemento => {
    elemento.style.transition = 'transform 0.2s ease';
});

/* =========================================
   INICIALIZAÇÃO
   ========================================= */
// Log de inicialização (pode remover em produção)
console.log('💌 Site carregado com sucesso!');
console.log(`📅 Contando desde: ${DATA_INICIO.toLocaleDateString('pt-BR')}`);
