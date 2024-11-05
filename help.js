let fimDosTempos = document.getElementById("fimDosTempos"); // Display que mostra o tempo até o último segundo 

let destinoFinal = document.getElementById("ponteiro-hora"); // Ponteiro das horas
let decadencia = document.getElementById("ponteiro-minuto"); // Ponteiro dos minutos
let ultimaBatida = document.getElementById("ponteiro-segundo"); // Ponteiro dos segundos

// Variável de referência ao som do sino
let sino = document.getElementById("sino");

// Variável para permitir que o som seja tocado
let somPermitido = false;

// Variável para controlar se o sino já tocou no minuto 45
let sinoTocado = false;

// Array com as cores que vão ser usadas a cada 15 minutos
const cores = ["#33FFAA", "#3357FF", "#99FF66", "#FF5733"]; // Verde Água, Azul, Verde Claro, Vermelho

// Função para tocar o sino apenas uma vez quando atinge os 45 minutos
function tocarSino() {
    if (somPermitido) {
        sino.currentTime = 0; // Reinicia o áudio para garantir que ele comece do início
        sino.play().catch((error) => {
            console.error("Erro ao tocar o som do sino:", error);
        });
    }
}

// Função para atualizar o relógio
function atualizarRelogio() {
    const agora = new Date(); // O momento atual
    let horas = agora.getHours(); // Horas que marcam a passagem do dia
    let minutos = agora.getMinutes(); // Minutos que não podem ser recuperados
    let segundos = agora.getSeconds(); // Segundos que são a essência da vida

    // Atualiza o display com a hora atual
    fimDosTempos.innerText = `${String(horas).padStart(2, '0')} : ${String(minutos).padStart(2, '0')} : ${String(segundos).padStart(2, '0')}`;

    // Movimento dos ponteiros
    let anguloHora = (horas % 12) * 30 + minutos * 0.5; // Cada hora representa 30 graus
    let anguloMinuto = minutos * 6; // Cada minuto representa 6 graus
    let anguloSegundo = segundos * 6; // Cada segundo representa 6 graus

    // A rotação dos ponteiros
    destinoFinal.style.transform = `rotate(${anguloHora}deg)`;
    decadencia.style.transform = `rotate(${anguloMinuto}deg)`;
    ultimaBatida.style.transform = `rotate(${anguloSegundo}deg)`;

    // Muda a cor de fundo a cada 15 minutos
    if (minutos % 15 === 0 && segundos === 0) {
        document.querySelector('.relogio-sombrio').style.backgroundColor = cores[(minutos / 15) % cores.length];
    }

    // Toca o sino apenas quando atinge os 45 minutos
    if (minutos === 45 && !sinoTocado) {
        tocarSino(); // Toca o sino
        sinoTocado = true; // Marca que o sino foi tocado para evitar tocar repetidamente
    } else if (minutos !== 45) {
        // Reseta a marcação para permitir que o sino toque na próxima vez que atingir 45 minutos
        sinoTocado = false;
    }
}

// Função para mostrar o pop-up "Áudio Ativado"
function mostrarAudioAlert() {
    const alertBox = document.getElementById("audio-alert");
    alertBox.style.display = "block";
    alertBox.style.opacity = "1";

    // Oculta o pop-up após 5 segundos
    setTimeout(() => {
        alertBox.style.opacity = "0";
        setTimeout(() => alertBox.style.display = "none", 500);
    }, 5000);
}

// Adiciona evento para o botão de iniciar som
document.getElementById("iniciar-som").addEventListener("click", function() {
    somPermitido = true; // Permite tocar som após interação do usuário
    mostrarAudioAlert(); // Exibe o pop-up de aviso
});

// Atualiza o relógio a cada segundo
setInterval(atualizarRelogio, 1000);
atualizarRelogio(); // Chamada inicial
