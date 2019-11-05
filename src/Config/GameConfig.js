/**
 * Created by Trong on 10/24/2019.
 */


var MW = MW || {}; //Neu MW co roi thi dung MW ko thi tao moi


MW.KEYS = [];

MW.SCORE = 0;

MW.CONTAINER = {
    ENEMIES:[],
    ENEMY_BULLETS:[],
    PLAYER_BULLETS:[],
    EXPLOSIONS:[],

    BACKGROUND:[]
};

MW.BULLET_TYPE = {
    PLAYER:1,
    ENEMY:2
};

MW.BULLET_SPEED = {
    ENEMY: -250,
    SHIP: 900
};
MW.SHIPID = {
    PLAYER1: 'PLAYER1',
    PLAYER2: 'PLAYER2',
    ENEMY0: 'ENEMY0',
    ENEMY1: 'ENEMY1',
    ENEMY2: 'ENEMY2',
    ENEMY3: 'ENEMY3'
};
MW.ENEMY = {


}

//enemy move type
MW.ENEMY_MOVE_TYPE = {
    DONTMOVE:0,
    VERTICAL:1,
    HORIZONTAL:2,
    ZICZAC:3
};

MW.SHIPCONFIG = {
    PLAYER1:{
        ISPLAYER:true,
        IMG: res.player1_1,
        IMG_BULLET: res.dan1_1,
        SPEED_BULLET: MW.BULLET_SPEED.SHIP,
        HP:5
    },
    ENEMY0:{
        ISPLAYER:false,
        IMG: res.enemy2,
        IMG_BULLET: res.dan2_1,
        SPEED_BULLET: MW.BULLET_SPEED.ENEMY,
        ATTACK_MODE: 0,
        SHOOT_DELAY: 0,
        MOVE_TYPE: MW.ENEMY_MOVE_TYPE.VERTICAL,
        HP:2,
        SCORE:5
    },
    ENEMY1:{
        ISPLAYER:false,
        IMG: res.enemy1,
        IMG_BULLET: res.dan2_1,
        SPEED_BULLET: MW.BULLET_SPEED.ENEMY,
        ATTACK_MODE: 0,
        SHOOT_DELAY: 0,
        MOVE_TYPE: MW.ENEMY_MOVE_TYPE.VERTICAL,
        HP:2,
        SCORE:2
    },
    ENEMY2:{
        ISPLAYER:false,
        IMG: res.enemy2,
        IMG_BULLET: res.dan2_1,
        SPEED_BULLET: MW.BULLET_SPEED.ENEMY,
        ATTACK_MODE: 1,
        SHOOT_DELAY: 1,
        MOVE_TYPE: MW.ENEMY_MOVE_TYPE.HORIZONTAL,
        HP:5,
        SCORE:10
    },
    ENEMY3:{
        ISPLAYER:false,
        IMG: res.enemy1,
        IMG_BULLET: res.dan2_1,
        SPEED_BULLET: MW.BULLET_SPEED.ENEMY,
        ATTACK_MODE: 1,
        SHOOT_DELAY: 2,
        MOVE_TYPE: MW.ENEMY_MOVE_TYPE.ZICZAC,
        HP:3,
        SCORE:5
    }
}

