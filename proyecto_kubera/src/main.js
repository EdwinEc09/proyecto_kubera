// Importación de clases desde archivos
import Paddle from "/src/paddle.js";
import InputHanderler from "/src/inputHandeler.js";
import Enemy from "/src/enemy.js";
import MEnemy from "/src/mEnemy.js";
import HealthPack from "/src/healthPack.js";
import Star from "/src/star.js";
import Bullet from "/src/bullet.js";
import SLBullet from "/src/sLBullet.js";
import SRBullet from "/src/sRBullet.js";
import Load from "/src/load.js";

// Obtención de elementos del DOM
const GameScreen = document.getElementById("GameScreen");

// Creación de objetos Image para cargar imágenes
let playerImg = new Image();
let enemyImg = new Image();
let bossImg = new Image();
let bulletImg = new Image();
let healthImg = new Image();

// Configuración de las URLs de las imágenes
// esta es la del personaje
playerImg.src = 'img/goku.png';
// esta es el enemigo 1
enemyImg.src = 'https://i.ibb.co/Hd3LbdZ/enemy.png';
// este es el enemigo 2(grande)
bossImg.src = 'img/nave_frezer-removebg-preview.png';
// este es la bala
bulletImg.src = 'img/genkidama-removebg-preview.png';
// este es la cura o la vida
healthImg.src = 'img/semilla_ermitaño-removebg-preview.png';

// Configuración del tamaño del área de juego
GameScreen.width = innerWidth;
GameScreen.height = innerHeight;

// Obtención del contexto de dibujo
const ctx = GameScreen.getContext("2d");

// Variables y arreglos para gestionar el estado del juego
let GameWidth = innerWidth;
let GameHeight = innerHeight;
let health = 100;
let score = 0;
let bullets = [];
let sLBullets = [];
let sRBullets = [];
let enemies = [];
let mEnemies = [];
let healthPacks = [];
let stars = [];
let load = new Load(GameWidth, GameHeight, 0);
let died = false;
let paused = true;
let loaded = false;
let progress = 0;

// Funciones para cargar imágenes y actualizar el progreso
playerImg.onload = function () {
  progress += 20;
}
enemyImg.onload = function () {
  progress += 20;
}
bulletImg.onload = function () {
  progress += 20;
}
healthImg.onload = function () {
  progress += 20;
}
bossImg.onload = function () {
  progress += 20;
}




// Creación del objeto Paddle y configuración del controlador de entrada
let paddle = new Paddle(GameWidth, GameHeight, playerImg);
new InputHanderler(paddle, GameWidth, GameHeight);


let lastTime = 0;
for (let i = 0; i < GameWidth; i += 40) {
  for (var x = 0; x < GameHeight; x += 40) {
    let star = new Star(false, GameWidth, GameHeight);
    stars.push(star);
  }
}

