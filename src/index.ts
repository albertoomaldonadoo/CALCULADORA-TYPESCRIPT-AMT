let valorActual: string = '0';
let operador: string = '';
let valorAnterior: string = '';

function actualizarDisplay(): void {
    const display = document.getElementById('display') as HTMLInputElement;
    display.value = valorActual;
}

function agregarAlDisplay(valor: string): void {
    if (['+', '-', '*', '/'].includes(valor)) {
        if (valorActual !== '0') {
            if (valorAnterior !== '' && operador !== '') {
                calcular();
            }
            valorAnterior = valorActual;
            operador = valor;
            valorActual = '0';
        }
    } else {
        if (valorActual === '0' && valor !== '.') {
            valorActual = valor;
        } else {
            valorActual += valor;
        }
    }
    actualizarDisplay();
}

function limpiarDisplay(): void {
    valorActual = '0';
    operador = '';
    valorAnterior = '';
    actualizarDisplay();
}

function borrarUltimo(): void {
    if (valorActual.length > 1) {
        valorActual = valorActual.slice(0, -1);
    } else {
        valorActual = '0';
    }
    actualizarDisplay();
}

function calcular(): void {
    if (valorAnterior !== '' && operador !== '') {
        const anterior = parseFloat(valorAnterior);
        const actual = parseFloat(valorActual);
        let resultado: number;

        switch (operador) {
            case '+': resultado = anterior + actual; break;
            case '-': resultado = anterior - actual; break;
            case '*': resultado = anterior * actual; break;
            case '/':
                if (actual === 0) { alert('Error: División por cero'); return; }
                resultado = anterior / actual; break;
            default: return;
        }

        valorActual = resultado.toString();
        operador = '';
        valorAnterior = '';
        actualizarDisplay();
    }
}

function raizCuadrada(): void {
    const actual = parseFloat(valorActual);
    if (actual < 0) { alert('Error: Número negativo'); return; }
    valorActual = Math.sqrt(actual).toString();
    actualizarDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarDisplay();
    const contenedor = document.querySelector('.botones');
    if (contenedor) {
        contenedor.addEventListener('click', (evento) => {
            const objetivo = evento.target as HTMLButtonElement;
            if (objetivo.tagName === 'BUTTON') {
                const accion = objetivo.dataset.action;
                const valor = objetivo.dataset.value;

                if (accion === 'clear') limpiarDisplay();
                else if (accion === 'delete') borrarUltimo();
                else if (accion === 'calculate') calcular();
                else if (accion === 'raizCuadrada') raizCuadrada();
                else if (valor) agregarAlDisplay(valor);
            }
        });
    }
});
