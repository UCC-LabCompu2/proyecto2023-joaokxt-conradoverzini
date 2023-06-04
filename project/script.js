/**
 * Valida que se llenen todos los campos del formulario
 * @method enviarFormulario
 */
let enviarFormulario = () => {
    let nickname, mail, experiencia, botonEnviar;
    nickname = document.getElementById("nickname").value;
    mail = document.getElementById("mail").value;
    experiencia = document.querySelector('input[name="experiencia"]:checked');
    botonEnviar = document.getElementById("submit");

    if (nickname == "" || mail == "" || experiencia == null) {
        alert("Por favor, complete todo el formulario antes de jugar");
        botonEnviar.disabled = true;
        document.location.reload();
    }
}

/**
 * Funcionamiento del juego
 * @method juego
 */
let juego = () => {
    const canvas = document.getElementById("screen");
    const ctx = canvas.getContext("2d");

    let vidas = 3;
    let puntos = 0;
    let nivel = 1;

    let dx = 2;
    let dy = -2;

    let flechaDerecha = false;
    let flechaIzquierda = false;

    let c, f;

    document.addEventListener(
        "keydown",
        keyDownHandler = (evento) => {
            if (evento.keyCode === 39) {
                flechaDerecha = true;
            } else if (evento.keyCode === 37) {
                flechaIzquierda = true;
            }
        },
        false
    );

    document.addEventListener(
        "keyup",
        keyUpHandler = (evento) => {
            if (evento.keyCode === 39) {
                flechaDerecha = false;
            } else if (evento.keyCode === 37) {
                flechaIzquierda = false;
            }
        },
        false
    );

    let Paleta = {
        x: canvas.width / 2,
        y: canvas.height - (canvas.height / 8),
        ancho: 50,
        altura: 2,
        dibujar: function () {
            ctx.beginPath();
            ctx.rect(this.x - this.ancho / 2, this.y, this.ancho, this.altura);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.closePath();
        },
        mover: function () {
            if (flechaDerecha == true && this.x < canvas.width - this.ancho / 2) {
                this.x += 2;
            }
            if (flechaIzquierda == true && this.x > this.ancho / 2) {
                this.x -= 2;
            }
        }
    }

    let Pelota = {
        x: Paleta.x,
        y: Paleta.y - 4,
        radio: 2,
        dibujar: function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.closePath();
        },
        rebotar: function () {
            if (this.x + dx > canvas.width - this.radio || this.x + dx < this.radio) {
                dx *= -1;
            }
            if (this.y + dy < this.radio) {
                dy *= -1;
            } else if (this.y + dy > canvas.height - this.radio) {
                vidas -= 1;
                resetPos();
            }
            if (this.y + dy == Paleta.y && (this.x + dx > Paleta.x - Paleta.ancho / 2 && this.x + dx < Paleta.x + Paleta.ancho / 2)) {
                dy *= -1;
            }
        },
        mover: function () {
            this.x += dx;
            this.y += dy;
        },
    }

    let resetPos = () => {
        Paleta.x = canvas.width / 2;
        Paleta.y = canvas.height - (canvas.height / 8);
        Pelota.x = Paleta.x;
        Pelota.y = Paleta.y - 4;
        dx = 2;
        dy = -2;
    }

    const filasLadrillos = 10;
    const columnasLadrillos = 16;
    let cantidadLadrillos = filasLadrillos * columnasLadrillos;
    const anchoLadrillo = 16;
    const alturaLadrillo = 3;
    const paddingLadrillo = 2;
    const margenSuperior = 5;
    const margenIzquierdo = 5;
    const ladrillos = [];
    for (let c = 0; c < columnasLadrillos; c++) {
        ladrillos[c] = [];
        for (let f = 0; f < filasLadrillos; f++) {
            ladrillos[c][f] = {
                x: 0,
                y: 0,
                estado: 1
            };
        }
    }


    /**
     * Dibuja los ladrillos en el canvas
     * @method dibujarLadrillos
     */
    let dibujarLadrillos = () => {
        for (c = 0; c < columnasLadrillos; c++) {
            for (f = 0; f < filasLadrillos; f++) {
                if (ladrillos[c][f].estado == 1) {
                    var xLadrillo = (c * (anchoLadrillo + paddingLadrillo)) + margenIzquierdo;
                    var yLadrillo = (f * (alturaLadrillo + paddingLadrillo)) + margenSuperior;
                    ladrillos[c][f].x = xLadrillo;
                    ladrillos[c][f].y = yLadrillo;
                    ctx.beginPath();
                    ctx.rect(xLadrillo, yLadrillo, anchoLadrillo, alturaLadrillo);
                    switch (f) {
                        case 0:
                            ctx.fillStyle = "#ab6553";
                            break;
                        case 1:
                            ctx.fillStyle = "#d225a3";
                            break;
                        case 2:
                            ctx.fillStyle = "#e70648";
                            break;
                        case 3:
                            ctx.fillStyle = "#ff0000";
                            break;
                        case 4:
                            ctx.fillStyle = "#ff3900";
                            break;
                        case 5:
                            ctx.fillStyle = "#e5e527";
                            break;
                        case 6:
                            ctx.fillStyle = "#33ff04";
                            break;
                        case 7:
                            ctx.fillStyle = "#180ef3";
                            break;
                        case 8:
                            ctx.fillStyle = "#9704bb";
                            break;
                        case 9:
                            ctx.fillStyle = "#00ffff";
                            break;
                    }
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    /**
     * Detecta las colisiones de la pelota con los demas elementos (paredes, ladrillos, paleta)
     * @method detectarColision
     */
    let detectarColision = () => {
        for (c = 0; c < columnasLadrillos; c++) {
            for (f = 0; f < filasLadrillos; f++) {
                let ladrillo = ladrillos[c][f];
                if (ladrillo.estado == 1) {
                    if (Pelota.x + dx > ladrillo.x && Pelota.x + dx < ladrillo.x + anchoLadrillo && Pelota.y + Pelota.radio + dy > ladrillo.y && Pelota.y + Pelota.radio + dy < ladrillo.y + alturaLadrillo) {
                        dy *= -1;
                        ladrillo.estado = 0;
                        puntos += 1;
                        cantidadLadrillos -= 1;
                    }
                }
            }
        }
    }

    /**
     * Muestra el status del jugador en la partida (puntos, vidas, nivel)
     * @method status
     */
    let status = () => {
        if (puntos >= 100) {
            document.getElementById("puntos").textContent = puntos;
        } else if (puntos >= 10) {
            document.getElementById("puntos").textContent = "0" + puntos;
        } else {
            document.getElementById("puntos").textContent = "00" + puntos;
        }
        document.getElementById("vidas").textContent = "00" + vidas;
        if (nivel >= 100) {
            document.getElementById("nivel").textContent = nivel;
        } else if (nivel >= 10) {
            document.getElementById("nivel").textContent = "0" + nivel;
        } else {
            document.getElementById("nivel").textContent = "00" + nivel;
        }
    }


    let gameOver = () => {
        ctx.font = "20px Arial";
        ctx.fillStyle = "#ff0000"
        ctx.fillText("GAME OVER", canvas.width / 2 - 60, canvas.height / 2);
        mostrarBoton();
    }

    let avanzarNivel = () => {
        puntos += 40;
        nivel += 1;
        resetPos();
        for (c = 0; c < columnasLadrillos; c++) {
            for (f = 0; f < filasLadrillos; f++) {
                ladrillos[c][f].estado = 1;
            }
        }
    }

    let jugar = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        Pelota.dibujar();
        Paleta.dibujar();
        dibujarLadrillos()
        Pelota.rebotar();
        detectarColision();
        Pelota.mover();
        Paleta.mover();

        if (cantidadLadrillos === 0) {
            avanzarNivel();
        }
        if (vidas === 0) {
            gameOver();
            clearInterval(intervalo);
        }

        status();
    }

    let intervalo = setInterval(jugar, 10);

}

let mostrarBoton = () => {
    document.getElementById("iniciar").style.display = 'block';
}

let ocultarBoton = () => {
    document.getElementById("iniciar").style.display = 'none';
}


