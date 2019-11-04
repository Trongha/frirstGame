

/**
 * Created by Trong on 10/24/2019.
 */

windowSize = cc.director.getWinSize();

var sharedGameLayer = null;

var GameLayer = cc.Layer.extend({

    MAX_DISTANCE_BULLET :{
        WIDTH: 67.5,
        HEIGHT: 66
    },
    MAX_DISTANCE_SHIP :{
        WIDTH: 127,
        HEIGHT: 122
    },

    ctor:function(){
        this._super();
        sharedGameLayer = this;
        this.init();


        this.scheduleUpdate();
    },
    init:function(){
        MW.CONTAINER.ENEMIES = [];
        MW.CONTAINER.PLAYER_BULLETS = [];
        this.addBackground();
        this.addShip();
        this.addKeyboardListener();
        this.addTouchListener();
        this.addEnemy();
    },
    addBackground:function(){
        backgroundImg = new cc.Sprite(res.map_green);

        backgroundImg.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x: windowSize.width/2,
            y: windowSize.height/2
        })

        this.addChild(backgroundImg);
    },

    update:function(){
        this.checkCollide();
    },

    addShip:function(){
        this._ship = new Ship();

        this.addChild(this._ship);
        this._ship.scheduleUpdate();

        cc.log("height Player", this._ship.height);
        cc.log("width Player", this._ship.width);
    },

    addEnemy:function(){
        var x, y = windowSize.height;

        var ID = "ENEMY", num = null;

        for (var i=0 ; i<10 ; i++){

            x = cc.random0To1()*windowSize.width;
            num = Math.round(cc.random0To1()*100) % 4;

            cc.log('ID', ID + num);

            _en = new Enemy(x, y, MW.SHIPID[ID + num]);
        }
        //this.addChild(this._En);

    },

    checkCollide:function(){

        var dan = null, ship = null;

        /*var s = "";
        for (var j=0 ; j<MW.CONTAINER.PLAYER_BULLETS.length ; j++){
            s+= MW.CONTAINER.PLAYER_BULLETS[j].visible + " ";
        }
        cc.log("bullet arr ", s);*/

       /* var s = '', s1 = '';

        for (var i=0 ; i < MW.CONTAINER.ENEMIES.length ; i++){
            s += MW.CONTAINER.ENEMIES[i].visible + " ";
            s1 += MW.CONTAINER.ENEMIES[i].enemyConfig.HP + "    ";
        }
        cc.log(s);
        //cc.log(s1);*/

        for (var j=0 ; j<MW.CONTAINER.ENEMIES.length ; j++){
            enemy = MW.CONTAINER.ENEMIES[j];

            if (enemy.visible == true){
                for (var i = 0; i < MW.CONTAINER.PLAYER_BULLETS.length; i++) {
                    dan = MW.CONTAINER.PLAYER_BULLETS[i];

                    if (dan.visible == true) {
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
            if (dan.visible == true){
                //cc.log(dan.x);
                if (this.collide(dan, this._ship)) {
                    //cc.log("hit");
                    dan.visible = false;
                }
            }
        }


    },

    collide:function(a,b){
        if (Math.abs(a.x - b.x) < this.MAX_DISTANCE_BULLET.WIDTH && Math.abs(a.y - b.y) < this.MAX_DISTANCE_BULLET.HEIGHT){
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
                self._ship.x += moved.x;
                self._ship.y += moved.y;
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
})
