States = {};

const pl_up = 800;
const pl_down = 1035;
const pl_left = 250;
const pl_right = 500;
const enemy_up = 515;
const enemy_down = 630;
const enemy_left = 285;
const enemy_right = 450;

var winChance = 50;

var canControl = true;
var pointerWasDown = false;
var firstPointerX = 0;

var counter = 0;
var random_x = pl_left;
var random_y = pl_up;
var canTrow = true;
var canLoose = false;
var loosing;
var drugstweenX;
var drugstweenY;

var playerScore = 0;
var enemyScore = 0;
States.Volleyball = function (game) {


};

States.Volleyball.prototype = {

    preload : function() {
    },

    create: function () {
        group = game.add.group();
        group.create(0,0,'volley-back');
        group.create(110,522,'net');
        
        //Игрок
        player = group.create(pl_left,pl_up,'volley-player');
        player.pivot.x = player.width*2/3;
        player.pivot.y = player.height-30;
        player.animations.add('jump',[0,1,2,2,1,0],10,false);
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
        
        //мент
        ment = group.create(enemy_left,enemy_up,'volley-ment');
        ment.pivot.x = ment.width*2/3;
        ment.pivot.y = ment.height-30;

        //'мяч' наркотики
        drugs = group.create(random_x,random_y,'drugs');
        drugs.pivot.x = drugs.width*2/3;
        drugs.pivot.y = drugs.height;
        drugs.scale.setTo(3,3);
        group.sort('y', Phaser.Group.SORT_ASCENDING);
        
        //кнопка назад
        this.add.button(40, 40, 'common-goback', function () {
            game.exitMiniGameSignal.dispatch();
        },this)

        //счёт
        playerScoreText = game.add.text(300,16,'Голунов:0',{fontSize: '32px',fill: 'green'});
        enemyScoreText = game.add.text(500,16,'Мент:0',{fontSize: '32px',fill: 'red'});
        cursors = game.input.keyboard.createCursorKeys();
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
function throwBall(ball,x,y,GolunovThrow)
{
    canTrow = false;
    drugstweenX = game.add.tween(ball).to( {x:x}, 1200, Phaser.Easing.Quadratic.Out, true)
    //половина траэктории по Y
    drugstweenY = game.add.tween(ball).to( {y: y-150}, 500,Phaser.Easing.Quadratic.Out, true).onComplete.add(trajectory2,this);
    function trajectory2 () {
        if(GolunovThrow){ 
            //Бросок Голунова
            var successThrow = game.rnd.integerInRange(1, 100);
            if(successThrow<winChance&&!(ment.x == x&&ment.y==y)){
                //Удачный бросок, мент не успевает отбить
                drugstweenY = game.add.tween(ball).to( {y: y}, 700,Phaser.Easing.Quadratic.Out, true).onComplete.add(WinOnePoint,this);
                
            }
            else{
                //НЕ удачный бросок, мент отбивает
                if(!(ment.x == x&&ment.y==y)){
                    ment.x = x;
                    ment.y = y;
                }
                drugstweenY = game.add.tween(ball).to( {y: y}, 700,Phaser.Easing.Quadratic.Out, true).onComplete.add(throwBack,this);
            }
        }
        else{
            //Бросок мента
            //Уже можно отбить
            canTrow = true;
            canLoose = true;
            //вторая половина траектори по Y
            drugstweenY = game.add.tween(ball).to( {y: y}, 700,Phaser.Easing.Quadratic.Out, true).onComplete.add(LoseOnePoint,this) 
        }
    }
    function throwBack(){
        //Бросок ментов в случайную клетку Голунова
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
            enemyScoreText.setText('Мент:'+enemyScore.toString(10));
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){canControl =true;} , this);
            game.time.events.add(Phaser.Timer.SECOND * 1, 
                function(){
                    player.x = pl_left;
                    player.y = pl_down;
                    random_x = pl_left;
                    random_y = pl_down;
                    drugs.x = random_x;
                    drugs.y = random_y;
            },this);
        }
    }
    
    
    function WinOnePoint(){
        playerScore++;
        playerScoreText.setText('Голунов:'+playerScore.toString(10));
        game.time.events.add(Phaser.Timer.SECOND * 1, 
            function(){
                ment.x = enemy_right;
                ment.y = enemy_up;
                random_x = enemy_right;
                random_y = enemy_up;
                drugs.x = enemy_right;
                drugs.y = enemy_up;
            },this);
        game.time.events.add(Phaser.Timer.SECOND * 2, throwBack, this);;
    }
    
}

