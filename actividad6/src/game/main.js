import { MainMenu } from './scenes/MainMenu';
import { GameMap1_1P } from './scenes/GameMap1_1P';
import { GameMap1_2P } from './scenes/GameMap1_2P';
import { GameMap2_2P } from './scenes/GameMap2_2P';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import { GameMap2_1P } from './scenes/GameMap2_1P';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        Preloader,
        MainMenu,
        GameMap1_1P,
        GameMap1_2P,
        GameMap2_1P,
        GameMap2_2P
    ]
};

const StartGame = (parent) => {
    return new Phaser.Game({ ...config, parent });
}

export default StartGame;
