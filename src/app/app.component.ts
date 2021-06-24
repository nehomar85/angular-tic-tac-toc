import { Component, VERSION } from "@angular/core";
import { setupTestingRouter } from "@angular/router/testing";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  [x: string]: any;
  /* Se inicializan la matriz de posiciones para cada button declarado
  Incluyendo las variables de Jugadores y contadores */
  posicion = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
  jugadorX: string = "";
  jugadorO: string = "";
  jugador = "X";
  ganoX = 0;
  ganoY = 0;
  empate = 0;
  contador = 0;
  juegos: any[] = [];
  deshabilita: boolean = true;

  marcarPosicion(fila: number, columna: number) {
    /* Trae la posición[fila][columna] del button clickeado Iniciando con un if para todo button vacío " ", en donde se verifica el juego (gana/empate) y se alterna al jugador */
    if (this.posicion[fila][columna] == " ") {
      this.posicion[fila][columna] = this.jugador;
      this.verificarJuego("X", this.jugadorX);
      this.verificarJuego("O", this.jugadorO);
      this.cambiarJugador();
      this.validaEmpate();
    }
  }

  inicializar() {
    /* hace un recorrido de los buttons tipo matriz 3x3 para reincializarlos en blanco, los habilita e inicia el contador. Mantiene el acumulativo de partidas ganadas/empatadas. Indica el turno del jugador a empezar */
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.posicion[i][j] = " ";
      }
    }
    this.deshabilita = false;
    this.contador = 0;
    alert("Empieza " + this.jugador);
  }

  nuevoJuego() {
    /* Inicializar por completo el juego. También partidas ganadas/empatadas */
    this.inicializar();
    this.jugadorX = "";
    this.jugadorO = "";
    this.ganoX = 0;
    this.ganoY = 0;
    this.empate = 0;
    this.contador = 0;
    this.juegos = [];
  }

  limpiar() {
    /* Limpia inputs de jugadores(X/O) y resetea el tablero. Deshabilita */
    this.jugadorX = "";
    this.jugadorO = "";
    this.deshabilita = true;
  }

  cambiarJugador() {
    /* Alterna el jugador entre X y O */
    if (this.jugador == "O") {
      this.jugador = "X";
    } else {
      this.jugador = "O";
    }
  }

  verificarJuego(turno: string, nombreJugador: string) {
    /* Se validan las diferentes combinaciones del posible ganador. Se valida con cada jugador, mediante el parametro string ("X" ó "O") y se pasa el nombre del jugador */
    if (
      this.posicion[0][0] == turno &&
      this.posicion[0][1] == turno &&
      this.posicion[0][2] == turno
    ) {
      alert("Ganó " + nombreJugador);
      this.totalGanadas(turno);
    } else if (
      this.posicion[1][0] == turno &&
      this.posicion[1][1] == turno &&
      this.posicion[1][2] == turno
    ) {
      alert("Ganó " + nombreJugador);
      this.totalGanadas(turno);
    } else if (
      this.posicion[2][0] == turno &&
      this.posicion[2][1] == turno &&
      this.posicion[2][2] == turno
    ) {
      alert("Ganó " + nombreJugador);
      this.totalGanadas(turno);
    } else if (
      this.posicion[0][0] == turno &&
      this.posicion[1][0] == turno &&
      this.posicion[2][0] == turno
    ) {
      alert("Ganó " + nombreJugador);
      this.totalGanadas(turno);
    } else if (
      this.posicion[0][1] == turno &&
      this.posicion[1][1] == turno &&
      this.posicion[2][1] == turno
    ) {
      alert("Ganó " + nombreJugador);
      this.totalGanadas(turno);
    } else if (
      this.posicion[0][2] == turno &&
      this.posicion[1][2] == turno &&
      this.posicion[2][2] == turno
    ) {
      alert("Ganó " + nombreJugador);
      this.totalGanadas(turno);
    } else if (
      this.posicion[0][0] == turno &&
      this.posicion[1][1] == turno &&
      this.posicion[2][2] == turno
    ) {
      alert("Ganó " + nombreJugador);
      this.totalGanadas(turno);
    } else if (
      this.posicion[0][2] == turno &&
      this.posicion[1][1] == turno &&
      this.posicion[2][0] == turno
    ) {
      alert("Ganó " + nombreJugador);
      this.totalGanadas(turno);
    }
  }

  totalGanadas(gano: string) {
    /* Permite generar el array con el contador de juegos, nombres de jugadores(X/O) y el ganador. También lleva el acumulativo de las partidas ganadas por jugador y total de empates(ganoX,ganoY,empate) -como opcional-. Al ganar se deshabilita cada button(true) */
    this.deshabilita = true;
    if (gano == "X") {
      this.juegos.push([
        this.contador,
        this.jugadorX,
        this.jugadorO,
        this.jugadorX
      ]);
      this.ganoX++;
    } else if (gano == "O") {
      this.juegos.push([
        this.contador,
        this.jugadorX,
        this.jugadorO,
        this.jugadorO
      ]);
      this.ganoY++;
    } else if (gano == "E") {
      this.juegos.push([this.contador, this.jugadorX, this.jugadorO, "Empate"]);
      this.empate++;
    }
  }

  validaEmpate() {
    /* Suma los clicks realizados por las posiciones de los buttons y genera empate si al noveno click no hubo ganador */
    this.contador++;
    if (this.contador >= 9) {
      alert("Empate");
      this.totalGanadas("E");
    }
  }
}