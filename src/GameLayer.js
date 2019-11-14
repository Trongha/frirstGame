

/**
 * Created by Trong on 10/24/2019.
 */

windowSize = cc.director.getWinSize();

bcgConfig = {
    height:960,
    width:640
};

var scoreLabel = null;


//this.addChild(lblDemo);

var sharedGameLayer = null;

var GameLayer = cc.Layer.extend({

    MAX_DISTANCE_BULLET :{
        WIDTH: 67.5,
        HEIGHT: 66
    },
    MAX_DISTANCE_SHIP :{
        WIDTH: 120,
        HEIGHT: 115
    },
    MAX_DISTANCE_BUL_BUL :{
        WIDTH: 15,
        HEIGHT: 15
    },


    ctor:function(){
        this._super();
        sharedGameLayer = this;

        this.clear();

        this.init();
        this.scheduleUpdate();
        this.schedule(this.addEnemy, 2);
    },

    clear:function(){
        MW.SCORE = 0;

        for (var key in MW.CONTAINER){
            MW.CONTAINER[key] = [];
        }
    },

    init:function(){
        MW.CONTAINER.ENEMIES = [];
        MW.CONTAINER.PLAYER_BULLETS = [];

        Background.initGameBackground(res.map_green, this);

        this.addShip();
        this.addKeyboardListener();
        this.addTouchListener();
        this.addEnemy();
        this.addScore();
        this.addHPShip();
    },

    update:function(){
        this.checkCollide();
        //this.scrollBackground();
    },

    addShip:function(){
        this._ship = new Ship();

        this.addChild(this._ship);
        this._ship.scheduleUpdate();

    },

    addEnemy:function(){
        var x, y = windowSize.height;

        var enemyTypeID = Math.round(cc.random0To1()*100) % 4;

        for (var i=0 ; i<5 ; i++){
            x = cc.random0To1()*windowSize.width;

            _en = new Enemy(x, y, MW.SHIPID["ENEMY" + enemyTypeID]);
        }
        //this.addChild(this._En);

    },

    addScore:function(){
        this.scoreLabel = new cc.LabelTTF("Your Score:" + MW.SCORE,"Arial Bold",24);
        this.scoreLabel.x =this.scoreLabel.width/2 + 10;
        this.scoreLabel.y =windowSize.height - this.scoreLabel.height - 10;
        this.addChild(this.scoreLabel,10);
    },

    updateScore:function(){
        this.scoreLabel.setString("Your Score: " + MW.SCORE);
    },

    addHPShip:function(){
        this.heartLabel = new cc.LabelTTF(this._ship.HP + " Heart","Arial Bold",24);
        this.heartLabel.x = windowSize.width - this.heartLabel.width - 10;
        this.heartLabel.y = windowSize.height - this.heartLabel.height - 10;
        this.addChild(this.heartLabel,10);
    },

    updateHP:function(){
        this.heartLabel.setString(this._ship.HP + " Heart");
    },

    checkCollide:function(){

        var dan = null, ship = null, dan2 = null;

        for (var j=0 ; j<MW.CONTAINER.ENEMIES.length ; j++){
            enemy = MW.CONTAINER.ENEMIES[j];
            if (enemy.visible){
                if (this.collideShipEnemy(enemy, this._ship)){
                    this._ship.hurt();

                    enemy.destroy();
                }

                for (var i = 0; i < MW.CONTAINER.PLAYER_BULLETS.length; i++) {
                    dan = MW.CONTAINER.PLAYER_BULLETS[i];

                    if (dan.visible && enemy.visible) {
                        if (this.collide(dan, enemy)) {
                            dan.visible = false;
                            enemy.hurt();
                        }
                    }
                }
            }
        }

        for (var j=0 ; j<MW.CONTAINER.ENEMY_BULLETS.length ; j++){
            dan = MW.CONTAINER.ENEMY_BULLETS[j];
            if (dan.visible){
                if (this.collide(dan, this._ship)) {
                    dan.visible = false;
                    this._ship.hurt();
                }
            }
            for (var i=0 ; i<MW.CONTAINER.PLAYER_BULLETS.length ; i++){
                dan2 = MW.CONTAINER.PLAYER_BULLETS[i];
                if (dan2.visible && dan.visible){
                    if (this.collideBuletBulet(dan, dan2)){
                        dan.visible = false;
                        dan2.visible = false;
                    }
                }
            }
        }


    },

    collide:function(a,b){
        if (Math.abs(a.x - b.x) < this.MAX_DISTANCE_BULLET.WIDTH && Math.abs(a.y - b.y) < this.MAX_DISTANCE_BULLET.HEIGHT){
            return true;
        }
    },
    collideShipEnemy:function(a,b){
        if (Math.abs(a.x - b.x) < this.MAX_DISTANCE_SHIP.WIDTH && Math.abs(a.y - b.y) < this.MAX_DISTANCE_SHIP.HEIGHT){
            return true;
        }
    },
    collideBuletBulet:function(a,b){
        if (Math.abs(a.x - b.x) < this.MAX_DISTANCE_BUL_BUL.WIDTH && Math.abs(a.y - b.y) < this.MAX_DISTANCE_BUL_BUL.HEIGHT){
            return true;
        }
    },

    addTouchListener:function(){
        //Add code here
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesMoved: function (touches, event) {
                //cc.log("touch moved!", touches[0].getDelta().x, touches[0].getDelta().y);
                var moved = touches[0].getDelta();
                xNew = self._ship.x + moved.x;
                yNew = self._ship.y + moved.y;

                if (xNew >=0 && xNew <= windowSize.width){
                    self._ship.x += moved.x;
                }
                if (yNew >=0){
                    self._ship.y += moved.y;
                }
            }
        }, this);
    },

    addKeyboardListener:function(){
        //Add code here
        var self = this;

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,

            onKeyPressed: function(key, evetn){
                //cc.log(key);
                MW.KEYS[key] = true;
                self._ship.updateMove(0.1);
                //cc.log(self._ship.x)
            },
            onKeyReleased: function(key, event){
                MW.KEYS[key] = false;
            }
        }, this)

    },


    onGameOver:function(){

        this.unscheduleUpdate();

        //this.parent.addChild(new GameOver());
        this.getAndSyncScores();
        var scene = new cc.Scene();
        scene.addChild(new MainScreen(isNewGame = false));
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    getAndSyncScores:function(){
        /*var newScore = MW.SCORE;
        var scores = cc.sys.localStorage.getItem(MW.KEY_SAVE_SCORES);
        cc.log("run" + scores);
        if (scores != null){
            scores = JSON.parse(scores);
        }
        var i=scores.length;
        for ( ; scores[i-1] < newScore ; ){
            scores[i] = scores[--i];
        }
        scores[i] = newScore;
        cc.log(scores);

        //Đang lỗi chỗ get điểm, sắp xếp kiểu gì mà bị mất con cuối?

        //for (var i= ; )

        MW.CONTAINER.SCORES = scores.slice(0,4);*/
        //cc.sys.localStorage.setItem(MW.KEY_SAVE_SCORES, JSON.stringify(MW.CONTAINER.SCORES));
    }
})
