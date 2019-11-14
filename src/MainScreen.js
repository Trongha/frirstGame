/**
 * Created by CPU60135_LOCAL on 11/5/2019.
 */

var MainScreen = cc.Layer.extend({
    plane:null,
    ctor:function(isNewGame){
        this._super();
        //this.setBackground();
        Background.initGameBackground(res.map_green, this);
        this.addButtonPlay(isNewGame);

        isNewGame ? this.loadScores() : this.syncScore();

        if (!isNewGame){
            this.showUserScore();
        }
        this.showScores(isNewGame);

        this.addPlane();

        this.schedule(this.movePlane, 1);

    },

    addButtonPlay:function(isNewGame){
        var labelString = "Play Again";

        if (isNewGame){
            labelString = "New Game";
        }

        var label = new cc.LabelTTF(labelString, "Arial", 40);

        var menuItem = new cc.MenuItemLabel(label, this.onPlayAgains, this);

        menuItem.attr({
            scale:1.5
        });

        var menu = new cc.Menu(menuItem);

        menu.attr({
            anchorX : 0.5,
            x: windowSize.width/2,
            y:2* windowSize.height/3,
        });

        this.addChild(menu);
    },

    loadScores:function(){
        var scores = cc.sys.localStorage.getItem(MW.KEY_SAVE_SCORES);
        if (scores != null){
            scores = JSON.parse(scores);
        }
        MW.CONTAINER.SCORES = scores;
        return scores;
    },

    syncScore:function(){
        var scores = this.loadScores();
        var newScore = MW.SCORE;
        var i=scores.length;
        while (scores[i-1] < newScore){
            scores[i] = scores[--i];
        }
        scores[i] = newScore;
        cc.log(scores);
        MW.CONTAINER.SCORES = scores.slice(0,10);
        cc.sys.localStorage.setItem(MW.KEY_SAVE_SCORES, JSON.stringify(MW.CONTAINER.SCORES));
    },

    showUserScore:function(){
        userScore = new cc.LabelTTF("Your score: " + MW.SCORE);
        userScore.attr({
            anchorX:0.5,
            x: windowSize.width/2,
            y: windowSize.height/4*3,
            fontSize:26,
            scale:2.5
        });
        this.addChild(userScore);
    },

    showScores:function(){


        title = new cc.LabelTTF("Top 10");

        title.attr({
            anchorX:0.5,
            x:windowSize.width/3,
            y:windowSize.height/2,
            fontSize:25,
            scale:2.5
        });

        this.addChild(title);
        var x0 = windowSize.width/3;
        var y0 = title.y - title.height;

        var height = 45;

        for (var i=0 ; i<10 ; i++){

            var score = new cc.LabelTTF(MW.CONTAINER.SCORES[i]);

            score.attr({
                anchorX:0.5,
                fontSize: 40 - i*3,
                x: x0,
                y: y0 - (i+1.5)*(height - i*1.5),

            });

            this.addChild(score);
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

    addPlane: function () {
        /*x0 = 420;
        x1 = 510;
        y0 = 300;
        y1 = 450;

        bcg = new cc.LayerColor(new cc.Color(255, 100, 100), x1-x0, y1-y0);*/
        this.plane = new cc.Sprite(res.player2_1);
        this.plane.attr({
            anchorX:0.5,
            anchorY:0.7,
            x:2*windowSize.width/3,
            y: windowSize.height/3,
            scale:1.5
        });
        /*bcg.attr({
            x:x0,
            y: y0
        });*/

        //this.addChild(bcg);
        this.addChild(this.plane);
    },

    movePlane:function(){
        x0 = 400;
        x1 = 510;
        y0 = 320;
        y1 = 420;
        var x = x0 + cc.random0To1()*(x1 - x0);
        var y = y0 + cc.random0To1()*(y1 - y0);

        var p = new cc.p(x, y);

        var action = cc.moveTo(1.2, cc.p(x, y));

        this.plane.runAction(action);
    },

})

