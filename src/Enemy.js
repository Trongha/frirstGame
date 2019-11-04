/**
 * Created by Trong on 10/29/2019.
 */

var Enemy = cc.Sprite.extend({

    speed: 220,

    enemyConfig:null,

    ctor:function(_x, _y, enemyID){
        this._super();
        this.enemyConfig = MW.SHIPCONFIG[enemyID];

        this.initAndAddChild(_x, _y);
        this.schedule(this.shoot, 1/2);
    },
    initAndAddChild:function(_x, _y){

        this.setTexture(this.enemyConfig.IMG);
        this.anchorX= 0.5;
        this.anchorY= 0.5;
        this.x= _x;
        this.y= _y;

        sharedGameLayer.addChild(this);
        MW.CONTAINER.ENEMIES.push(this);

    },
    shoot:function(){
        var bll = Bullet.createOrGetBulletPlayer(this.x-45, this.y-30, MW.SHIPID.ENEMY1);
        var blr = Bullet.createOrGetBulletPlayer(this.x+45, this.y-30, MW.SHIPID.ENEMY1);

    },

})