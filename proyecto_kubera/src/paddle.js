export default class Paddle {
  constructor(GameWidth, GameHeight, img) {
    // Anchura y altura del área de juego
    this.gameWidth = GameWidth;

    // Anchura de la paleta
    this.width = 64;

    // Altura de la paleta
    this.height = 64;

    // Imagen de la paleta
    this.img = img;

    // Velocidad máxima de movimiento de la paleta
    this.maxSpeed = 20;

    // Velocidad actual de la paleta
    this.speed = 0;

    // Posición inicial de la paleta
    this.position = {
      // La posición X de la paleta en el centro del ancho del área de juego
      x: GameWidth / 2 - this.width / 2,
      // La posición Y de la paleta en la parte inferior del área de juego con un pequeño desplazamiento
      y: GameHeight - this.height - 10,
    };
  }

  // Método para mover la paleta hacia la izquierda
  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  // Método para mover la paleta hacia la derecha
  moveRight() {
    this.speed = this.maxSpeed;
  }

  // Método para detener el movimiento de la paleta
  stop() {
    this.speed = 0;
  }

  // Método para dibujar la paleta en el contexto del juego
  draw(ctx) {
    // Dibuja la imagen de la paleta en su posición actual
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  // Método para actualizar la posición de la paleta basada en el tiempo (deltaTime)
  update(deltaTime) {
    if (!deltaTime) return;

    // Actualiza la posición de la paleta basada en su velocidad y el tiempo transcurrido
    this.position.x += this.speed;

    // Limita la posición de la paleta para que no se salga del área de juego en el eje X
    if (this.position.x < 0) {
      this.position.x = 0;
    }

    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }
}
