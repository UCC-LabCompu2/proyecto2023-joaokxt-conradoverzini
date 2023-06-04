let enviarFormulario = () =>{

}

let juego = () => {
    const canvas = document.getElementById("screen");
    const ctx = canvas.getContext("2d");

    var vidas=3;
    var puntos=0;
    var nivel=1;

    var xPaleta=canvas.width/2;
    var yPaleta=canvas.height-(canvas.height/8);
    var anchoPaleta=50;
    var alturaPaleta=2;
    var flechaDerecha=false;
    var flechaIzquierda=false;
    
    var xPelota=xPaleta;
    var yPelota=yPaleta-4;
    var radioPelota=2;
    var dx=2;
    var dy=-2;

    var filasLadrillos = 3;
    var columnasLadrillos = 5;
    var anchoLadrillo = 75;
    var alturaLadrillo = 20;
    var paddingLadrillo = 10;
    var margenSuperior = 30;
    var margenIzquierdo = 30;
    var ladrillos = [];
    for(c=0; c<columnasLadrillos; c++) {
        ladrillos[c] = [];
    }
    for(r=0; r<filasLadrillos; r++) {
        ladrillos[c][r] = { x: 0, y: 0 };
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
        ctx.arc(xPelota, yPelota, radioPelota, 0, Math.PI*2);
        ctx.fillStyle="#ffffff";
        ctx.fill();
        ctx.closePath();
    }

    let dibujarPaleta = () => {
        ctx.beginPath();
        ctx.rect(xPaleta-anchoPaleta/2, yPaleta, anchoPaleta, alturaPaleta);
        ctx.fillStyle="#ffffff";
        ctx.fill();
        ctx.closePath();
    }

    let dibujarLadrillos = () => {
        for(var c=0; c<columnasLadrillos; c++){
            for(var f=0; f<filasLadrillos; f++){
                var xLadrillo = (c*(anchoLadrillo+paddingLadrillo))+margenIzquierdo;
                var yLadrillo = (f*(alturaLadrillo+paddingLadrillo))+margenSuperior;
                ladrillos[c][f].x=xLadrillo;
                ladrillos[c][f].y=yLadrillo;
                ctx.beginPath();
                ctx.rect(xLadrillo, yLadrillo, anchoLadrillo, alturaLadrillo);
                if(f==0){
                    ctx.fillStyle="#f3360e";
                }else if(f==1){
                    ctx.fillStyle="#e5f30e";
                }else if(f==2){
                    ctx.fillStyle="#180ef3";
                }
                ctx.fill();
                ctx.closePath();
            }
        }
    }

    let gameOver = () => {
        ctx.font = "20px Arial";
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
        if(xPelota+dx>canvas.width-radioPelota || xPelota+dx<radioPelota){
            dx*=-1;
        }
        if(yPelota+dy<radioPelota){
            dy*=-1;
        }else if(yPelota+dy>canvas.height-radioPelota){
            vidas=vidas-1;
            if(vidas===0){
                gameOver();
                clearInterval(intervalo);
            }else{
                xPaleta=canvas.width/2;
                yPaleta=canvas.height-(canvas.height/8);
                xPelota=xPaleta;
                yPelota=yPaleta-4;
                dx=2;
                dy=-2;
            }
        }
        //CALCULO REBOTE PELOTA CON PALETA
        if(yPelota+dy==yPaleta && (xPelota+dx>xPaleta-anchoPaleta/2 && xPelota+dx<xPaleta+anchoPaleta/2)){
            dy*=-1;
        }

        //MOVIMIENTO PELOTA
        xPelota+=dx;
        yPelota+=dy;

        
        //MOVIMIENTO PALETA
        if(flechaDerecha==true && xPaleta<canvas.width-anchoPaleta/2){
            xPaleta+=2;
        }
        if(flechaIzquierda==true && xPaleta>anchoPaleta/2){
            xPaleta-=2;
        }

        //MOSTRAR STATUS
        if(puntos>=100){
            document.getElementById("puntos").textContent=puntos;
        }else if(puntos>=10){
            document.getElementById("puntos").textContent="0"+puntos;
        }else{
            document.getElementById("puntos").textContent="00"+puntos;
        }
        document.getElementById("vidas").textContent="00"+vidas;
        if(nivel>=100){
            document.getElementById("nivel").textContent=nivel;
        }else if(nivel>=10){
            document.getElementById("nivel").textContent="0"+nivel;
        }else{
            document.getElementById("nivel").textContent="00"+nivel;
        }
    }

    let intervalo=setInterval(dibujar, 10);
    
}

let mostrarBoton = () => {
    document.getElementById("iniciar").style.display = 'block';
}

let ocultarBoton = () => {
    document.getElementById("iniciar").style.display = 'none';
}


