States = {};

const pl_up = 830;
const pl_down = 1100;
const pl_left = 280;
const pl_right = 590;
const enemy_up = 420;
const enemy_down = 520;
const enemy_left = 285;
const enemy_right = 475;

var winChance = 30;
var winScore = 4;


var canControl;
var pointerWasDown;
var firstPointerX;




var counter;
var random_x;
var random_y;
var canTrow;
var canLoose;
var loosing;
var drugstweenX;
var drugstweenY;
var drugs;
var net;
var playerScore;
var enemyScore;
var needDrugsMoveUp;

var volley_msg;

States.Volleyball = function (game) {


};

States.Volleyball.prototype = {

    preload : function() {
    },

    create: function () {
        canControl = false;
        pointerWasDown = false;
        firstPointerX = 0;




        counter = 0;
        random_x = pl_left;
        random_y = pl_up;
        canTrow = true;
        canLoose = false;

        playerScore = 0;
        enemyScore = 0;
        needDrugsMoveUp = false;

        volley_msg = null;





        group = game.add.group();
        group.create(0,0,'volley-back');
        //мент
        ment = group.create(enemy_left,enemy_up,'volley-ment');
        ment.pivot.x = ment.width*2/3;
        ment.pivot.y = ment.height-30;
        ment.animations.add('jump',[1,1,0],7,false);

        shadow = group.create(pl_left,pl_up,'shadow').moveUp();
        shadow.alpha = 0;
        shadow.pivot.x = 100;
        shadow.pivot.y = 100;
        shadow.moveDown();
        ment.moveUp();
        net = group.create(0,455,'net');
        
        //Игрок
        player = group.create(pl_left,pl_up,'volley-player');
        player.pivot.x = player.width*2/3;
        player.pivot.y = player.height-30;
        player.animations.add('jump',[0,1,1,1,0],10,false);
        player.z = 4;

        //управление кнопками
        this.add.button(pl_left-200,pl_down-140,'volley-left_down_btn', function (){ButtonControls(pl_left,pl_down);}).moveDown();
        this.add.button(pl_left -130,pl_up-100,'volley-left_up_btn', function (){ButtonControls(pl_left,pl_up);}).moveDown();
        this.add.button(pl_right-130,pl_down-138,'volley-right_down_btn', function (){ButtonControls(pl_right,pl_down);}).moveDown();
        this.add.button(pl_right-130,pl_up-92,'volley-right_up_btn', function (){ButtonControls(pl_right,pl_up);}).moveDown();

        function ButtonControls(x,y){
            if(canControl){
                if(player.x == x&&player.y == y){
                    Jump();
                }else{
                    player.x = x;
                    player.y = y;
                }
            }
        }
        //'мяч' наркотики
        drugs = group.create(random_x,random_y,'drugs');
        drugs.pivot.x = 90;
        drugs.pivot.y = 120;

        //group.sort('y', Phaser.Group.SORT_ASCENDING);
        
        //кнопка назад
        this.add.button(0, 0, 'common-goback', function () {
            game.exitMiniGameSignal.dispatch();
        },this)

        //счёт
        group.create(180,0,'score');
        playerScoreText = game.add.text(305,52,'0',{fontSize: '48px',fill: 'white'});
        enemyScoreText = game.add.text(412,52,'0',{fontSize: '48px',fill: 'white'});
        cursors = game.input.keyboard.createCursorKeys();
        drugs.moveDown();


        volley_msg = new MessageBox(this);


        volley_msg.show("game_intro",0);
    },
    

    update: function () {
        //Если сейчас не в прыжке и может управлять
        if(canControl&&(!player.animations.currentAnim.isPlaying && player.animations.currentAnim.name=='jump')){ 
            if(cursors.left.isDown){ //Предвижение по полю
                player.x = pl_left
            } else if(cursors.right.isDown){
                player.x = pl_right
            }else if(cursors.up.isDown){
                player.y = pl_up
            }else if(cursors.down.isDown){
                player.y = pl_down
            }
    
            // прыжок на компе
            if(game.input.keyboard.isDown(Phaser.Keyboard.Z)){
                Jump();
            }
        }
        //Передвижение мента

        
    },


    StartControl : function () {
        canControl = true;
    }
};
function Jump(){
    player.animations.play('jump');//прыжок
        if(player.x==random_x&&player.y==random_y&&canTrow){//Если прыжок на клетке с куда падает мяч
            canLoose = false;
            var b = game.rnd.integerInRange(0, 1); //50 на 50 будет бросок дальним или ближним
            if(b==0){
                if(player.x == pl_left){
                    throwBall(drugs,enemy_left,enemy_up,true);
                }else{
                    throwBall(drugs,enemy_right,enemy_up,true);
                }
            }else{
                if(player.x == pl_left){
                    throwBall(drugs,enemy_left,enemy_down,true);
                }else{
                    throwBall(drugs,enemy_right,enemy_down,true);
                }
            }
                
        }
}

