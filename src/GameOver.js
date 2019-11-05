/**
 * Created by CPU60135_LOCAL on 11/5/2019.
 */

var GameOver = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.setBackground();

        cc.log(MW.CONTAINER.RANK);
        for (score in MW.CONTAINER.RANK){
            
        }

    },

    setBackground:function(){
        var bcg = new cc.Sprite(res.screen_blue);
        bcg.attr({
            anchorX: 0,
            anchorY: 0,
            x:0,
            y:0
        }),

        this.addChild(bcg);
    },
})

