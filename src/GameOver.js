/**
 * Created by CPU60135_LOCAL on 11/5/2019.
 */

var GameOver = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.setBackground();

        //playAgainBtn = cc.Sprite(res.playAgain);
        var label = new cc.LabelTTF("Play Again", "Arial", 24);
        var menuItem = new cc.MenuItemLabel(label, this.onPlayAgains, this);

        var menu = new cc.Menu(menuItem);

        menu.attr({
            x: 300,
            y: 300
        });

        this.addChild(menu);

        cc.log(MW.CONTAINER.RANK);
        for (score in MW.CONTAINER.RANK){

        }

    },

    onPlayAgains:function(sender){
        var sc = new cc.Scene();

        var newGame = new GameLayer();

        sc.addChild(newGame);

        cc.director.runScene(sc);
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

