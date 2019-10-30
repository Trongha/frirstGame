/**
 * Created by Trong on 10/29/2019.
 */

var Enemy = cc.Sprite.extend({

    speed: 220,

    ctor:function(){
        this._super(res.enemy1);
        this.anchorX= 0.5;
        this.anchorY= 0.5;
        this.x= windowSize.width/2;
        this.y= 600;

        this.schedule(this.shoot, 1/2);
    },
    shoot:function(){
        var bll = Bullet.createOrGetBulletPlayer(this.x-45, this.y-30, MW.SHIPID.ENEMY1);
        var blr = Bullet.createOrGetBulletPlayer(this.x+45, this.y-30, MW.SHIPID.ENEMY1);

    },

})