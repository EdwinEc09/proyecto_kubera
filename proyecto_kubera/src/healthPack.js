export default class HealthPack {
  constructor(GameWidth, img) {
    // Configuración de las dimensiones y propiedades del paquete de salud
    this.width = 40;
    this.height = 40;

    // Posición inicial del paquete de salud en la parte superior y aleatoria en el ancho del juego
    this.position = {
      x: Math.floor(Math.random() * (GameWidth - 20)) + 10 - this.width / 2,
      y: -20,
    };

    // Velocidad de movimiento aleatoria para el paquete de salud
    this.speed = Math.floor(Math.random() * 9) + 19;

    this.img = img;  // La imagen del paquete de salud
  }

  // Método para dibujar al paquete de salud en el contexto del juego
  draw(ctx) {
    ctx.fillStyle = "#00f";
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  // Método para actualizar la posición del paquete de salud basada en el tiempo (deltaTime)
  update(deltaTime) {
    if (!deltaTime) return;

    // Mueve al paquete de salud hacia abajo según la velocidad y el tiempo transcurrido
    this.position.y += this.speed / deltaTime;
  }
}
