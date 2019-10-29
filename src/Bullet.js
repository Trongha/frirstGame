/**
 * Created by Trong on 10/28/2019.
 */
var Bullet = cc.Sprite.extend({

    xVelocity:0,
    yVelocity:200,

    ctor:function(){

        this._super(res.dan1_1);
        this.anchorX= 0.5;
        this.anchorY= 0;
        this.x= windowSize.width/3;

        this.y= 0;
    },
    update: function (dt) {
        var x = this.x, y = this.y;

        this.x = x + this.xVelocity*dt;
        this.y = y + this.yVelocity*dt;
    }

})