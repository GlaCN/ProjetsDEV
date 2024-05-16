import { RandomCharacter } from './Character';
import { player_choice } from './interaction';
import { start } from './interaction';
import { state } from './interaction';
import { damagePlayer } from './fight';
import { damageMonster } from './fight';
import { healPlayer } from './fight';
import { characters } from './random';


const player: RandomCharacter = characters('players.json');
const player_hp_max = player.hp;

let monster: RandomCharacter = characters('enemies.json');
let monster_hp_max = monster.hp;

const boss: RandomCharacter = characters('bosses.json');
const boss_hp_max = boss.hp;

start(player, monster);


let player_level: number = 1;

state(player_level, player_hp_max, monster_hp_max, player, monster);

while(player_level < 9 && player.hp > 0) {

    while(player.hp > 0 && monster.hp > 0) {

        const command = player_choice();
        if (command === 3) {
             continue
        }

        if (command === 1) {
            damageMonster(monster, player);
        }
        else if (command === 2) {
            healPlayer(player, player_hp_max);
        }
        if (monster.hp > 0) {
            console.log("\nIt's the monster's turn. You suffer an attack of " + monster.str + " hp.");
            damagePlayer(player, monster);
            state(player_level, player_hp_max, monster_hp_max, player, monster);
        }
    }
    if (player.hp === 0) {
        console.log("You lose.");
        break;
    }
    if (monster.hp === 0) {
            console.log("The monster is KO. You win the level " + player_level + ".");
            player_level += 1;
            monster.hp = monster_hp_max;
            monster = characters('enemies.json');
            monster_hp_max = monster.hp;
            state(player_level, player_hp_max, monster_hp_max, player, monster);
    }
}



console.log("You enter the last level of the tower.\n");
console.log("The final Boss is " + boss.name + "!!!");


while (player.hp > 0 && boss.hp > 0) {

    console.log("\n-----Level " + player_level + "-------");
    console.log(player.name + "\n" + "HP : " + player.hp + "/" + player_hp_max + "\n" + "  Strength : " + player.str + "\n");
    console.log(boss.name + "\n" + "HP : " + boss.hp + "/" + boss_hp_max + "\n" + "  Strength : " + boss.str + "\n");
    console.log("Choices : \n① : Attack, ② : Heal\n");

    const command = player_choice();

    if (command === 1) {
        damageMonster(boss, player);
    }
    else if (command === 2) {
        healPlayer(player, player_hp_max);
    }
    if (boss.hp > 0) {
        console.log("\nIt's " + boss.name + "'s turn. You suffer an attack of " + boss.str + " hp.");
        damagePlayer(player, boss);
    }

if (player.hp === 0) {
    console.log("You lose.");

} else if (boss.hp === 0) {
    console.log("------- You defeated " + boss.name + " !!!\nCongratulations ! The Princess Zelda is saved.");
}
}





