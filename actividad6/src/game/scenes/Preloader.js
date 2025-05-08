import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        // Carga el fondo del menú principal
        this.load.setPath('assets/fondo/PNG/game_background_1');
        this.load.image('background1', 'game_background_1.png');
        // Puedes cargar aquí otros recursos globales si los necesitas
    }

    create() {
        this.scene.start('MainMenu');
    }
}