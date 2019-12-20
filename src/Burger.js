States = {};
var speed = 300;
var minDuration = 0.65;
var maxDuration = 2;
var minColdown = 1;
var maxColdown = 7;
var PoopChance = 50;

var Text;
var score = 0;
var holesCount = 0;
States.Burger = function (game) {

};

States.Burger.prototype = {
    preload : function() {},

    create: function () {
        score = 0;
        this.game.add.sprite(0,0,'burger-back');
        this.add.button(40, 40, 'common-goback', function () {
            game.exitMiniGameSignal.dispatch();
        },this)
        Text = game.add.text(230,70,'Здоровье Собянина:0',{fontSize: '36px',fill: 'white'});
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
function ClickNice(peekHole){
    if(peekHole.canClick){
        AddScore();
        Hide(peekHole);
    }
}
function ClickFail(peekHole){
    if(peekHole.canClick){
        DecScore();
        Hide(peekHole);
    }
}
function AddScore(){
    score+=100;
    Text.setText("Здоровье Собянина:"+score.toString(10));
}
function DecScore(){
    score-=200;
    Text.setText("Здоровье Собянина:"+score.toString(10));
}