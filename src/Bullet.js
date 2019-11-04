/**
 * Created by Trong on 10/28/2019.
 */
var Bullet = cc.Sprite.extend({

    xVelocity:0,
    yVelocity:0,

    bulletConfig:null,

    ctor:function(_x, _y, shipID){
        this._super();

        this.bulletConfig = MW.SHIPCONFIG[shipID];
        this.init(_x, _y);

        this.scheduleUpdate();
    },
    init: function (_x, _y) {
        this.setTexture(this.bulletConfig.IMG_BULLET);
        this.anchorX= 0.5;
        this.anchorY= 0;
        this.yVelocity = this.bulletConfig.SPEED_BULLET;
        this.x = _x;
        this.y = _y;

        sharedGameLayer.addChild(this);

        if (this.bulletConfig.ISPLAYER){
            MW.CONTAINER.PLAYER_BULLETS.push(this);
        }else{
            MW.CONTAINER.ENEMY_BULLETS.push(this);
        }
    },
    update: function (dt) {
        //var x = this.x, y = this.y;

        this.x += this.xVelocity*dt;
        this.y += this.yVelocity*dt;

        if (this.x < 0 || this.x > windowSize.width || this.y<0 || this.y>windowSize.height-60){
            this.destroy();
        }
    },
    destroy: function(){
        this.visible = false;
        //this.active = false;
    }

});
/*Bullet.create(_x, _y, speed, arr){

}*/
Bullet.createOrGetBulletPlayer = function(_x, _y, shipID){

    /*var s = "";
    for (var j=0 ; j<MW.CONTAINER.ENEMY_BULLETS.length ; j++){

        s+= MW.CONTAINER.ENEMY_BULLETS[j].visible + " ";
    }
    cc.log("bullet arr ", s);*/

    var arrBullet = null;
    if (MW.SHIPCONFIG[shipID].ISPLAYER){
        arrBullet = MW.CONTAINER.PLAYER_BULLETS;

    }else{
        arrBullet = MW.CONTAINER.ENEMY_BULLETS;
    }
    for (var j=0 ; j<arrBullet.length ; j++){
        var bullet = arrBullet[j];

        if (bullet.visible == false){
            bullet.x = _x;
            bullet.y = _y;
            bullet.visible = true;
            return bullet;
        }
    }
    return new Bullet(_x, _y, shipID);
}