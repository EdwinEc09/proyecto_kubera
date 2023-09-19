export default class Enemy {
  constructor(gameWidth, img) {
    // Configuración de las dimensiones y propiedades del enemigo
    this.width = 40;
    this.height = 40;
    this.img = img;

    // Posición inicial del enemigo en la parte superior y aleatoria en el ancho del juego
    this.position = {
      x: Math.floor(Math.random() * (gameWidth - 20)) + 10 - this.width / 2,
      y: -20,
    };

    // Velocidad de movimiento aleatoria para el enemigo
    this.speed = Math.floor(Math.random() * 49) + 31;
  }

  // Método para dibujar al enemigo en el contexto del juego
  draw(ctx) {
    ctx.fillStyle = "#f00";
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  // Método para actualizar la posición del enemigo basada en el tiempo (deltaTime)
  update(deltaTime) {
    if (!deltaTime) return;

    // Mueve al enemigo hacia abajo según la velocidad y el tiempo transcurrido
    this.position.x,this.position.y+= this.speed / deltaTime;
  }
}
