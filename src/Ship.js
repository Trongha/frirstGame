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

        this.HP = MW.SHIPCONFIG.PLAYER1.HP;
        //this.HP = 5;

        this.schedule(this.shoot, 1/7);


    },

    update:function(dt){
        this.updateMove(dt);

        if (this.HP <= 0 ){
            this.destroy();
        }
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
    },

    hurt:function(){
        this.HP--;
        sharedGameLayer.updateHP();

        //cc.log("   hurt " + this.HP)
    },

    destroy:function(){

        this.unschedule(this.shoot);
        sharedGameLayer.unscheduleUpdate();

        a1 = cc.delayTime(1);
        this.opacity = 190;
        a2 = cc.moveBy(1, cc.p(0, -60));
        /*this.setOpacityModifyRGB(true);
        a2 = cc.FadeOut.create(10);*/
        //this.unscheduleAll();
        this.runAction(cc.sequence(a2, cc.callFunc(function() {
            /*this.stopAllActions();
             this.visible = false;*/
            this.parent.removeChild(this);


            sharedGameLayer.onGameOver();
        }.bind(this))));
    },

    shoot:function(){

        var bll = Bullet.createOrGetBulletPlayer(this.x-27, this.y+9, MW.SHIPID.PLAYER1);
        var blr = Bullet.createOrGetBulletPlayer(this.x+27, this.y+9, MW.SHIPID.PLAYER1);

    },





});