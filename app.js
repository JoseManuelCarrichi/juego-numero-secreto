let numeroIntentos, numeroSecreto, maximoIntentos = 0;
let numerosSorteados = [];
let numeroMaximo = 10;

// Función que se ejecuta al hacer clic en el botón y veridica si el número ingresado es el número secreto
function verificarIntento()
{
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
    if(numeroDeUsuario === numeroSecreto)
    {
        modificarTextoElemento("p", `Acertaste el número en ${numeroIntentos} ${numeroIntentos == 1 ? "intento" : "intentos"}`);
        // Si se acierta el número se deshabilita el botón
        document.getElementById("reiniciar").removeAttribute("disabled");
    }
    // Si no se acierta el número
    else
    {
        if(numeroDeUsuario > numeroSecreto)
        {
            modificarTextoElemento("p", "El número secreto es menor");
        }
        else
        {
            modificarTextoElemento("p", "El número secreto es mayor");
        }
        numeroIntentos++;
        limpiarInput();
        // Si se llega al número máximo de intentos 
        if(numeroIntentos > maximoIntentos)
        {
            modificarTextoElemento("p","Llegaste al límite de intentos, suerte para la próxima.");
            // Desabilitar el botón intentar
            document.getElementById("intentar").setAttribute("disabled", true);
            // Habilitar el botón reiniciar
            document.getElementById("reiniciar").removeAttribute("disabled");
        }


    }
    return;
}
// Funcion para modificar el texto de un elemento HTML
function modificarTextoElemento(elemento, textoElemento)
{
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = textoElemento;
    return;
}

// Función que genera un número aleatorio entre 1 y el número máximo que se le pasa por parámetro
function generarNumeroSecreto(numeroMaximo)
{
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    // Si se han sorteado todos los números
    if(numerosSorteados.length == numeroMaximo)
    {
        //modificarTextoElemento("p", "Se han sorteado todos los números, reinicia el juego");
        numerosSorteados = [];
        return generarNumeroSecreto(numeroMaximo);
    }
    else
    {
        // Si el numero generado ya existe en el array de numeros sorteados se vuelve a llamar a la función
        if(numerosSorteados.includes(numeroGenerado))
        {
            return generarNumeroSecreto(numeroMaximo);
        }
        else
        {
            numerosSorteados.push(numeroGenerado);
            console.log("Gen: " + numeroGenerado);
            console.log("lst:" +numerosSorteados);
            return numeroGenerado;
        }
    }
    
    
}
// Limpiar la caja del input
function limpiarInput()
{
    // Se utiliza el método querySelector para obtener el elemento con el id valorUsuario 
    document.querySelector("#valorUsuario").value = "";
}
// Función que se ejecuta al hacer clic en el botón reiniciar
function reiniciarJuego()
{
    //Limpiar el input
    limpiarInput();
    // Indicar mensaje de inicio
    condicionesIniciales();
    // Deshabilitar el botón reiniciar
    document.querySelector("#reiniciar").setAttribute("disabled", true);
    // Habilitar el botón intentar
    document.querySelector("#intentar").removeAttribute("disabled");
    return;
}

// Funcion de mensajes iniciales
function condicionesIniciales()
{
    // Reiniciar el número de intentos
    numeroIntentos = 1;
    maximoIntentos = 3;
    // Mensajes
    modificarTextoElemento("h1", "Juego del número secreto");
    modificarTextoElemento("p", `Tienes ${maximoIntentos} intentos para divinar el número secreto entre 1 y ${numeroMaximo}.`);
    //Generar un nuevo número secreto
    numeroSecreto = generarNumeroSecreto(numeroMaximo);
    return;
}


condicionesIniciales();