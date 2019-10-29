/**
 * Created by Trong on 10/24/2019.
 */

var Ship = cc.Sprite.extend({

    speed : 220,

    ctor:function(){
        //windowSize : cc.director.getWinSize();
        this._super(res.player1_1);
        //this.setDisplayFrame(new cc.sqriteFrameCache.getSpriteFrame(res.player1_1))
        this.anchorX= 0.5;
        this.anchorY= 0;
        this.x= windowSize.width/2;
        this.y= 0;
        /*this.attr({
            //tag: this.zOrder,

        })*/


    },

    updateMove:function(dt){
        if ((MW.KEYS[cc.KEY.w] || MW.KEYS[cc.KEY.up]) && this.y <= windowSize.height){
            this.y += dt * this.speed;
        }
        if ((MW.KEYS[cc.KEY.s] || MW.KEYS[cc.KEY.down]) && this.y >= 0) {
            this.y -= dt * this.speed;
        }
        if ((MW.KEYS[cc.KEY.a] || MW.KEYS[cc.KEY.left]) && this.x >= 0) {
            this.x -= dt * this.speed;
        }
        if ((MW.KEYS[cc.KEY.d] || MW.KEYS[cc.KEY.right]) && this.x <= windowSize.width) {
            this.x += dt * this.speed;
        }
    }





});