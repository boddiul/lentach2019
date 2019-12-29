States = {};
var speed = 150;
var minDuration = 0.3;
var maxDuration = 0.8;
var minColdown = 0.3;
var maxColdown = 1.5;
var PoopChance = 50;

var GameTime = 60;

var Text;
var ebalo;
var statusBar;
var statusBarBG;
var mood = 50;
var holesCount = 0;
var food1;
var food2;
var shit;
var maintheme;
States.Burger = function (game) {

};

States.Burger.prototype = {
    preload : function() {},

    create: function () {
        game.time.events.resume();
        maintheme = game.add.audio('burger-maintheme');
        food1 = game.add.audio('burger-food1');
        food2 = game.add.audio('burger-food2');
        shit = game.add.audio('burger-shit');
        food1.loop = false;
        food2.loop = false;
        shit.loop = false;
        maintheme.play();
        maintheme.loop = true;
        maintheme.volume = 0.5;
        score = 0;
        this.game.add.sprite(0,0,'burger-back');
        this.add.button(40, 40, 'common-goback', function () {
            maintheme.stop();
            game.exitMiniGameSignal.dispatch();
        },this)
        Text = game.add.text(230,70,'Время пиара:60',{fontSize: '36px',fill: 'white'});
        ebalo = this.game.add.sprite(550,1065,'burger-ebalo2').moveUp();
        statusBarBG = this.game.add.sprite(50,1125,'burger-statusBG');
        statusBarBG.width = 450;
        statusBar = this.game.add.sprite(50,1125,'burger-status');
        UpdateMood();
        
        peekHoles = [
                    new PeekHole(480,300),
                    new PeekHole(120,350),
                    new PeekHole(340,450),
                    new PeekHole(65,550),
                    new PeekHole(510,575),
                    new PeekHole(270,650),
                    new PeekHole(90,750),
                    new PeekHole(430,785),
                    ];
    },
    update: function () {}
};

function Hide(peekHole){
    if(peekHole.isPoop){
        game.add.tween(peekHole.poop).to( {y:peekHole.y+90}, speed, Phaser.Easing.Linear.None, true)
    }else{
        game.add.tween(peekHole.burger).to( {y:peekHole.y+90}, speed, Phaser.Easing.Linear.None, true);
    }
    peekHole.canClick = false;
    randomColdown = game.rnd.realInRange(minColdown,maxColdown);
    game.time.events.add(Phaser.Timer.SECOND * randomColdown, 
        function(){
            Peek(peekHole);
        },this);
}

function Show(peekHole){
    if(peekHole.isPoop){
        game.add.tween(peekHole.poop).to( {y:peekHole.y-50}, speed, Phaser.Easing.Linear.None, true)
    }else{
        game.add.tween(peekHole.burger).to( {y:peekHole.y-50}, speed, Phaser.Easing.Linear.None, true)
    }
    game.time.events.add(Phaser.Timer.SECOND * speed/1000,function(){peekHole.canClick = true},this);
}

function Peek(peekHole){
    if(game.rnd.integerInRange(1,100)<PoopChance){
        peekHole.isPoop = true;
    }else{
        peekHole.isPoop = false;
    }
    Show(peekHole);
    var randomDuration = game.rnd.realInRange((speed/1000)+minDuration, maxDuration);
    game.time.events.add(Phaser.Timer.SECOND * randomDuration, 
        function(){
            if(peekHole.canClick){
                Hide(peekHole);
            }
        },this);
}

PeekHole = function(x,y){
    this.isPoop = false;
    this.x=x;
    this.y=y;
    this.canClick = true;
    this.burger = game.add.sprite(x+10,y+90,'burger');
    this.poop = game.add.sprite(x+10,y+90,'burger-poop');
    this.flag = game.add.sprite(x-50,y-100,'burger-flag');
    this.hole = game.add.sprite(x-30,y,'burger-hole');
    this.front = game.add.sprite(x-30,y,'burger-front');
    this.clap = game.add.sprite(x+40,y-80,'burger-clap');
    this.clap.alpha = 0;
    this.hole.moveDown();
    this.hole.moveDown();    
    this.id = ++holesCount;
    this.burger.moveUp();
    this.burger.moveUp();
    this.front.moveUp();
    this.front.moveUp();
    this.front.moveUp();
    this.burger.inputEnabled = true;
    this.burger.events.onInputDown.add(function(){ClickNice(this)}, this);
    this.poop.inputEnabled = true;
    this.poop.events.onInputDown.add(function(){ClickFail(this)}, this);
    this.poop.pivot.y = 20;
    this.flag.moveDown();
    Hide(this);
    
}
function UpdateMood(){
    game.time.events.add(Phaser.Timer.SECOND * 0.1, 
        function(){
            
            if(mood>100){
                mood=100;
            }else if(mood < 1){
                mood = 0;
            }else{
                mood -= 0.1;
            }
            GameTime -=0.1;
            if(GameTime <=0){
                if(mood >= 50){
                    Win();
                }else{
                    Loose();
                }
            }
            Text.text = 'Время пиара: '+Math.round(GameTime).toString(10);
            statusBar.width = 450*mood/100;
            if(mood <= 30){
                ebalo.loadTexture('burger-ebalo1');
            }else if (mood >= 70){
                ebalo.loadTexture('burger-ebalo3');
            }else{
                ebalo.loadTexture('burger-ebalo2');
            }
            UpdateMood();
            }
    ,this);
}
function Win(){
    maintheme.stop();
    game.time.events.pause();
}
function Loose(){
    maintheme.stop();
    game.time.events.pause();
}
function ClickNice(peekHole){
    if(peekHole.canClick){
        if(game.rnd.integerInRange(1,100)<50){
            food1.play();
        }else{
            food2.play();
        }
        peekHole.clap.alpha = 1;
        game.time.events.add(Phaser.Timer.SECOND * 0.2, 
            function(){
                peekHole.clap.alpha = 0;
            },this);
        Hide(peekHole);
        mood +=2;
    }
}
function ClickFail(peekHole){
    if(peekHole.canClick){
        shit.play();
        peekHole.clap.alpha = 1;
        game.time.events.add(Phaser.Timer.SECOND * 0.2, 
            function(){
                peekHole.clap.alpha = 0;
            },this);
        Hide(peekHole);
        mood -=4;
    }
}