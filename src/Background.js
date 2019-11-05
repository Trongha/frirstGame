/**
 * Created by CPU60135_LOCAL on 11/5/2019.
 */

var Background = cc.Sprite.extend({

     speed:-500,

     path : null,
    ctor:function(_x, _y, img_path){
        this._super(img_path);

        //this.path = img_path;
        this.anchorX = 0.5;
        this.anchorY = 0;
        this.x= _x;
        this.y= _y;
        //this.tag = 3000;
        this.scheduleUpdate();

        cc.log(this.getContentSize().height);
    },
    update:function(dt){
        this.y += this.speed*dt;

        if (this.y <= -this.getContentSize().height){
            this.y += 2 *this.getContentSize().height;
        }

    },

})
Background.initGameBackground = function(img_path){
    var bcg;
    for (var i=0 ; i<2 ; i++){
        bcg = new Background(windowSize.width/2,i*windowSize.height, img_path)
        MW.CONTAINER.BACKGROUND.push(bcg);
        sharedGameLayer.addChild(bcg);
    }
}
