import { RandomCharacter } from "./Character";

const readline = require('readline-sync');

export function start(player : RandomCharacter, monster : RandomCharacter) {
    console.log("\nHey player ! Welcome to the Hyrule Castle Game.\nFrom now on, you are... " + player.name +" !!!\nYou have to save the Princess Zelda!\nShe is in the last stage of the ten level tower.\nBe realy careful, the tower is not empty...\nEnjoy your adventure.\n");
    console.log("\n♖ You enter the first level of the tower.♖\n  You meet a monster, a " + monster.name + ".\n");
}

export function state(player_level, player_hp_max, monster_hp_max, player, monster) {

    console.log("\n⁑⁑⁑⁑⁑⁑⁑ ⁑⁑⁑⁑⁑⁑⁑ Level " + player_level + " ⁑⁑⁑⁑⁑⁑⁑ ⁑⁑⁑⁑⁑⁑⁑\n");
    
    let lifePlayer1 : number = player_hp_max - (1/3*player_hp_max);
    let lifePlayer2 : number = player_hp_max - (2/3*player_hp_max);

    console.log(player.name + "\n");
    if(player.hp > lifePlayer1){
        console.log("⚡ HP : " + " 💚💚💚 " + player.hp + "/" + player_hp_max + "\n" + "⚔️" + "  Strength : " + player.str + "\n");
    } else if(lifePlayer2 <= player.hp && player.hp <= lifePlayer1){
        console.log("⚡ HP : " + " 💚💚🖤 " + player.hp + "/" + player_hp_max + "\n" + "⚔️" + "  Strength : " + player.str + "\n");
    } else if(player.hp < lifePlayer2){
        console.log("⚡ HP : " + " 💚🖤🖤 " + player.hp + "/" + player_hp_max + "\n" + "⚔️" + "  Strength : " + player.str + "\n");
    }

    let lifeMonster1 : number = monster_hp_max - (1/3*monster_hp_max);
    let lifeMonster2 : number = monster_hp_max - (2/3*monster_hp_max);

    console.log(monster.name + "\n");
    if(monster.hp > lifeMonster1){
        console.log("⚡ HP : " + " 💛💛💛 " + monster.hp + "/" + monster_hp_max + "\n" + "⚔️" + "  Strength : " + monster.str + "\n");
    } else if(lifeMonster2 <= monster.hp && monster.hp <= lifeMonster1){
        console.log("⚡ HP : " + " 💛💛🖤 " + monster.hp + "/" + monster_hp_max + "\n" + "⚔️" + "  Strength : " + monster.str + "\n");
    } else if(monster.hp < lifeMonster2){
        console.log("⚡ HP : " + " 💛🖤🖤 " + monster.hp + "/" + monster_hp_max + "\n" + "⚔️" + "  Strength : " + monster.str + "\n");
    }

    console.log("»»————-Choices————-««\n① : Attack  ② : Heal\n");
}

export function state2(player_level, player_hp_max, boss_hp_max, player, boss) {
    console.log("\n⁑⁑⁑⁑⁑⁑⁑ ⁑⁑⁑⁑⁑⁑⁑ Level " + player_level + " ⁑⁑⁑⁑⁑⁑⁑ ⁑⁑⁑⁑⁑⁑⁑\n");
    console.log("\n⁑⁑⁑⁑⁑⁑⁑ ♕  BOSS : " + boss.name + " ♕  ⁑⁑⁑⁑⁑⁑⁑\n");
    
    let lifePlayer1 : number = player_hp_max - (1/3*player_hp_max);
    let lifePlayer2 : number = player_hp_max - (2/3*player_hp_max);

    console.log(player.name + "\n");
    if(player.hp > lifePlayer1){
        console.log("⚡ HP : " + " 💚💚💚 " + player.hp + "/" + player_hp_max + "\n" + "⚔️" + "  Strength : " + player.str + "\n");
    } else if(lifePlayer2 <= player.hp && player.hp <= lifePlayer1){
        console.log("⚡ HP : " + " 💚💚🖤 " + player.hp + "/" + player_hp_max + "\n" + "⚔️" + "  Strength : " + player.str + "\n");
    } else if(player.hp < lifePlayer2){
        console.log("⚡ HP : " + " 💚🖤🖤 " + player.hp + "/" + player_hp_max + "\n" + "⚔️" + "  Strength : " + player.str + "\n");
    }

    let lifeBoss1 : number = boss_hp_max - (1/3*boss_hp_max);1
    let lifeBoss2 : number = boss_hp_max - (2/3*boss_hp_max);

    console.log(boss.name + "\n");
    if(boss.hp > lifeBoss1){
        console.log("⚡ HP : " + " 🧡🧡🧡 " + boss.hp + "/" + boss_hp_max + "\n" + "⚔️" + "  Strength : " + boss.str + "\n");
    } else if(lifeBoss2 <= boss.hp && boss.hp <= lifeBoss1){
        console.log("⚡ HP : " + " 🧡🧡🖤 " + boss.hp + "/" + boss_hp_max + "\n" + "⚔️" + "  Strength : " + boss.str + "\n");
    } else if(boss.hp < lifeBoss2){
        console.log("⚡ HP : " + " 🧡🖤🖤 " + boss.hp + "/" + boss_hp_max + "\n" + "⚔️" + "  Strength : " + boss.str + "\n");
    }
    console.log("»»————-Choices————-««\n① : Attack  ② : Heal\n");
}

export function player_choice() {
    const question = {
        question : "What do you want to do ?\nWrite 1 if you want to attack the monster, or 2 if you want to heal your character.",
        answer1 : "1",
        answer2 : "2"
    }
    const answer = readline.question(`${question.question}\n`);
    let command = 0;
    if(answer === question.answer1) {
    console.log(`\n-------\n⚔️  You choose to fight.⚔️\n-------`);
    command = 1;
    } 
    else if(answer === question.answer2) {
    console.log(`\n-------\n✨ You choose to heal yourself. ✨\n-------`);
    command = 2;
    } 
    else {
    console.log(`\n-------\nIt's not correct. You have to write 1 or 2.\n-------`);
    command = 3;
    }
    return command;
}