function Shadow(){
    shadow.scale.x=0.1;
    shadow.scale.y=0.1;
    shadow.alpha = 0;
    shadowTween = game.add.tween(shadow.scale).to({ x: 0.7, y: 0.7 }, 1200, Phaser.Easing.Linear.None, true);
    shadowAlphaTween =game.add.tween(shadow).to( { alpha: 1 }, 1200, "Linear", true); 
}

function throwBall(ball,x,y,PlayerThrow)
{
    
    if(PlayerThrow){
        shadow.y = y+70;
        drugstweenX = game.add.tween(ball).to( {x:x}, 1200, Phaser.Easing.Quadratic.Out, true)
        drugstweenY = game.add.tween(ball).to( {y: y-200}, 500,Phaser.Easing.Quadratic.Out, true).onComplete.add(trajectory2,this);
    }else{
        shadow.y = y-30;
        drugstweenX = game.add.tween(ball).to( {x:x}, 1200, Phaser.Easing.Quadratic.Out, true)
        drugstweenY = game.add.tween(ball).to( {y: drugs.y-200}, 500,Phaser.Easing.Quadratic.Out, true).onComplete.add(trajectory2,this);
    }
    shadow.x = x-20;
    Shadow();
    canTrow = false;
    
    function trajectory2 () {
        if(PlayerThrow){ 
            drugs.moveDown();
            //Бросок Игрока
            var successThrow = game.rnd.integerInRange(1, 100);
            if(successThrow<winChance&&!(ment.x == x&&ment.y==y)){
                //Удачный бросок, враг не успевает отбить
                if(ment.y>y){
                    game.time.events.add(Phaser.Timer.SECOND * 0.5, 
                        function(){
                            drugs.moveDown();
                            needDrugsMoveUp = true;
                    },this);
                }
                drugstweenY = game.add.tween(ball).to( {y: y+100}, 700,Phaser.Easing.Quadratic.In, true).onComplete.add(WinOnePoint,this);
            }
            else{
                //НЕ удачный бросок, враг отбивает
                if(!(ment.x == x&&ment.y==y)){
                    ment.x = x;
                    ment.y = y;
                }
                drugstweenY = game.add.tween(ball).to( {y: y+100}, 700,Phaser.Easing.Quadratic.In, true).onComplete.add(throwBack,this);
            }
        }
        else{
            drugs.moveUp();
            //Бросок врага
            //Уже можно отбить
            game.time.events.add(Phaser.Timer.SECOND * 0.45, 
                function(){
                    canLoose = true;
                    canTrow = true;
            },this);
            //вторая половина траектори по Y
            drugstweenY = game.add.tween(ball).to( {y: y}, 700,Phaser.Easing.Quadratic.In, true).onComplete.add(LoseOnePoint,this)
        }
    }
    function throwBack(){
        //Бросок врага в случайную клетку игрока
        ment.animations.play("jump"); 
        var a = game.rnd.integerInRange(0, 3);
        switch(a) {
              case 0:  
                random_x = pl_left;
                random_y = pl_up;
              break;
              case 1: 
                random_x = pl_right;
                random_y = pl_up;
              break;
              case 2:  
                random_x = pl_left;
                random_y = pl_down;
              break;
              case 3:  
                random_x = pl_right;
                random_y = pl_down;
              break;
          }
        throwBall(ball,random_x,random_y,false);
    }
    function LoseOnePoint(){
        if(canLoose){
            canLoose = false;
            canControl = false;
            enemyScore++;
            enemyScoreText.setText(enemyScore.toString(10));
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){canControl =true;} , this);
            game.time.events.add(Phaser.Timer.SECOND * 1, 
                function(){
                    player.x = pl_left;
                    player.y = pl_down;
                    random_x = pl_left;
                    random_y = pl_down;
                    drugs.x = random_x;
                    drugs.y = random_y;
                    shadow.alpha = 0;
                    if(enemyScore>=winScore){
                        Loose();
                    }
            },this);
        }
    }
    function WinOnePoint(){
        playerScore++;
        playerScoreText.setText(playerScore.toString(10));
        game.time.events.add(Phaser.Timer.SECOND * 0.8, 
            function(){
                if(needDrugsMoveUp){
                    drugs.moveUp();
                    needDrugsMoveUp = false;
                }
                ment.x = enemy_right;
                ment.y = enemy_up;
                random_x = enemy_right;
                random_y = enemy_up;
                drugs.x = enemy_right;
                drugs.y = enemy_up-100;
                shadow.alpha = 0;
                
            },this);
            if(playerScore>=winScore){
                Win();
            }else{
                game.time.events.add(Phaser.Timer.SECOND * 1.5, throwBack, this);
            }
    }


    function Win(){
        //console.log('Ты победил!');
        canControl = false;
        canLoose =false;
        canTrow = false;


        volley_msg.show("win",0);
    }
    function Loose(){
        //console.log('Ты проиграл!');
        canControl = false;
        canLoose =false;
        canTrow = false;


        volley_msg.show("loose",0);
    }
}

