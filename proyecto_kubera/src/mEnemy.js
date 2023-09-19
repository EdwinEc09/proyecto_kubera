export default class MEnemy {
  constructor(gameWidth, img) {
    // Configuración de las dimensiones y propiedades del enemigo "jefe"
    this.width = 100;
    this.height = 100;
    this.health = parseFloat(Math.floor(Math.random() * 10) + 7); // Salud aleatoria del enemigo "jefe"
    this.img = img;

    // Posición inicial del enemigo "jefe" en la parte superior y aleatoria en el ancho del juego
    this.position = {
      x: Math.floor(Math.random() * (gameWidth - 20)) + 10 - this.width / 2,
      y: -20,
    };

    // Velocidad de movimiento aleatoria para el enemigo "jefe"
    this.speed = Math.floor(Math.random() * 19) + 15;
  }

  // Método para dibujar al enemigo "jefe" en el contexto del juego
  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  // Método para actualizar la posición del enemigo "jefe" basada en el tiempo (deltaTime)
  update(deltaTime) {
    if (!deltaTime) return;

    // Mueve al enemigo "jefe" hacia abajo según la velocidad y el tiempo transcurrido
    this.position.y += this.speed / deltaTime;
  }
}


