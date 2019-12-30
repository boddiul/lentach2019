States = {};

States.Pacman = function (game) {


};

States.Pacman.prototype = {

    blockSize : 48,
    blocksW : 17,
    blocksH : 18,

    blockMapString :
    "111111111" +
    "100000001" +
    "101101101" +
    "101101101" +
    "100000000" +
    "101101011" +
    "100001222" +
    "111101110" +
    "111101000" +
    "111101011" +
    "100000001" +
    "101101101" +
    "100100222" +
    "110101111" +
    "100000001" +
    "101111101" +
    "100000000" +
    "111111111",

    blockMap : [],
    coinMap : [],
    stars: [],

    xOff : -48,
    yOff : 64*2,


    player : null,
    enemy : [],


    Circle : class {
        constructor(global) {this.global = global}

        init(x,y) {

            this.x = x;
            this.y = y;

            this.big_circle = this.global.game.add.sprite(x, y, 'pacman-big_circle');

            this.big_circle.anchor.setTo(0.5, 0.5);
            this.small_circle = this.global.game.add.sprite(x, y, 'pacman-small_circle');
            this.small_circle.anchor.setTo(0.5, 0.5);
        }


        update()
        {
            if(!this.global.game.input.activePointer.isDown || !this.global.canControl) /*x===-1 && y===-1*/
            {

                this.small_circle.x = this.x;
                this.small_circle.y = this.y;
            }
            else
            {
                let x = this.global.game.input.x;
                let y = this.global.game.input.y;
                let angle = Phaser.Point.angle({x:this.x,y:this.y},{x:x,y:y});

                let dir = 4-Math.floor(angle/(2*Math.PI)*4+2.5);

                if (dir>4)
                    dir =0;

                let dist = Phaser.Point.distance({x:this.x,y:this.y},{x:x,y:y});

                if (dist>20)
                    this.global.player.setControl(dir);



                if (dist<60)
                {
                    this.small_circle.x = x;
                    this.small_circle.y = y;
                }
                else
                {
                    this.small_circle.x = this.x - 60*Math.cos(angle);
                    this.small_circle.y = this.y - 60*Math.sin(angle);
                }
            }
        }



    },
    Entity : class {
        constructor(global) {
            console.log("AAAAAAA");
            this.global = global}

        init(isPlayer, posX,posY, dir, spd ) {
            this.isPlayer = isPlayer;

            this.spd = spd;
            this.posX = posX;
            this.posY = posY;
            this.dir = dir;


            this.controlledDir = 0;

            this.stopped = isPlayer;


            this.initState = true;


            this.sprite = this.global.game.add.sprite(
                this.global.xOff+24+posX*this.global.blockSize,
                this.global.yOff+24+posY*this.global.blockSize,
                isPlayer ? 'pacman-player': 'pacman-enemy');

            this.sprite.anchor.set(0.5,0.5);

            if (!isPlayer)
                this.sprite.frame = Math.round(Math.random());
            else
            {
                this.sprite.animations.add('run',[0,1],5,true);
                this.sprite.animations.play('run')

                this.hit = -1;

            }

            this.o = 0;
        }



        update() {

            let xx = -1;
            let yy = -1;


            if (this.isPlayer) {

                if (this.hit >= 0)
                    this.hit -= 1 / 60;
                else
                    this.hit = -1;
            }


            if (this.o <= 0)
            {



                if (!this.stopped)
                {
                    this.posX = Math.round(this.posX +Math.cos(this.dir*90/180*Math.PI));
                    this.posY = Math.round(this.posY -Math.sin(this.dir*90/180*Math.PI));
                }




                let canLeft =
                    this.global.blockMap
                        [Math.round(this.posY -Math.sin((this.dir-1)*90/180*Math.PI))]
                        [Math.round(this.posX +Math.cos((this.dir-1)*90/180*Math.PI))] !== 1;

                let canRight =
                    this.global.blockMap
                        [Math.round(this.posY -Math.sin((this.dir+1)*90/180*Math.PI))]
                        [Math.round(this.posX +Math.cos((this.dir+1)*90/180*Math.PI))] !== 1;


                let canForward =
                    this.global.blockMap
                        [Math.round(this.posY -Math.sin((this.dir)*90/180*Math.PI))]
                        [Math.round(this.posX +Math.cos((this.dir)*90/180*Math.PI))] !== 1;

                if (this.isPlayer)
                {



                    if (this.global.coinMap[this.posY][this.posX])
                    {
                        this.global.total-=1;


                        if (sound_on)
                            this.global.snd_pick.play();
                        if (this.global.total<=0 && !this.endGame)
                        {
                            this.global.Win();
                        }

                        this.global.coinMap[this.posY][this.posX].destroy();
                        this.global.coinMap[this.posY][this.posX] = null;
                    }

                    if ( !canForward)
                    {
                        this.stopped = true;
                    }


                    switch (this.controlledDir)
                    {
                        case -2:
                            this.stopped = false;
                            this.dir-=2;
                            this.controlledDir = 0;
                            break;
                        case -1:
                            if (canLeft)
                            {
                                this.stopped = false;
                                this.dir-=1;
                                this.controlledDir = 0;
                            }

                            break;

                        case 1:
                            if (canRight)
                            {
                                this.stopped = false;
                                this.dir+=1;
                                this.controlledDir = 0;
                            }
                            break;
                    }





                }
                else
                {
                    if (!canForward)
                    {


                        if (Math.random()>0.5 && canRight)
                        {
                            this.dir+=1;
                        }
                        else if (canLeft)
                        {
                            this.dir-=1;
                        }
                        else
                        {
                            this.dir+=1;
                        }

                    }
                    else if (Math.random()>0.5)
                    {
                        if (Math.random()>0.5 && canRight)
                        {
                            this.dir+=1;
                        }
                        else if (canLeft)
                        {
                            this.dir-=1;
                        }
                    }
                }

                if (this.dir<0)
                    this.dir+=4;

                if (this.dir>3)
                    this.dir-=4;


                if (this.isPlayer)
                {

                    if (!this.initState)
                    {
                        if (this.dir===2)
                        {
                            this.sprite.angle = 0;
                            this.sprite.scale.setTo(-1,1);
                        }
                        else
                        {
                            this.sprite.angle = 360-this.dir*90;
                            this.sprite.scale.setTo(1,1);

                        }
                    }
                }



                this.o+=1;
            }
            else
            {

            }

            if (this.global.canControl)
                this.o-=1/this.spd;

            if (!this.stopped)
            {
                this.sprite.x = this.global.xOff+24+(this.posX+Math.cos(this.dir*90/180*Math.PI)*(1-this.o))*this.global.blockSize;
                this.sprite.y = this.global.yOff+24+(this.posY-Math.sin(this.dir*90/180*Math.PI)*(1-this.o))*this.global.blockSize;
            }



        }


        setControl(dir) {



            if (this.global.canControl)
            {
                this.initState = false;
                //console.log(dir);
                this.controlledDir = dir-this.dir; //dir; //this.dir - dir;
                //console.log(this.controlledDir);
                if (this.controlledDir<-2)
                    this.controlledDir+=4;

                if (this.controlledDir>1)
                    this.controlledDir-=4;
            }

        }
    },


    preload : function() {


        this.coinMap = [];
        this.blockMap = [];
        this.player = new this.Entity(this);

        this.enemy = [new this.Entity(this),new this.Entity(this),new this.Entity(this) ];

        this.circle = new this.Circle(this);

    },



    pressUp: function() {
        this.player.setControl(1);
    },
    pressRight: function() {
        this.player.setControl(0);
    },
    pressLeft: function() {
        this.player.setControl(-2);
    },
    pressDown: function() {
        this.player.setControl(-1);
    },

   /* onDown: function() {
        this.circle.update(this.game.input.x,this.game.input.y);

    },
    onUp: function() {
        this.circle.update(-1,-1);

    },*/

    create: function () {

        music_main.stop();
        if (sound_on)
            music_pacman.play();

        this.back = this.game.add.sprite(0,0,'pacman-back');


        let star_x = 30;
        let star_y = HEIGHT-170;



        let pogon = this.game.add.sprite(star_x,star_y,'pacman-pogon');


        this.stars = [null,null,null];

        for (let i=0;i<3;i++)
        {
            this.stars[i] = this.game.add.sprite(star_x+40+50*i,star_y,'pacman-star');
            this.stars[i].anchor.setTo(0.5);
        }

        this.hp = 3;


        pogon.anchor.setTo(0,0.5);

        this.total = 0;


        let t = -1;

        for (let i=0;i<this.blocksH;i++)
        {
            this.blockMap.push([]);
            this.coinMap.push([]);
            for (let j=0;j<this.blocksW;j++)
            {
                if (j<this.blocksW/2)
                    t = parseInt(this.blockMapString.charAt(Math.floor(this.blocksW/2+1)*i+j));
                else
                    t = parseInt(this.blockMapString.charAt(Math.floor(this.blocksW/2+1)*i+this.blocksW-j-1));

                this.blockMap[i].push(t);

                if (t===0 && Math.random()>0.5)
                {

                    this.total+=1;
                    this.coinMap[i].push(
                        this.game.add.sprite(
                        this.xOff+j*this.blockSize,
                        this.yOff+i*this.blockSize,
                        'pacman-coin',Math.floor(Math.random()*5)));


                }
                else
                {
                    this.coinMap[i].push(null);
                }

               /* if (t===1)
                    this.game.add.sprite(
                        this.xOff+j*this.blockSize,
                        this.yOff+i*this.blockSize,
                        'pacman-block')*/
            }
        }

        this.player.init(true,8,12,1,12);
        this.enemy[0].init(false,8,6,1,16);
        this.enemy[1].init(false,6,6,2,16);
        this.enemy[2].init(false,10,6,3,16);

        this.add.button(0, 0, 'common-goback', function () {

            game.exitMiniGameSignal.dispatch();
        },this);


        this.circle.init(WIDTH/5*3,HEIGHT-170);

        key = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        key.onDown.add(this.pressUp, this);

        key = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        key.onDown.add(this.pressLeft, this);

        key = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        key.onDown.add(this.pressRight, this);

        key = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        key.onDown.add(this.pressDown, this);


        this.endGame = false;
        this.canControl = false;

        this.message_box = new MessageBox(this);
        this.message_box.show("game_intro",1);

        //this.game.input.onHold.add(this.onDown,this);
        //this.game.input.onUp.add(this.onUp,this);


        this.snd_damage = this.game.add.sound('pacman-snd-damage');

        this.snd_pick = this.game.add.sound('pacman-snd-pick');
        this.snd_pick.volume = 0.3;
    },

    update: function () {
        this.player.update();
        this.enemy[0].update();
        this.enemy[1].update();
        this.enemy[2].update();


            for (let i=0;i<3;i++)
                if (this.player.hit<0 && this.hp>0)
            {
                let d = Phaser.Math.distance(
                    this.player.sprite.x,this.player.sprite.y,
                    this.enemy[i].sprite.x,this.enemy[i].sprite.y);





                if (d<this.blockSize*0.6)
                {
                    this.player.hit = 1;

                    game.camera.shake(0.03, 300,true,Phaser.Camera.SHAKE_HORIZONTAL);
                    this.stars[this.hp-1].visible = false;
                    this.hp-=1;

                    if (sound_on)
                        this.snd_damage.play();

                    if (this.hp <= 0 && !this.endGame)
                    {
                        this.Loose();
                    }

                }
            }



        this.circle.update();
    },

    StartControl : function()
    {
        this.canControl = true;
    },

    Loose : function()
    {
        this.endGame = true;
        this.canControl = false;
        this.message_box.show("loose",1);
    },

    Win : function ()
    {
        this.endGame = true;
        this.canControl = false;
        this.message_box.show("win",1);
    }



};
