document.addEventListener("DOMContentLoaded", function () {
  let game;

  document.getElementById("startButton").addEventListener("click", function () {
    // Mulai game setelah tombol diklik
    startGame();

    // Sembunyikan tombol
    document.getElementById("startButton").style.display = "none";
  });

  function startGame() {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    game = new Phaser.Game(config);
  }

  let player;
  let objects = [];
  let bombs = [];
  let score = 0;
  let scoreText;
  let livesText;
  let lives = 3;
  let objectFallSpeed = 200;
  let maxObjects = 5;
  let maxBombs = 3;

  // Array untuk variasi objek dan bom
  const objectVariations = ["object1", "object2", "object3"]; // Ganti dengan kunci gambar yang sesuai
  const bombVariations = ["bomb1", "bomb2"]; // Ganti dengan kunci gambar yang sesuai

  function preload() {
    // Load assets
    this.load.image("background", "../assets/img/game/sky1.png");
    this.load.image(
      "player",
      "https://labs.phaser.io/assets/sprites/platform.png"
    );
    this.load.image(
      "object1",
      "https://labs.phaser.io/assets/sprites/star.png"
    ); // Variasi objek
    this.load.image(
      "object2",
      "https://labs.phaser.io/assets/sprites/diamond.png"
    ); // Variasi objek
    this.load.image("bomb1", "https://labs.phaser.io/assets/sprites/bomb.png"); // Variasi bom
    this.load.image("bomb2", "https://labs.phaser.io/assets/sprites/bomb.png"); // Variasi bom (gunakan gambar yang berbeda)
  }

  function create() {
    // Background
    this.add.image(400, 300, "background");

    // Player (platform to catch objects)
    player = this.physics.add
      .sprite(400, 550, "player")
      .setScale(0.5)
      .setImmovable(true);
    player.body.allowGravity = false;

    // Membuat objek tunggal di awal
    createObject.call(this);
    createBomb.call(this);

    // Tambahkan objek baru setiap 2 detik, hingga maksimum 5 objek
    setInterval(() => {
      if (objects.length < maxObjects) {
        createObject.call(this);
      }
      if (bombs.length < maxBombs) {
        createBomb.call(this);
      }
    }, 2000);

    // Collider between player and objects
    this.physics.add.collider(player, objects, catchObject, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    // Input handling untuk mouse
    this.input.on("pointermove", function (pointer) {
      player.x = pointer.x; // Mengatur posisi player mengikuti posisi mouse
    });

    // Score text
    scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#fff",
    });

    // Lives text
    livesText = this.add.text(16, 50, "Lives: " + lives, {
      fontSize: "32px",
      fill: "#fff",
    });
  }

  function createObject() {
    // Memilih gambar objek secara acak dari variasi
    const objectKey = Phaser.Math.RND.pick(objectVariations);
    let object = this.physics.add.sprite(
      Phaser.Math.Between(0, 800),
      0,
      objectKey
    );
    object.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    object.setScale(0.5); // Mengatur ukuran objek
    object.setVelocityY(objectFallSpeed);
    objects.push(object); // Menambahkan objek ke array

    // Collider untuk objek baru
    this.physics.add.collider(player, object, catchObject, null, this);
  }

  function createBomb() {
    // Memilih gambar bom secara acak dari variasi
    const bombKey = Phaser.Math.RND.pick(bombVariations);
    let bomb = this.physics.add.sprite(Phaser.Math.Between(0, 800), 0, bombKey);
    bomb.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    bomb.setScale(0.5); // Mengatur ukuran bom
    bomb.setVelocityY(objectFallSpeed);
    bombs.push(bomb); // Menambahkan bom ke array

    // Collider untuk bom
    this.physics.add.collider(player, bomb, hitBomb, null, this);
  }

  function update() {
    // Reset objects when they go out of screen
    objects.forEach((object, index) => {
      if (object.y > 600) {
        resetObject(object, index);
      }
    });

    bombs.forEach((bomb, index) => {
      if (bomb.y > 600) {
        resetBomb(bomb, index);
      }
    });
  }

  // Function called when player catches an object
  function catchObject(player, objectCaught) {
    objectCaught.setY(0); // Reset object's position
    resetObject(objectCaught);
    score += 10; // Increase score
    scoreText.setText("Score: " + score);
  }

  // Function called when player hits a bomb
  function hitBomb(player, bomb) {
    lives--; // Kurangi nyawa
    livesText.setText("Lives: " + lives); // Update tampilan nyawa
    resetBomb(bomb);
    if (lives <= 0) {
      alert("Game Over! Your score: " + score);
      game.destroy(true); // Menghentikan game
    }
  }

  function resetObject(object) {
    object.setY(0);
    object.setX(Phaser.Math.Between(0, 800));
    object.setVelocityY(objectFallSpeed);
  }

  function resetBomb(bomb) {
    bomb.setY(0);
    bomb.setX(Phaser.Math.Between(0, 800));
    bomb.setVelocityY(objectFallSpeed);
  }
});
