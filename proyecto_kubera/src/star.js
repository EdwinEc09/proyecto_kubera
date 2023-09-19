export default class Star {
  constructor(isTop, gameWidth, gameHeight) {
    // Dimensiones de la estrella
    this.height = 2;
    this.width = 2;

    // Posición inicial de la estrella
    this.position = {
      // La posición X se asigna aleatoriamente dentro del ancho del juego
      x: Math.floor(Math.random() * gameWidth),
    };

    // Velocidad de la estrella
    this.speed = Math.floor(Math.random() * 4) + 6;

    // Configura la posición Y inicial dependiendo de si es una estrella superior o no
    if (isTop) {
      this.position.y = -10; // Si es una estrella superior, se coloca arriba del área visible
    } else {
      this.position.y = Math.floor(Math.random() * gameHeight); // Si no, se coloca en una posición aleatoria dentro de la altura del juego
    }
  }

  // Método para dibujar la estrella en el contexto del juego
  draw(ctx) {
    // Dibuja un rectángulo blanco para representar la estrella
    ctx.fillStyle = "white";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  // Método para actualizar la posición de la estrella basada en el tiempo (deltaTime)
  update(deltaTime) {
    if (!deltaTime) return;

    // Mueve la estrella hacia abajo según la velocidad y el tiempo transcurrido
    this.position.y += this.speed / deltaTime;
  }
}
