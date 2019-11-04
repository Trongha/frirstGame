/**
 * Created by Trong on 10/24/2019.
 */


var MW = MW || {}; //Neu MW co roi thi dung MW ko thi tao moi


MW.KEYS = [];

MW.CONTAINER = {
    ENEMIES:[],
    ENEMY_BULLETS:[],
    PLAYER_BULLETS:[],
    EXPLOSIONS:[],
    HITS:[]

};

MW.BULLET_TYPE = {
    PLAYER:1,
    ENEMY:2
};

MW.BULLET_SPEED = {
    ENEMY: -200,
    SHIP: 900
};
MW.SHIPID = {
    PLAYER1: 'PLAYER1',
    ENEMY1: 'ENEMY1'
}

MW.SHIPCONFIG = {
    PLAYER1:{
        ISPLAYER:true,
        IMG: res.player1_1,
        IMG_BULLET: res.dan1_1,
        SPEED_BULLET: MW.BULLET_SPEED.SHIP
    },
    ENEMY1:{
        ISPLAYER:false,
        IMG: res.enemy1,
        IMG_BULLET: res.dan2_1,
        SPEED_BULLET: MW.BULLET_SPEED.ENEMY
    }
}

