let juego = () => {
    const canvas = document.getElementById("screen");
    const ctx = canvas.getContext("2d");

    var vidas;
    var puntos

    var xPaleta=canvas.width/2;
    var yPaleta=canvas.height-(canvas.height/8)
    var flechaDerecha=false;
    var flechaIzquierda=false;
    
    var xPelota=xPaleta;
    var yPelota=yPaleta-4;
    var dx=2;
    var dy=-2;

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
        ctx.arc(xPelota, yPelota, 2, 0, Math.PI*2);
        ctx.fillStyle="#ffffff";
        ctx.fill();
        ctx.closePath();
    }

    let dibujarPaleta = () => {
        ctx.beginPath();
        ctx.rect(xPaleta-25, yPaleta, 50, 2);
        ctx.fillStyle="#ffffff";
        ctx.fill();
        ctx.closePath();
    }
    
    let dibujar = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarPelota();
        dibujarPaleta();
        if(xPelota+dx>canvas.width || xPelota+dx<0){
            dx*=-1;
        }
        if(yPelota+dy>canvas.height || yPelota+dy<0){
            dy*=-1;
        }
        if(flechaDerecha==true && xPaleta<canvas.width-25){
            xPaleta+=2;
        }
        if(flechaIzquierda==true && xPaleta>25){
            xPaleta-=2;
        }
        xPelota+=dx;
        yPelota+=dy;
    }

    setInterval(dibujar, 10);
}

