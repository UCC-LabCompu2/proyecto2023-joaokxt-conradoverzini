let enviarFormulario = () =>{
    let nickname, mail, experiencia, botonEnviar;
    nickname=document.getElementById("nickname").value;
    mail=document.getElementById("mail").value;
    experiencia=document.querySelector('input[name="experiencia"]:checked');
    botonEnviar=document.getElementById("submit");

    if(nickname=="" || mail=="" || experiencia==null ){
        alert("Por favor, complete todo el formulario antes de jugar");
        botonEnviar.disabled=true;
        document.location.reload();
    }
}

let juego = () => {
    const canvas = document.getElementById("screen");
    const ctx = canvas.getContext("2d");

    var vidas=3;
    var puntos=0;
    var nivel=1;

    var dx=2;
    var dy=-2;

    var flechaDerecha=false;
    var flechaIzquierda=false;
    
    var paletaX = canvas.width/2;
    var paletaY = canvas.height-(canvas.height/8);
    var paletaAncho = 50;
    var paletaAltura = 2;

    var pelotaX = paletaX;
    var pelotaY = paletaY-4;
    var pelotaRadio = 2;

    var filasLadrillos = 10;
    var columnasLadrillos = 16;
    var anchoLadrillo = 16;
    var alturaLadrillo = 3;
    var paddingLadrillo = 2;
    var margenSuperior = 5;
    var margenIzquierdo = 5;
    const ladrillos = [];
    for(let c=0; c<columnasLadrillos; c++) {
        ladrillos[c] = [];
        for (let f = 0; f < filasLadrillos; f++) {
            ladrillos[c][f] = {
                x: 0,
                y: 0,
                estado: 1
            };
        }
    }

    document.addEventListener(
        "keydown", 
        keyDownHandler=(evento)=>{
            if(evento.keyCode===39){
                flechaDerecha=true;
            }
            else if(evento.keyCode===37){
                flechaIzquierda=true;
            }
        },
        false);

    document.addEventListener(
        "keyup", 
        keyUpHandler=(evento)=> {
            if(evento.keyCode===39){
                flechaDerecha=false;
            }
            else if(evento.keyCode===37){
                flechaIzquierda=false;
            }
        },
        false);

    
    let dibujarPelota = () => {
        ctx.beginPath();
        ctx.arc(pelotaX, pelotaY, pelotaRadio, 0, Math.PI*2);
        ctx.fillStyle="#ffffff";
        ctx.fill();
        ctx.closePath();
    }

    let dibujarPaleta = () => {
        ctx.beginPath();
        ctx.rect(paletaX-paletaAncho/2, paletaY, paletaAncho, paletaAltura);
        ctx.fillStyle="#ffffff";
        ctx.fill();
        ctx.closePath();
    }

    let dibujarLadrillos = () => {
        for(var c=0; c<columnasLadrillos; c++){
            for(var f=0; f<filasLadrillos; f++){
                if(ladrillos[c][f].estado==1){
                  var xLadrillo = (c*(anchoLadrillo+paddingLadrillo))+margenIzquierdo;
                    var yLadrillo = (f*(alturaLadrillo+paddingLadrillo))+margenSuperior;
                    ladrillos[c][f].x=xLadrillo;
                    ladrillos[c][f].y=yLadrillo;
                    ctx.beginPath();
                    ctx.rect(xLadrillo, yLadrillo, anchoLadrillo, alturaLadrillo);
                    switch(f){
                        case 0:
                            ctx.fillStyle="#f3360e";
                            break;
                        case 1:
                            ctx.fillStyle="#e5f30e";
                            break;
                        case 2:
                            ctx.fillStyle="#180ef3";
                            break;
                        case 3:
                            ctx.fillStyle="#180ef3";
                            break;
                        case 4:
                            ctx.fillStyle="#180ef3";
                            break;
                        case 5:
                            ctx.fillStyle="#180ef3";
                            break;
                        case 6:
                            ctx.fillStyle="#180ef3";
                            break;
                        case 7:
                            ctx.fillStyle="#180ef3";
                            break;
                        case 8:
                            ctx.fillStyle="#180ef3";
                            break;
                        case 9:
                            ctx.fillStyle="#180ef3";
                            break;
                    }
                    ctx.fill();
                    ctx.closePath();  
                }
                
            }
        }
    }

    let detectarColision = () => {
        for(let c=0; c<columnasLadrillos; c++){
            for(let f=0; f<filasLadrillos; f++){
                let ladrillo = ladrillos[c][f];
                if(ladrillo.estado==1){
                  if(pelotaX+dx>ladrillo.x && pelotaX+dx<ladrillo.x+anchoLadrillo && pelotaY+pelotaRadio+dy>ladrillo.y && pelotaY+pelotaRadio+dy<ladrillo.y+alturaLadrillo){
                        dy*=-1;
                        ladrillo.estado=0;
                    }  
                }
            }
        }
    }

    let status = () => {
        //MOSTRAR STATUS
        if(puntos>=100){
            document.getElementById("puntos").textContent=toString(puntos);
        }else if(puntos>=10){
            document.getElementById("puntos").textContent="0"+puntos;
        }else{
            document.getElementById("puntos").textContent="00"+puntos;
        }
        document.getElementById("vidas").textContent="00"+vidas;
        if(nivel>=100){
            document.getElementById("nivel").textContent=toString(nivel);
        }else if(nivel>=10){
            document.getElementById("nivel").textContent="0"+nivel;
        }else{
            document.getElementById("nivel").textContent="00"+nivel;
        }
    }
    let gameOver = () => {
        ctx.font = "20px Arial";
        ctx.fillStyle = "#ff0000"
        ctx.fillText("GAME OVER", canvas.width/2-60, canvas.height/2);
        mostrarBoton();
    }
    
    let dibujar = () => {
        //LIMPIAR CANVAS
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //DIBUJAR ELEMENTOS
        dibujarPelota();
        dibujarPaleta();
        dibujarLadrillos();
            
        //CALCULO REBOTE PELOTA CON PARED
        if(pelotaX+dx>canvas.width-pelotaRadio || pelotaX+dx<pelotaRadio){
            dx*=-1;
        }
        if(pelotaY+dy<pelotaRadio){
            dy*=-1;
        }else if(pelotaY+dy>canvas.height-pelotaRadio){
            vidas-=1;
            if(vidas===0){
                gameOver();
                clearInterval(intervalo);
            }else{
                paletaX=canvas.width/2;
                paletaY=canvas.height-(canvas.height/8);
                pelotaX=paletaX;
                pelotaY=paletaY-4;
                dx=2;
                dy=-2;
            }
        }
        //CALCULO REBOTE PELOTA CON PALETA
        if(pelotaY+dy==paletaY && (pelotaX+dx>paletaX-paletaAncho/2 && pelotaX+dx<paletaX+paletaAncho/2)){
            dy*=-1;
        }

        if(flechaDerecha==true && paletaX<canvas.width-paletaAncho/2){
            paletaX+=2;
        }
        if(flechaIzquierda==true && paletaX>paletaAncho/2){
            paletaX-=2;
        }

        detectarColision();

        //MOVIMIENTO PELOTA
        pelotaX+=dx;
        pelotaY+=dy;
        
        status();

        
    }

    let intervalo=setInterval(dibujar, 10);
    
}

let mostrarBoton = () => {
    document.getElementById("iniciar").style.display = 'block';
}

let ocultarBoton = () => {
    document.getElementById("iniciar").style.display = 'none';
}


