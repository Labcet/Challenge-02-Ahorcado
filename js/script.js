let words = ['HTML', 'ZAPATO', 'GUITARRA', 'DOCUMENTO'];
var flag = false;                   // BANDERA PARA INICIAR EL JUEGO
var mainWord;                       // PALABRA A ADIVINAR
var controlWord;                    // PARA EVITAR REPETIR LETRAS CORRECTAS
var wrongLetters;                   // PARA EVITAR REPETIR LETRAS INCORRECTAS
var rightLettersCount;              // CONTADOR DE LETRAS CORRECTAS INGRESADAS
var regex = /^[A-Z]$/;              // REGEX PARA ACEPTAR SOLO LETRAS
var attempts;                       // CANTIDAD DE INTENTOS
var checkEndGameFlag = false;       // BANDERA PARA VERIFICAR SI EL JUEGO TERMINO

var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");

/*================= INITIAL LAYOUT ===============*/

function startGame() {

    document.querySelector(".initial").style.display = 'none';
    document.querySelector(".add-words").style.display = 'none';
    document.querySelector(".game").style.display = 'initial';
    document.querySelector(".wrong-letters").textContent = '\xa0'; // REINICIAMOS 
    document.querySelector(".win-lose").textContent = "\xa0";

    var canvas = document.querySelector("canvas"); // LIMPIAMOS EL CANVAS
    canvas.width = canvas.width;

    flag = true;
    wrongLetters = '';
    rightLettersCount = 0;
    checkEndGameFlag = false;

    var li = document.querySelector(".letters");
    li.innerHTML = "";

    mainWord = words[randomWord()];
    controlWord = '';
    attempts = 5;
    
    letters(mainWord);
}

function addWords() {

    document.querySelector(".initial").style.display = 'none';;
    document.querySelector(".add-words").style.display = 'initial';;
    document.querySelector("#word").value = "";
}

/*================= ADD WORDS LAYOUT ===============*/

function saveWord() {

    var word = document.getElementById("word").value;

    if(word != ''){
        words.push(word.toUpperCase());
    }

    startGame();
}

function checkInput(e) {

    tecla = (document.all) ? e.keyCode : e.which;

    if (tecla == 8) {
        return true;
    }

    tecla_final = String.fromCharCode(tecla);
    return regex.test(tecla_final);
}

function cancel() {

    document.querySelector(".add-words").style.display = 'none';
    document.querySelector(".game").style.display = 'none';
    document.querySelector(".initial").style.display = 'initial';

    flag = false;
}

/*================= GAME LAYOUT ===============*/

function randomWord() {

    return Math.floor(Math.random() * (words.length - 0)) + 0;
}

function letters(word) {

    var li = document.querySelector(".letters");

    for (var i = 0; i < word.length; i++){

        var ul = document.createElement("ul");
        ul.classList.add('class_' + word[i]);
        ul.textContent = '\xa0';
        li.appendChild(ul);
    }
}

document.addEventListener('keydown', (event) => {

    if(flag){

        var keyValue = event.key;
        var wrongLetterCount = 0;

        if(regex.test(keyValue) && attempts > 0 && !checkEndGameFlag){
            if(!controlWord.includes(keyValue)){
                for(var i = 0; i < mainWord.length; i++){

                    if(keyValue == mainWord[i]){

                        rightLettersCount++;
                        controlWord += keyValue;
                        var elements = document.querySelectorAll(".class_"+mainWord[i]);

                        for (var j = 0; j < elements.length; j++){
                            
                            elements[j].textContent = mainWord[i];
                        }

                        if(rightLettersCount == mainWord.length){

                            checkEndGameFlag = true;
                            document.querySelector(".win-lose").textContent = "🎊 GANADOR 🏆";
                        }
                    } else {

                        wrongLetterCount++;
                    }
                }
            }

            if(wrongLetterCount == mainWord.length){

                if(!wrongLetters.includes(keyValue)){
                    attempts--;
                    wrongLetters += keyValue;
                    document.querySelector(".wrong-letters").textContent = wrongLetters;
                    drawHanged(attempts);

                    if(attempts == 0){
                        checkEndGameFlag = true;
                        document.querySelector(".win-lose").textContent = "😖 PERDEDOR 😓";
                    }
                }
            }
        }
    }

  }, false);

  function drawHanged(attempt) {

    switch(attempt){
        case 4: 
            var img = document.querySelector(".hanged01");
            pincel.drawImage(img,70,100,160,80);
            break;
        
        case 3:
            var img = document.querySelector(".hanged02");
            pincel.drawImage(img,10,10,700,700,74,10,80,100);
            break;
        
        case 2:
            var img = document.querySelector(".hanged03");
            pincel.drawImage(img,10,10,700,400,75,0,75,30);
            break;
        
        case 1:
            var img = document.querySelector(".hanged04");
            pincel.drawImage(img,10,10,700,400,110,10,110,50);
            break;
        
        case 0:

            var img = document.querySelector(".hanged05");
            pincel.drawImage(img,10,10,750,750,103,35,120,100);
            break;
        
        default:
            break;
    }
  }

  function drawLine(x1,y1,x2,y2) {

    pincel.lineWidth = 4;
    pincel.beginPath();
    pincel.moveTo(x1,y1);
    pincel.lineTo(x2,y2);
    pincel.stroke();
  }