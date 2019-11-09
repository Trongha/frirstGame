/**
 * Created by CPU60135_LOCAL on 11/5/2019.
 */

var MainScreen = cc.Layer.extend({
    ctor:function(isNewGame){
        this._super();
        this.setBackground();
        this.addButtonPlay(isNewGame);
        this.showScores(isNewGame);

    },

    addButtonPlay:function(isNewGame){
        var labelString = "Play Again";

        if (isNewGame){
            labelString = "New Game";
        }

        var label = new cc.LabelTTF(labelString, "Arial", 40);

        var menuItem = new cc.MenuItemLabel(label, this.onPlayAgains, this);

        var menu = new cc.Menu(menuItem);

        menu.attr({
            anchorX : 0.5,
            x: windowSize.width/2,
            y: windowSize.height/3*2
        });

        this.addChild(menu);
    },

    showScores:function(){
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

