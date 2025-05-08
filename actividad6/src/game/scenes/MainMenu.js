import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
        this.numPlayers = 1;
        this.menuElements = [];
    }

    create() {
        this.menuElements = [];

        this.menuElements.push(this.add.image(512, 384, 'background1'));

        this.menuElements.push(this.add.text(512, 80, 'Controles:', {
            fontFamily: 'Arial Black', fontSize: 36, color: '#ffff00',
            stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setOrigin(0.5));

        this.menuElements.push(this.add.text(512, 170,
            'Jugador 1: W A S D para moverse, ESPACIO para disparar\n' +
            'Jugador 2: Flechas para moverse, P para disparar\n\n' +
            'Evita a los zombies. Si te tocan, pierdes.\n' +
            'Presiona ESC para volver al menú en cualquier momento.\n' +
            'RECOMENDADO USAR LA PANTALLA COMPLETA.',
            {
                fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
                align: 'center', wordWrap: { width: 700 }
            }
        ).setOrigin(0.5));

        this.menuElements.push(this.add.text(512, 290, 'Elige número de jugadores:', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5));

        // Botón 1 jugador
        const btn1 = this.add.text(512, 360, '1 Jugador', { fontSize: 32, color: '#fff', backgroundColor: '#333' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true, allowFocus: false }) // <-- agrega allowFocus: false
            .on('pointerdown', () => {
                this.numPlayers = 1;
                this.showMapMenu();
            });
        this.menuElements.push(btn1);

        // Botón 2 jugadores
        const btn2 = this.add.text(512, 420, '2 Jugadores', { fontSize: 32, color: '#fff', backgroundColor: '#333' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true, allowFocus: false }) // <-- agrega allowFocus: false
            .on('pointerdown', () => {
                this.numPlayers = 2;
                this.showMapMenu();
            });
        this.menuElements.push(btn2);

        EventBus.emit('current-scene-ready', this);

        // Quita el foco del canvas para evitar el indicador verde
        if (this.sys.game.canvas) {
            this.sys.game.canvas.blur();
        }
    }

    showMapMenu() {
        // Elimina los elementos del menú anterior
        if (this.menuElements) {
            this.menuElements.forEach(el => el.destroy());
            this.menuElements = [];
        }

        this.menuElements.push(this.add.image(512, 384, 'background1'));

        this.menuElements.push(this.add.text(512, 200, 'Elige un mapa:', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5));

        // Mapa 1
        const map1 = this.add.text(512, 250, 'Mapa 1', { fontSize: 28, color: '#fff', backgroundColor: '#333' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true, allowFocus: false }) // <-- aquí
            .on('pointerdown', () => {
                if (this.numPlayers === 1) {
                    EventBus.emit('players-selected', 1);
                    this.scene.start('GameMap1_1P', { numPlayers: 1 });
                } else {
                    EventBus.emit('players-selected', 2);
                    this.scene.start('GameMap1_2P', { numPlayers: 2 });
                }
            });
        this.menuElements.push(map1);

        // Mapa 2
        const map2 = this.add.text(512, 300, 'Mapa 2', { fontSize: 28, color: '#fff', backgroundColor: '#333' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true, allowFocus: false }) // <-- aquí
            .on('pointerdown', () => {
                if (this.numPlayers === 1) {
                    this.scene.start('GameMap2_1P');
                } else {
                    this.scene.start('GameMap2_2P');
                }
            });
        this.menuElements.push(map2);
    }
}
