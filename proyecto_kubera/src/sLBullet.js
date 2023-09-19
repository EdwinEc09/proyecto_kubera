export default class SLBullet {
  constructor(bullet, img) {
    // Dimensiones de la bala
    this.width = 15;
    this.height = 15;

    // Dimensiones del "tope" de la bala
    this.top = {
      width: 4,
      height: 2.5,
    };

    // Dimensiones del "tope" pequeño de la bala
    this.smallTop = {
      width: 2,
      height: 1.5,
    };

    // Velocidad de la bala
    this.speed = 80;

    // Posición inicial de la bala en relación a la bala anterior (bullet)
    this.position = {
      // Posición X de la bala ajustada para que esté centrada respecto a la bala anterior
      x: bullet.position.x + bullet.width / 2 - this.width / 2 - 15,
      // Posición Y de la bala ajustada para que esté centrada respecto a la bala anterior
      y: bullet.position.y + bullet.height / 2 - this.height / 2,
    };

    // Imagen de la bala
    this.img = img;
  }

  // Método para dibujar la bala en el contexto del juego
  draw(ctx) {
    // Dibuja la imagen de la bala en su posición actual
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
