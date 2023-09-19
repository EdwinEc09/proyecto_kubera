export default class InputHandler {
  constructor(paddle, GameWidth) {
    // Escucha eventos de teclado para mover el paddle izquierda o derecha
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          paddle.moveLeft();  // Mover el paddle hacia la izquierda
          break;

        case 39:
          paddle.moveRight();  // Mover el paddle hacia la derecha
          break;
      }
    });

    // Escucha eventos de teclado para detener el movimiento del paddle
    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 37:
          if (paddle.speed < 0) {
            paddle.stop();  // Detener el movimiento del paddle hacia la izquierda
          }
          break;

        case 39:
          if (paddle.speed > 0) {
            paddle.stop();  // Detener el movimiento del paddle hacia la derecha
          }
          break;
      }
    });

    // Escucha eventos de pantalla táctil para mover el paddle
    // esto es opcional ya que si no se utiliza en cell entones no pasa nada
    document.addEventListener("touchmove", (event) => {
      let rect = GameScreen.getBoundingClientRect();
      let root = document.documentElement;
      let touch = event.changedTouches[0];
      let touchX = parseInt(touch.clientX);
      let touchY = parseInt(touch.clientY) - rect.top - root.scrollTop;
      let pwidth = paddle.width;
      let min = Math.max(touchX - pwidth / 2, 0);
      let max = Math.min(min, GameWidth - pwidth);
      paddle.position.x = max;  // Actualizar la posición del paddle en respuesta al toque
    });

    // Escucha eventos de pantalla táctil para detener el movimiento del paddle
    document.addEventListener("touchend", (event) => {
      paddle.stop();  // Detener el movimiento del paddle en respuesta al fin del toque
    });
  }
}
