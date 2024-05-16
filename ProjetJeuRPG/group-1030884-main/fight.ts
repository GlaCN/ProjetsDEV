import { RandomCharacter } from './Character'

export function damagePlayer(player : RandomCharacter, monster : RandomCharacter){
    player.hp = player.hp - monster.str;
    if(player.hp < 0){
        player.hp = 0;
    }
}

export function damageMonster(monster : RandomCharacter, player : RandomCharacter){
    monster.hp = monster.hp - player.str;
    if(monster.hp < 0){
        monster.hp = 0;
    }
}

export function healPlayer(player : RandomCharacter, player_hp_max){
    player.hp = player.hp + player_hp_max/2;
    if(player.hp > player_hp_max){
        player.hp = player_hp_max;
    }
}


