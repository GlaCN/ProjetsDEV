import { RandomCharacter } from "./Character";
import { readFileSync } from 'fs';

export function read_character(path: string) {
    const fileContent: string = readFileSync(path, 'utf-8');
    const characters: RandomCharacter[] = JSON.parse(fileContent);
    return characters;
}


export function randomFunction(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export function characters(path){
    const randomCharacter : RandomCharacter[] = read_character(path);
    const randomIndex : number = randomFunction(0,randomCharacter.length -1);
    const character : RandomCharacter = randomCharacter[randomIndex];
    return character;
}

