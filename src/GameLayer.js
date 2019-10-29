

/**
 * Created by Trong on 10/24/2019.
 */

windowSize = cc.director.getWinSize();

var GameLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        this.addBackground();
        this.addShip();
        this.addKeyboardListener();
        this.addTouchListener();

        this.initBullet();
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

    addShip:function(){
        this._ship = new Ship();

        this.addChild(this._ship);
    },

    initBullet:function(){
        var bl = new Bullet();

        this.addChild(bl);
        bl.scheduleUpdate();
    },
    addTouchListener:function(){
        //Add code here
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesMoved: function (touches, event) {
                cc.log("touch moved!", touches[0].getDelta().x, touches[0].getDelta().y);
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
                cc.log(key);
                MW.KEYS[key] = true;
                self._ship.updateMove(0.1);
                cc.log(self._ship.x)
            },
            onKeyReleased: function(key, event){
                MW.KEYS[key] = false;
            }
        }, this)

    },
})
