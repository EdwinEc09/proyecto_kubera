export default class Load {
  constructor(gameWidth, gameHeight, fill) {
    // Configuración de las dimensiones y propiedades de la barra de carga
    this.width = 400;
    this.height = 20;
    this.fill = fill;
    this.offset = 2;

    // Posición inicial de la barra de carga en el juego
    this.position = {
      x: (gameWidth / 2) - (this.width / 2),
      y: (gameHeight - this.height) - 50
    };
  }

  // Método para dibujar la barra de carga en el contexto del juego
  draw(ctx) {
    ctx.fillStyle = 'White';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.fillStyle = '#33AFFF';
    ctx.fillRect(
      this.position.x + this.offset,
      this.position.y + this.offset,
      mapRange(this.fill, 0, 100, 0, this.width - this.offset),
      this.height - (this.offset * 2)
    );
  }
}

// Función para mapear un número de un rango a otro
function mapRange(number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
