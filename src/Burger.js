States = {};
var speed = 300;
var minDuration = 0.65;
var maxDuration = 2;
var minColdown = 1;
var maxColdown = 7;

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
        Text = game.add.text(300,16,'Счёт:0',{fontSize: '32px',fill: 'black'});
        peekHoles = [
                    new PeekHole(230,450),
                    new PeekHole(480,550),
                    new PeekHole(120,650),
                    new PeekHole(320,720),
                    new PeekHole(90,800),
                    new PeekHole(480,850),
                    new PeekHole(300,950),
                    new PeekHole(60,1030),
                    ];
    },
    update: function () {}
};

function Hide(peekHole){
    game.add.tween(peekHole.burger).to( {y:peekHole.y+100}, speed, Phaser.Easing.Linear.None, true)
    peekHole.canClick = false;
    randomColdown = game.rnd.realInRange(minColdown,maxColdown);
    game.time.events.add(Phaser.Timer.SECOND * randomColdown, 
        function(){
            Peek(peekHole);
        },this);
}

function Show(peekHole){
    game.add.tween(peekHole.burger).to( {y:peekHole.y-100}, speed, Phaser.Easing.Linear.None, true)
    game.time.events.add(Phaser.Timer.SECOND * speed/1000,function(){peekHole.canClick = true},this);
}

function Peek(peekHole){
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
    this.x=x;
    this.y=y;
    this.canClick = false;
    this.burger = game.add.sprite(x+15,y,'burger');
    this.flag = game.add.sprite(x+20,y-100,'burger-flag');
    this.hole = game.add.sprite(x-30,y,'burger-hole');
    this.hole.moveUp();  
    this.id = ++holesCount;
    this.burger.scale.x =0.3;
    this.burger.scale.y= 0.3;
    this.burger.moveDown();
    this.burger.inputEnabled = true;
    this.burger.events.onInputDown.add(function(){Click(this)}, this);
    this.flag.moveDown();
    this.flag.moveDown();
    Peek(this);
}
function Click(peekHole){
    if(peekHole.canClick){
        AddScore();
        Hide(peekHole);
    }
}
function AddScore(){
    score+=100;
    Text.setText("Cчёт:"+score.toString(10));
}