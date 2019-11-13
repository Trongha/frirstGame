/**
 * Created by Trong on 10/29/2019.
 */

var Enemy = cc.Sprite.extend({

    speed: 220,


    ctor:function(_x, _y, enemyID){
        this._super();
        //this.enemyConfig = MW.SHIPCONFIG[enemyID];
        this.enemyConfig = {
            ISPLAYER:MW.SHIPCONFIG[enemyID].ISPLAYER,
            IMG: MW.SHIPCONFIG[enemyID].IMG,
            IMG_BULLET: MW.SHIPCONFIG[enemyID].IMG_BULLET,
            SPEED_BULLET: MW.SHIPCONFIG[enemyID].SPEED_BULLET,
            ATTACK_MODE: MW.SHIPCONFIG[enemyID].ATTACK_MODE,
            SHOOT_DELAY: MW.SHIPCONFIG[enemyID].SHOOT_DELAY,
            MOVE_TYPE: MW.SHIPCONFIG[enemyID].MOVE_TYPE,
            HP:MW.SHIPCONFIG[enemyID].HP,
            SCORE:MW.SHIPCONFIG[enemyID].SCORE

        }

        this.initAndAddChild(_x, _y);
        this.move();
        if (this.enemyConfig.ATTACK_MODE != 0){
            this.schedule(this.shoot, this.enemyConfig.SHOOT_DELAY);
        }
        this.scheduleUpdate();
    },

    initAndAddChild:function(_x, _y){

        this.setTexture(this.enemyConfig.IMG);
        this.anchorX= 0.5;
        this.anchorY= 0.5;
        this.x= _x;
        this.y= _y;
        this.visible = true;

        sharedGameLayer.addChild(this);
        MW.CONTAINER.ENEMIES.push(this);

        /*var s = '';
        for (var i=0 ; i < MW.CONTAINER.ENEMIES.length ; i++){
            s += MW.CONTAINER.ENEMIES[i].visible + " ";
        }Z
        cc.log(s);*/
    },

    update:function(){

        if ((this.x < 0 || this.x > windowSize.width) && (this.y < 0 || this.y > windowSize.height)) {
            this.visible = false;
        }

        if (this.visible && this.enemyConfig.HP <= 0) {
            this.destroy();
        }
    },

    move:function(){
        var delay  = (cc.delayTime(0));

        var offset, myAction = null;
        var myRand1 = 2 + cc.random0To1()*10;
        var myRand2 = cc.random0To1()*100;

        //this.enemyConfig.MOVE_TYPE = MW.ENEMY_MOVE_TYPE.HORIZONTAL;

        switch (this.enemyConfig.MOVE_TYPE){

            case MW.ENEMY_MOVE_TYPE.VERTICAL:
                offset = cc.p(0,-windowSize.height-this.height);
                    myAction = cc.moveBy(7, offset);
                break;

            case MW.ENEMY_MOVE_TYPE.HORIZONTAL:
                offset = cc.p(0, -100 - 200 * Math.random());
                a0 = cc.moveBy(0.5, offset);
                a1 = cc.moveBy(1, cc.p(-50 - 100 * Math.random(), 0));

                var onComplete = cc.callFunc(function (pSender) {
                    //var a2 = cc.delayTime(1);
                    var a3 = cc.moveBy(2, cc.p(100 + 100 * Math.random(), 0));
                    pSender.runAction(cc.sequence(a3, a3.reverse()).repeatForever());
                }.bind(this) );

                myAction = cc.sequence(a0, a1, onComplete);
                break;

            case MW.ENEMY_MOVE_TYPE.ZICZAC:
                //Add code here
                offset = cc.p(0, 0);
                p1 = cc.p(windowSize.width - myRand1, windowSize.height/2 + myRand2);
                p2 = cc.p(myRand1, 3*windowSize.height/4 - myRand2);

                offset = cc.p(windowSize.width/2,-windowSize.height);

                var a0 = cc.moveTo(myRand1%5, p1);
                var a1 = cc.moveTo(myRand1%4, p2);
                var a3 = cc.moveBy(myRand1, offset);

                myAction = cc.sequence(a0, a1, a3);

                break;

        }

        if (myAction != null){
            this.runAction(cc.sequence(delay, myAction));
        }


    },

    destroy:function () {

        if (this.visible){
            MW.SCORE += this.enemyConfig.SCORE;
            sharedGameLayer.updateScore();
        }

        this.visible = false;

        this.stopAllActions();
        this.unschedule(this.shoot);

        //this.parent.removeChild(this);
        //cc.log("score: " + MW.SCORE);
    },

    hurt:function(){
        this.enemyConfig.HP--;
    },

    shoot:function(){
        var bl = Bullet.createOrGetBulletPlayer(this.x, this.y-30, MW.SHIPID.ENEMY1);
        //var blr = Bullet.createOrGetBulletPlayer(this.x+45, this.y-30, MW.SHIPID.ENEMY1);

    },

})