import Phaser from 'phaser';

export class GameMap1_2P extends Phaser.Scene {
    constructor() {
        super('GameMap1_2P');
        this.lastDirection = 'down';
        this.lastDirection2 = 'down';
        this.zombiesKilled = 0;
        this.playerAlive = true;
        this.player2Alive = true;
        this.numPlayers = 2;
    }

    init(data) {
        this.numPlayers = data?.numPlayers || 2;
    }

    preload() {
        this.load.setPath('assets/personaje/Apocalypse Character Pack/Player');
        this.load.spritesheet('walk_down', 'abajo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('walk_up', 'arriba.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('walk_right', 'derecha.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('walk_left', 'izquierda.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('idle_down', 'IdleFrontal.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('shoot_down', 'shootFront.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('shoot_up', 'shootBack.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('shoot_right', 'shootRight.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('shoot_left', 'shootLeft.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('bullet_down', 'bulletFront.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('bullet_up', 'bulletBack.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('bullet_right', 'bulletRight.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('bullet_left', 'bulletLeft.png', { frameWidth: 32, frameHeight: 32 });

        this.load.setPath('assets/fondo/PNG/game_background_1');
        this.load.image('background1', 'game_background_1.png');

        this.load.setPath('assets/personaje/Apocalypse Character Pack/Zombie');
        this.load.spritesheet('zombie_walk', 'abajo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('zombie_death', 'Death.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        this.playerAlive = true;
        this.player2Alive = true;

        this.add.image(512, 384, 'background1').setOrigin(0.5, 0.5);

        // Animaciones jugador
        this.anims.create({ key: 'walk_down', frames: this.anims.generateFrameNumbers('walk_down', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'walk_up', frames: this.anims.generateFrameNumbers('walk_up', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'walk_right', frames: this.anims.generateFrameNumbers('walk_right', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'walk_left', frames: this.anims.generateFrameNumbers('walk_left', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'idle_down', frames: this.anims.generateFrameNumbers('idle_down', { start: 0, end: 1 }), frameRate: 2, repeat: -1 });
        this.anims.create({ key: 'shoot_down', frames: this.anims.generateFrameNumbers('shoot_down', { start: 0, end: 2 }), frameRate: 10, repeat: 0 });
        this.anims.create({ key: 'shoot_up', frames: this.anims.generateFrameNumbers('shoot_up', { start: 0, end: 2 }), frameRate: 10, repeat: 0 });
        this.anims.create({ key: 'shoot_right', frames: this.anims.generateFrameNumbers('shoot_right', { start: 0, end: 2 }), frameRate: 10, repeat: 0 });
        this.anims.create({ key: 'shoot_left', frames: this.anims.generateFrameNumbers('shoot_left', { start: 0, end: 2 }), frameRate: 10, repeat: 0 });
        this.anims.create({ key: 'bullet_down_anim', frames: this.anims.generateFrameNumbers('bullet_down', { start: 0, end: 3 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'bullet_up_anim', frames: this.anims.generateFrameNumbers('bullet_up', { start: 0, end: 3 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'bullet_right_anim', frames: this.anims.generateFrameNumbers('bullet_right', { start: 0, end: 3 }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'bullet_left_anim', frames: this.anims.generateFrameNumbers('bullet_left', { start: 0, end: 3 }), frameRate: 12, repeat: -1 });

        // Animaciones zombie
        this.anims.create({ key: 'zombie_walk', frames: this.anims.generateFrameNumbers('zombie_walk', { start: 0, end: 4 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'zombie_death', frames: this.anims.generateFrameNumbers('zombie_death', { start: 0, end: 4 }), frameRate: 8, repeat: 0 });

        // Jugadores
        this.player1 = this.physics.add.sprite(512, 600, 'idle_down', 0).play('idle_down');
        this.cursors1 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            shoot: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        this.player2 = this.physics.add.sprite(600, 600, 'idle_down', 0).play('idle_down');
        this.cursors2 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            shoot: Phaser.Input.Keyboard.KeyCodes.P
        });

        // Grupos
        this.bullets = this.physics.add.group();
        this.zombies = this.physics.add.group();

        // Spawn seguro para ambos jugadores
        function getSafeZombieSpawn(player1, player2, minDist = 64) {
            let zx, zy, dist1, dist2;
            do {
                zx = Phaser.Math.Between(100, 900);
                zy = Phaser.Math.Between(100, 700);
                dist1 = Phaser.Math.Distance.Between(player1.x, player1.y, zx, zy);
                dist2 = Phaser.Math.Distance.Between(player2.x, player2.y, zx, zy);
            } while (dist1 < minDist || dist2 < minDist);
            return { zx, zy };
        }

        // Crea zombies iniciales
        for (let i = 0; i < 5; i++) {
            const { zx, zy } = getSafeZombieSpawn(this.player1, this.player2);
            const zombie = this.zombies.create(zx, zy, 'zombie_walk');
            zombie.anims.play('zombie_walk', true);
            zombie.alive = true;
        }

        // Texto de zombies eliminados
        this.zombiesKilled = 0;
        this.zombiesKilledText = this.add.text(512, 80, 'Zombies eliminados: 0', {
            fontFamily: 'Arial Black',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5);

        // Colisión bala-zombie
        this.physics.add.overlap(this.bullets, this.zombies, (bullet, zombie) => {
            if (zombie.alive) {
                zombie.alive = false;
                zombie.anims.play('zombie_death', true);
                bullet.destroy();
                zombie.on('animationcomplete', () => {
                    zombie.destroy();
                    for (let i = 0; i < 2; i++) {
                        const { zx, zy } = getSafeZombieSpawn(this.player1, this.player2);
                        const newZombie = this.zombies.create(zx, zy, 'zombie_walk');
                        newZombie.anims.play('zombie_walk', true);
                        newZombie.alive = true;
                    }
                });
                this.zombiesKilled++;
                this.zombiesKilledText.setText('Zombies eliminados: ' + this.zombiesKilled);
            }
        });

        // Colisión zombie-jugador 1
        this.physics.add.overlap(this.player1, this.zombies, () => {
            if (!this.playerAlive) return;
            this.playerAlive = false;
            this.player1.setVisible(false);
            this.checkGameOver();
        }, null, this);

        // Colisión zombie-jugador 2
        this.physics.add.overlap(this.player2, this.zombies, () => {
            if (!this.player2Alive) return;
            this.player2Alive = false;
            this.player2.setVisible(false);
            this.checkGameOver();
        }, null, this);

        // ESC para volver al menú
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start('MainMenu');
        });
    }

    update() {
        // Jugador 1
        if (this.player1 && this.playerAlive) {
            this.handlePlayerMovement(this.player1, this.cursors1, 'player1');
            this.handlePlayerShoot(this.player1, this.cursors1, 'player1');
        }
        // Jugador 2
        if (this.player2 && this.player2Alive) {
            this.handlePlayerMovement(this.player2, this.cursors2, 'player2');
            this.handlePlayerShoot(this.player2, this.cursors2, 'player2');
        }
        // Zombies persiguen al jugador más cercano
        this.zombies.getChildren().forEach(zombie => {
            if (zombie.alive && (this.playerAlive || this.player2Alive)) {
                let target = null;
                let minDist = Infinity;
                if (this.playerAlive) {
                    const dist1 = Phaser.Math.Distance.Between(zombie.x, zombie.y, this.player1.x, this.player1.y);
                    if (dist1 < minDist) {
                        minDist = dist1;
                        target = this.player1;
                    }
                }
                if (this.player2Alive) {
                    const dist2 = Phaser.Math.Distance.Between(zombie.x, zombie.y, this.player2.x, this.player2.y);
                    if (dist2 < minDist) {
                        minDist = dist2;
                        target = this.player2;
                    }
                }
                if (target) {
                    this.physics.moveToObject(zombie, target, 60);
                    zombie.anims.play('zombie_walk', true);
                }
            } else {
                zombie.setVelocity(0, 0);
            }
        });
    }

    handlePlayerMovement(player, cursors, playerKey) {
        let vx = 0, vy = 0;
        let direction = playerKey === 'player2' ? this.lastDirection2 : this.lastDirection;

        if (cursors.left.isDown) {
            vx = -3;
            direction = 'left';
        }
        if (cursors.right.isDown) {
            vx = 3;
            direction = 'right';
        }
        if (cursors.up.isDown) {
            vy = -3;
            direction = 'up';
        }
        if (cursors.down.isDown) {
            vy = 3;
            direction = 'down';
        }
        if (vx !== 0 && vy !== 0) {
            vx *= Math.SQRT1_2;
            vy *= Math.SQRT1_2;
        }
        player.x += vx;
        player.y += vy;

        // Animaciones según dirección
        if (vx !== 0 || vy !== 0) {
            player.anims.play('walk_' + direction, true);
            if (playerKey === 'player2') this.lastDirection2 = direction;
            else this.lastDirection = direction;
        } else {
            player.anims.play('idle_down', true);
        }
    }

    handlePlayerShoot(player, cursors, playerKey) {
        if (Phaser.Input.Keyboard.JustDown(cursors.shoot)) {
            let direction = playerKey === 'player2' ? this.lastDirection2 : this.lastDirection || 'down';
            let bulletKey = 'bullet_' + direction;
            let animKey = 'bullet_' + direction + '_anim';

            let bullet = this.bullets.create(player.x, player.y, bulletKey);
            bullet.anims.play(animKey, true);

            let speed = 400;
            let velocity = { x: 0, y: 0 };
            if (direction === 'up') velocity.y = -speed;
            else if (direction === 'down') velocity.y = speed;
            else if (direction === 'left') velocity.x = -speed;
            else if (direction === 'right') velocity.x = speed;

            bullet.body.velocity.x = velocity.x;
            bullet.body.velocity.y = velocity.y;

            this.time.delayedCall(1000, () => {
                if (bullet && bullet.active) bullet.destroy();
            });
        }
    }

    checkGameOver() {
        if (!this.playerAlive && !this.player2Alive) {
            this.add.text(512, 384, '¡Has perdido!', {
                fontSize: '48px',
                fill: '#ff0000',
                fontFamily: 'Arial Black'
            }).setOrigin(0.5);

            this.zombies.getChildren().forEach(z => z.setVelocity(0, 0));

            this.time.delayedCall(2000, () => {
                this.scene.start('MainMenu');
            });
        }
    }
}