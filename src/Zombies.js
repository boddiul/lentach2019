States = {};

States.Zombies = function (game) {


};

States.Zombies.prototype = {



    total_time : 50,
    maxhp : 30,

    Ball:class {

        constructor(global) {

            this.global =  global;

            this.sprite = this.global.game.add.sprite(0,0,'pvz-trash');
            this.sprite.visible = false;
            this.sprite.anchor.setTo(0.5);
            this.spdx = 0;
            this.spdy = 0;


        }

        init(x,y,dir,dist) {
            this.sprite.x = x;
            this.sprite.y = y;


            this.z = 1;
            this.spdz = 0.2;


            let newspd = dist/40;



            this.fallen = false;

            this.spdx = -newspd*Math.cos(dir);
            this.spdy = -newspd*Math.sin(dir)

            this.sprite.visible = true;

            this.sprite.alpha = 1;
        }

        update() {

            if (this.sprite.visible)
            {



                if (this.z<=0)
                {
                    if (!this.fallen)
                    {
                        this.fall();
                    }
                    else
                    {

                        if (this.sprite.x>WIDTH/2)
                        {
                            if (this.spdx>0.1)
                                this.spdx-=0.08;

                        }
                        else
                        {
                            if (this.spdx<-0.1)
                                this.spdx+=0.08;
                        }



                        let ww = 60;
                        if (this.sprite.x>WIDTH/2 && this.sprite.x<WIDTH/2+ww)
                            this.spdx=3;

                        else if (this.sprite.x<=WIDTH/2 && this.sprite.x>WIDTH/2-ww)
                            this.spdx=-3;

                        else
                            this.sprite.y +=this.global.spd;





                        if (this.spdy>0.1)
                            this.spdy-=0.08;
                        else if (this.spdy<-0.1)
                            this.spdy+=0.08;
                        else
                            this.spdy = 0;
                    }
                }
                else
                {
                    this.spdy += this.global.spd/40;


                    this.spdz-=0.01;
                }

                this.z +=this.spdz;
                this.sprite.x+= this.spdx;
                this.sprite.y+= this.spdy;

                this.sprite.angle += (this.spdx+this.spdy)/2;


                this.sprite.scale.setTo(0.8+this.z*0.1);

                if (this.sprite.alpha>0.1)
                {
                    if (Math.abs(this.spdx)+Math.abs(this.spdy)<0.1 && this.fallen)
                        this.sprite.alpha-=0.004;
                }
                else
                    this.sprite.visible = false;


            }
        }


        fall() {

            this.fallen = true;

            this.spdy = this.spdy/5;

            this.spdz = 0;
            this.z = 0;
            this.spdx = this.spdx/2;




        }
    },


    Man:class {
        constructor(global) {

            this.global =  global;

            this.sprite = this.global.game.add.sprite(0,0,Math.random()>0.5 ? 'pvz-man0' : 'pvz-man1');
            this.sprite.visible = false;
            this.sprite.anchor.setTo(0.5);


            this.sprite.animations.add('run',[2,3],6,true);
            this.sprite.animations.add('hit',[0,1],4,false);


            this.state = 'null';

            /*
            this.spdx = 0;
            this.spdy = 0;*/


        }

        init() {

            this.pos = Math.round(Math.random());


            this.sprite.x = -30 + this.pos*(WIDTH+60);

            this.sprite.y = 400+Math.random()*(HEIGHT-300);


            if (this.pos <1)
            {
                this.spdx = 0.5+Math.random();
                this.sprite.angle = 180-45;
            }
            else
            {
                this.spdx = -0.5-Math.random();

                this.sprite.angle = 0+45;
            }


            this.spdy = -0.5;


            this.sprite.visible = true;


            this.sprite.animations.play('run');


            this.state = 'run';
        }

        update() {

            if (this.sprite.visible)
            {



                if (this.state === 'run')
                {
                    let ww = 90;
                    if (this.pos >0)
                    {
                        if (this.sprite.x<WIDTH/2+ww)
                            this.state = 'hitting';
                    }
                    else
                    {
                        if (this.sprite.x>WIDTH/2-ww)
                            this.state = 'hitting';
                    }

                    if (this.state==='hitting')
                    {
                        this.spdx = 0; this.spdy=0;
                    }

                }

                else if (this.state === 'hitting')
                {
                    if (Math.random()<0.05 && !this.sprite.animations.getAnimation('hit').isPlaying)
                    {
                        if (sound_on)
                            this.global.snd_punch.play();
                        this.sprite.animations.play('hit');
                        this.global.hp-=1;
                        if (this.global.hp<0)
                            this.global.hp = 0;
                    }
                    else if (
                        !this.sprite.animations.getAnimation('hit').isPlaying &&
                        !this.sprite.animations.getAnimation('run').isPlaying)
                            this.sprite.animations.play('run');
                }
                else if (this.state === 'back')
                {
                    if (this.sprite.x<-30 || this.sprite.x > WIDTH+30 || this.sprite.y > HEIGHT+30)
                        this.sprite.visible = false;
                }

                this.sprite.x+= this.spdx;
                this.sprite.y+= this.spdy;


            }
        }


        back() {


            this.sprite.animations.play('run');

            if (this.pos >0)
            {
                this.spdx = Math.random();

                this.sprite.angle = -45-45-45;
            }
            else
            {
                this.spdx = -Math.random();

                this.sprite.angle = 0-45;

            }

            this.spdy = 4+Math.random()*2;

            this.state = 'back';
        }



    },

    preload : function() {
    },



    create: function () {

        music_main.stop();
        if (sound_on)
            music_pvz.play();

        this.hp = this.maxhp;
        this.spd = 3;

        this.cat_reload = -1;

        this.back = this.game.add.tileSprite(0,0,WIDTH,HEIGHT,'pvz-back');



        this.cars = 6;
        this.car = [null,null,null,null,null,null];
        this.car_off = [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]
        for (let i=0;i<this.cars;i++)
        {
            let yy = 30+i*280;

            this.car[i] = this.game.add.sprite(WIDTH/2,yy,i%2===1 ? 'pvz-truck0' : 'pvz-truck1');
            this.car[i].anchor.setTo(0.5);

            if (i===3)
            {
                this.cat_back = this.game.add.sprite(WIDTH/2,yy,'pvz-cat-back');
                this.cat_back.anchor.setTo(0.5);

                this.cat = this.game.add.sprite(WIDTH/2,yy,'pvz-cat');
                this.cat.anchor.setTo(0.5,0.3);

                this.cat_x = WIDTH/2;
                this.cat_y = yy;
            }

        }



        this.mans = 10;
        this.man = [null,null,null,null,null,null,null,null,null,null];

        for (let i=0;i<this.mans;i++)
        {
            this.man[i] = new this.Man(this);
            //this.man[i].init();
        }



        this.balls = 5;
        this.ball = [null,null,null,null,null];
        this.ball_i = 0;

        for (let i=0;i<this.balls;i++)
            this.ball[i] = new this.Ball(this);






        this.trees = [this.game.add.tileSprite(-150/2,0,150,HEIGHT,'pvz-trees'),this.game.add.tileSprite(WIDTH-150/2,0,150,HEIGHT,'pvz-trees')]




        this.add.button(0, 0, 'common-goback', function () {

            game.exitMiniGameSignal.dispatch();
        },this);


        this.message_box = new MessageBox(this);
        this.message_box.show("game_intro",2);

        this.endGame = false;
        this.canControl = false;

        this.aa = 0;
        this.timer = this.total_time;


        this.hp_label = this.game.add.text(WIDTH*0.6,40,'4/15',{font: '24pt PIX'});
        this.hp_label.addColor("#ff7f1e",0);


        this.game.input.onDown.add(this.click,this);


        this.snd_kill = [this.game.add.audio('pvz-snd-kill1'),
            this.game.add.audio('pvz-snd-kill2'),
            this.game.add.audio('pvz-snd-kill3'),
            this.game.add.audio('pvz-snd-kill4')]
        this.snd_punch = this.game.add.audio('pvz-snd-punch');
        this.snd_reload = this.game.add.audio('pvz-snd-reload');
        this.snd_shot = this.game.add.audio('pvz-snd-shot');
    },

    StartControl : function()
    {
        this.canControl = true;
    },
    Loose : function()
    {
        this.endGame = true;
        this.canControl = false;
        this.message_box.show("loose",2);
    },

    Win : function ()
    {
        this.endGame = true;
        this.canControl = false;
        this.message_box.show("win",2);
    },

    click: function()
    {

        if (this.cat_reload<0)
        {

            if (sound_on)
                this.snd_shot.play();

            let angle = Phaser.Point.angle({x:this.cat_x,y:this.cat_y},{x:this.game.input.x,y:this.game.input.y});
            let dist = Phaser.Point.distance({x:this.cat_x,y:this.cat_y},{x:this.game.input.x,y:this.game.input.y});
            this.ball_i+=1;
            if (this.ball_i>=this.balls)
                this.ball_i =0 ;
            this.ball[this.ball_i].init(this.cat_x,this.cat_y,angle,dist);
            this.cat_reload = 1;

            this.cat.rotation = angle-0.5*Math.PI;
        }




    },

    update: function () {
        this.back.tilePosition.y+=this.spd;
        this.trees[0].tilePosition.y+=this.spd;
        this.trees[1].tilePosition.y+=this.spd;


        this.aa+=0.05;
        for (let i=0;i<this.cars;i++)
        {

            let sc = 1+Math.sin(this.aa+this.car_off[i])*0.04;
            this.car[i].scale.setTo(sc);

            if (i===3)
            {
                this.cat_back.scale.setTo(sc);
                this.cat.scale.setTo(sc);
            }
        }


        for (let i=0;i<this.balls;i++)
            for (let j=0;j<this.mans;j++)
                if (this.ball[i].sprite.visible && this.man[j].sprite.visible)
                    if (!this.ball[i].fallen && !(this.man[j].state==='back'))
                    {
                        let d = Phaser.Point.distance(
                            {x:this.ball[i].sprite.x,y:this.ball[i].sprite.y},
                            {x:this.man[j].sprite.x,y:this.man[j].sprite.y});

                        if (d<40)
                        {
                            if (sound_on)
                                this.snd_kill[Math.floor(Math.random()*3)].play();

                            this.ball[i].fall();
                            this.ball[i].spdy-=2;
                            this.man[j].back();
                        }
                    }

        for (let i=0;i<this.balls;i++)
            this.ball[i].update();


        let total =0;

        for (let i=0;i<this.mans;i++)
            if (this.man[i].sprite.visible)
            {
                total+=1;
                this.man[i].update();
            }



        if (this.cat_reload>=0)
        {

            if (this.cat_relad-1/50<0)
            {
                if (sound_on)
                    this.snd_reload.play();
            }


            this.cat_reload -= 1/50;

            if (this.cat_reload>0.6)
                this.cat.frame = 2;
            else
                this.cat.frame = 0;

        }
        else
            this.cat.frame = 1;




        if (this.canControl)
            this.timer-=1/60;


        this.hp_label.text = this.hp+'/'+this.maxhp;

        if (this.timer>0)
        {
            if (Math.random()<0.02 && total <1+(1-this.timer/this.total_time)*6)
            {

                let c = -1;

                for (let i=0;i<this.mans;i++)
                    if (!this.man[i].sprite.visible)
                        c = i;

                if (c!==-1)
                    this.man[c].init();
            }
        }
        else
        {
            this.timer = 0;

            if (total<=0 && !this.endGame)
            {
                this.Win();
            }
        }


        if (this.hp<=0 && !this.endGame)
        {
            this.Loose();
        }


        if (this.endGame && this.spd>0)
            this.spd-=0.01;



    }



};