// Definición de la función gameLoop que maneja la lógica y renderizado del juego
function gameLoop(timestamp) {
  if (load.fill < progress) {
    load.fill += 5;
  }
  if (load.fill >= 100 && paused) {
    paused = false;
    loaded = true;
  }
  if (!paused) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, GameWidth, GameHeight);
    paddle.draw(ctx);
    paddle.update(deltaTime);
    for (var i in stars) {
      stars[i].draw(ctx);
      stars[i].update(deltaTime);
      if (stars[i].position.y > GameHeight) {
        stars.splice(i, 1);
      }
    }
    for (var i in enemies) {
      enemies[i].draw(ctx);
      enemies[i].update(deltaTime);
      if (enemies[i].position.y > GameHeight) {
        health -= 10;
        enemies.splice(i, 1);
      }
      for (var x in sLBullets) {
        if (typeof enemies[i] !== "undefined") {
          if (typeof sLBullets[x] !== "undefined") {
            if (collision(enemies[i], sLBullets[x])) {
              sLBullets.splice(x, 1);
              enemies.splice(i, 1);
            }
          }
        }
      }

      for (var x in sRBullets) {
        if (typeof enemies[i] !== "undefined") {
          if (typeof sRBullets[x] !== "undefined") {
            if (collision(enemies[i], sRBullets[x])) {
              sRBullets.splice(x, 1);
              enemies.splice(i, 1);
            }
          }
        }
      }

      for (var x in bullets) {
        if (typeof enemies[i] !== "undefined") {
          if (typeof bullets[x] !== "undefined") {
            if (collision(enemies[i], bullets[x])) {
              enemies.splice(i, 1);

              bullets.splice(x, 1);

              score += 10;
            }
          }
        }
      }
    }

    for (var i in mEnemies) {
      mEnemies[i].draw(ctx);

      mEnemies[i].update(deltaTime);

      if (mEnemies[i].position.y > GameHeight) {
        enemies.splice(i, 1);

        health = 0;
      }
      for (var x in sLBullets) {
        if (typeof mEnemies[i] !== "undefined") {
          if (typeof sLBullets[x] !== "undefined") {
            if (collision(mEnemies[i], sLBullets[x])) {
              if (!(mEnemies[i].health <= 0)) {
                sLBullets.splice(x, 1);

                mEnemies[i].health -= 0.25;
              } else {
                score += 100;

                mEnemies.splice(i, 1);
              }
            }
          }
        }
      }

      for (var x in sRBullets) {
        if (typeof mEnemies[i] !== "undefined") {
          if (typeof sRBullets[x] !== "undefined") {
            if (collision(mEnemies[i], sRBullets[x])) {
              if (!(mEnemies[i].health <= 0)) {
                sRBullets.splice(x, 1);

                mEnemies[i].health -= 0.25;
              } else {
                score += 100;

                mEnemies.splice(i, 1);
              }
            }
          }
        }
      }

      for (var x in bullets) {
        if (typeof mEnemies[i] !== "undefined") {
          if (typeof bullets[x] !== "undefined") {
            if (collision(mEnemies[i], bullets[x])) {
              if (!(mEnemies[i].health <= 0)) {
                mEnemies[i].health -= 1;
              } else {
                score += 100;

                mEnemies.splice(i, 1);
              }

              bullets.splice(x, 1);
            }
          }
        }
      }
    }
    for (var i in healthPacks) {
      healthPacks[i].draw(ctx);

      healthPacks[i].update(deltaTime);

      if (healthPacks[i].position.y > GameHeight) {
        health += 10;

        healthPacks.splice(i, 1);
      }

      for (var x in sLBullets) {
        if (typeof healthPacks[i] != "undefined") {
          if (typeof sLBullets[x] != "undefined") {
            if (collision(healthPacks[i], sLBullets[x])) {
              healthPacks.splice(i, 1);

              sLBullets.splice(x, 1);

              health += 10;
            }
          }
        }
      }

      for (let x in sRBullets) {
        if (typeof healthPacks[i] != "undefined") {
          if (typeof sRBullets[x] != "undefined") {
            if (collision(healthPacks[i], sRBullets[x])) {
              healthPacks.splice(i, 1);

              sRBullets.splice(x, 1);

              health += 10;
            }
          }
        }
      }

      for (var x in bullets) {
        if (typeof healthPacks[i] != "undefined") {
          if (typeof bullets[x] != "undefined") {
            if (collision(healthPacks[i], bullets[x])) {
              healthPacks.splice(i, 1);

              bullets.splice(x, 1);

              health += 10;
            }
          }
        }
      }
    }

    for (var i in bullets) {
      bullets[i].draw(ctx);

      bullets[i].update(deltaTime);

      if (bullets[i].position.y < 0) {
        bullets.splice(i, 1);
      }
    }

    for (var i in sLBullets) {
      sLBullets[i].draw(ctx);

      sLBullets[i].update(deltaTime);

      if (sLBullets[i].position.y < 0) {
        sLBullets.splice(i, 1);
      }
    }

    for (var i in sRBullets) {
      sRBullets[i].draw(ctx);

      sRBullets[i].update(deltaTime);

      if (sRBullets[i].position.y < 0) {
        sRBullets.splice(i, 1);
      }
    }

    ctx.fillStyle = "#00f";
    ctx.font = "20px Arial";
    ctx.fillText("health: " + health, 10, 20);
    ctx.fillStyle = "#f00";
    ctx.fillText("score: " + score, innerWidth - 100, 20);
    if (health <= 0) {
      if (!died) {
        died = true;
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: `Health: ${health}, Score: ${score}`,
          showConfirmButton: false,
          timer: 2000,
        });
        restartGame();
      }
    }
  }
  if (!loaded) {
    load.draw(ctx);
  }
  // Solicitud de animación para el siguiente ciclo del bucle de juego
  requestAnimationFrame(gameLoop);
}
function fire() {
  if (!paused) {
    let bullet = new Bullet(paddle, bulletImg);
    let sLBullet = new SLBullet(bullet, bulletImg);
    let sRBullet = new SRBullet(bullet, bulletImg);
    bullets.push(bullet);
    sLBullets.push(sLBullet);
    sRBullets.push(sRBullet);
  }
}
function spawnEnemy() {
  if (!paused) {
    let enemy = new Enemy(GameWidth, enemyImg);
    enemies.push(enemy);
  }
}
function spawnMEnemy() {
  if (!paused) {
    let mEnemy = new MEnemy(GameWidth, bossImg);
    mEnemies.push(mEnemy);
  }
}
function spawnHealth() {
  if (!paused) {
    let healthPack = new HealthPack(GameWidth, healthImg);
    healthPacks.push(healthPack);
  }
}
function spawnStar() {
  if (!paused) {
    let star = new Star(true, GameWidth, GameHeight);
    stars.push(star);
  }
}
setInterval(spawnEnemy, 300);
setInterval(spawnMEnemy, 5000);
setInterval(spawnHealth, 7000);
setInterval(fire, 250);
setInterval(spawnStar, 200);


// Inicio del ciclo de juego llamando a gameLoop
gameLoop();

function collision(a, b) {
  return (
    a.position.x < b.position.x + b.width &&
    a.position.x + a.width > b.position.x &&
    a.position.y < b.position.y + b.height &&
    a.position.y + a.height > b.position.y
  );
}
function restartGame() {

  health = 100;
  score = 0;
  bullets = [];
  sLBullets = [];
  sRBullets = [];
  enemies = [];
  mEnemies = [];
  healthPacks = [];
  died = false;
}

/*document.addEventListener("resize", function() {

  GameWidth = innerWidth;

  GameHeight = innerHeight;

  GameScreen.width = GameWidth;

  GameScreen.height = GameHeight;

});*/