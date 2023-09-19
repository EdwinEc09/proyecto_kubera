export default class Bullet {
  constructor(paddle, img) {
    // Configuración de las dimensiones y propiedades de la bala
    this.width = 50;
    this.height = 45;
    this.top = { width: 4, height: 2.5 };

    this.smallTop = { width: 2, height: 1.5 };
    // esta es la rapides de la genkidama
    this.speed = 80;

    // Posición inicial de la bala en relación al paddle
    this.position = {
      x: paddle.position.x + paddle.width / 2 - this.width / 2,
      // esta es la separacion de la genkidama al personaje
      y: paddle.position.y - 25,
    };

    this.img = img;  // La imagen de la bala
  }

  // Método para dibujar la bala en el contexto del juego
  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  // Método para actualizar la posición de la bala basada en el tiempo (deltaTime)
  update(deltaTime) {
    if (!deltaTime) return;

    // Mueve la bala hacia arriba según la velocidad y el tiempo transcurrido
    this.position.y -= this.speed / deltaTime;
  }
}
