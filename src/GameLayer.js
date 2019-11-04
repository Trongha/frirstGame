

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
        this.addBackground();
        this.addShip();
        this.addKeyboardListener();
        this.addTouchListener();
        this.addEnEmy();
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
    addEnEmy:function(){
        var x, y;
        for (var i=0 ; i<10 ; i++){

            x = cc.random0To1()*windowSize.width;
            y = 600+cc.random0To1()*300
            cc.log('x: ',x );
            this._En = new Enemy(x, y, MW.SHIPID.ENEMY1);
        }
        //this.addChild(this._En);

    },

    checkCollide:function(){

        var dan = null, ship = null;

        var s = "";
        for (var j=0 ; j<MW.CONTAINER.ENEMY_BULLETS.length ; j++){
            s+= MW.CONTAINER.ENEMY_BULLETS[j].visible + " ";
        }
        cc.log("bullet arr ", s);

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
        for (var j=0 ; j<MW.CONTAINER.PLAYER_BULLETS.length ; j++){
            dan = MW.CONTAINER.PLAYER_BULLETS[j];
            if (dan.visible == true){
                //cc.log(dan.x);
                if (this.collide(dan, this._En)) {
                    //cc.log("hit");
                    dan.visible = false;
                }
            }
        }

    },

    collide:function(a,b){
        //cc.log("check");
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
