States = {};

States.Fire = function (game) {


};

States.Fire.prototype = {



    fire : [],
    heli : [],
    trees : [],
    tree_h : 5,
    full_h : 700,
    total_time : 30,
    change_time : 3,



    ForestFire : class {
        constructor(global,id) {
            this.global = global;



            this.active = false;

            this.id = id;


            this.progress = 0;


            let xx =WIDTH/3*(id+0.5);

            this.line = this.global.game.add.sprite(xx,0,'fire-fire');
            this.line.anchor.set(0,0.5);

            this.line.animations.add('run',[0,1,2,3,4,5],7,true);
            this.line.animations.play('run');

            this.line2 = this.global.game.add.sprite(xx,0,'fire-fire');
            this.line2.anchor.set(1,0.5);

            this.line2.animations.add('run',[4,5,0,1,2,3],7,true);
            this.line2.animations.play('run');



            /*this.big = this.global.game.add.sprite(xx,HEIGHT-260/2,'fire-fire');
            this.big.anchor.set(0.5);

            this.big.animations.add('run',[2,3],8,true);
            this.big.animations.play('run');
            this.big.alpha = 0;*/

        }

        update() {





            if (this.global.timer>0 && this.global.canControl)
            {
                if (this.progress<1)
                    this.progress+=(this.active ? 2 : 1)*Math.random()*0.002 ;
            }


            if (this.global.heli[this.id].active && this.global.heli[this.id].fell)
                this.progress-=0.004;

            if (this.progress>1)
                this.progress = 1;

            if (this.progress<0)
                this.progress = 0;

/*
            if (this.progress>0.5)
            {
                if (this.big.alpha<1)
                    this.big.alpha+=0.05;
            }
            else
            {
                if (this.big.alpha>0)
                    this.big.alpha-=0.05;
            }*/

            this.line.y = HEIGHT-this.global.full_h*this.progress;
            this.line2.y = this.line.y

        }
    },

    Heli : class {

        constructor(global,id) {
            this.global = global;


            this.id = id;

            this.cx =WIDTH/3*(id+0.5);
            this.cy = 250;



            this.sprite = this.global.game.add.sprite(this.cx,this.cy,'fire-heli');

            this.sprite.anchor.setTo(0.5,0.5);


            if (Math.random()>0.5)
                this.sprite.animations.add('run',[0,1],5,true);
            else
                this.sprite.animations.add('run',[1,0],5,true);


            if (Math.random()>0.5)
                this.sprite.scale.setTo(-1,1);

            this.sprite.animations.play('run');



            this.emitter = this.global.game.add.emitter(WIDTH/3*(id+0.5),230);

            this.emitter.setXSpeed(-10, 10);
            this.emitter.setYSpeed(50, 150);
            this.emitter.setRotation(0, 0);
            this.emitter.makeParticles('fire-water', 0, 250, true, true);

           // this.emitter.bottom = HEIGHT-300;
            this.emitter.lifespan = 5000;
            this.a = Math.random();

            this.active = false;

            this.fell = false;


        }



        changeState() {

            this.active = !this.active;

            if (this.active)
            {
                this.fell = false;
            }

            this.emitter.on = this.active;
        }

        update() {


            let sutface = this.global.fire[this.id].line.y;//HEIGHT-100;

            let f = false;
            this.emitter.forEachAlive(
                function(bubble) {
                    if (bubble.y>sutface)
                    {
                        f = true;
                        bubble.kill()
                    }

                });﻿﻿

            if (f)
                this.fell = true;


            this.a+=0.1;


            let xx,yy;


            if (this.active)
            {
                xx = this.cx+Math.cos(this.a)*10;
                yy = this.cy + 70 + Math.sin(this.a)*10;


                this.global.money-=0.0015;
            }
            else
            {
                xx = this.cx;
                yy = this.cy + Math.sin(this.a)*10;
            }

            let ff = 0.1;
            let dx = this.sprite.x-xx;

            if (Math.abs(dx)<ff)
            {
                this.sprite.x = xx;
            }
            else
                this.sprite.x-=dx*0.1;

            let dy = this.sprite.y-yy;
            if (Math.abs(dy)<ff)
            {
                this.sprite.y = yy;
            }
            else
                this.sprite.y-=dy*0.1;



            this.emitter.x = this.sprite.x;
            this.emitter.y = this.sprite.y+90;

        }
    },




    preload : function() {



    },


    onDown: function() {


        if (this.canControl)
        {

            let i = this.game.input.x < WIDTH/3 ? 0 : this.game.input.x<WIDTH*2/3 ? 1: 2;

            if ((!this.heli[i].active && this.money>0.2) ||this.heli[i].active)
                this.heli[i].changeState();

        }

    },

    create: function () {


        music_main.stop();
        //music_fire.play();

        this.game.add.sprite(0,0,'fire-back');


        this.trees = [];

        for (i = 0;i<3;i++)
        {
            this.trees.push([]);
            for (j=0;j<this.tree_h;j++)
            {
                let o = this.game.add.image(i*WIDTH/3+288/2-20,HEIGHT-50-160*(this.tree_h-j),'fire-tree',Math.random()>0.5 ? 0: 2);

                o.anchor.setTo(0.5,0);
                if (Math.random()>0.5)
                    o.scale.setTo(-1,1);
                this.trees[i].push(o);

            }
            this.trees[i].reverse();
        }





        this.fog = this.game.add.sprite(0,0,'fire-fog');
        this.fog.alpha = 0;

        this.heli = [new this.Heli(this,0),new this.Heli(this,1),new this.Heli(this,2)];
        this.fire = [new this.ForestFire(this,0),new this.ForestFire(this,1),new this.ForestFire(this,2)];


        this.add.button(0, 0, 'common-goback', function () {

            game.exitMiniGameSignal.dispatch();
        },this);

        this.game.input.onDown.add(this.onDown,this);


        this.bar_bg = this.game.add.sprite(WIDTH/2,90,'fire-bar-bg');
        this.bar_bg.anchor.setTo(0.5);
        this.bar = this.game.add.sprite(265,75,'fire-bar');

        this.bar.width = 260;

        this.message_box = new MessageBox(this);

        this.message_box.show("game_intro",4)


        this.canControl = false;
        this.endGame = false;

        this.timer = this.total_time;
        this.change_timer = this.change_time;

        this.money = 1;

    },

    StartControl : function()
    {
        this.canControl = true;
    },

    Loose : function()
    {
        this.endGame = true;
        this.message_box.show("loose",4);
    },

    Win : function ()
    {
        this.endGame = true;
        this.message_box.show("win",4);
    },


    update: function () {






        if (this.canControl && !this.endGame)
        {

            if (this.money<1)
                this.money+=0.002;


            if (this.money<0.15)
            {
                for (let i=0;i<3;i++)
                    if (this.heli[i].active)
                    {
                        this.heli[i].changeState();
                    }
            }

            this.timer -= 1/60;
            this.change_timer -= 1/60;

            if (this.change_timer <=0)
            {

                for (let i=0;i<3;i++)
                    this.fire[i].active = false;

                this.fire[Math.floor(Math.random()*3)].active = true;
                this.fire[Math.floor(Math.random()*3)].active = true;

                this.change_timer = this.change_time;

            }
        }


        for (let i=0;i<3;i++)
        {
            this.heli[i].update();
            this.fire[i].update();
        }

        this.fog.alpha = Math.max(this.fire[0].progress,this.fire[1].progress,this.fire[2].progress);


        let left_trees = 0;

        for (let i=0;i<3;i++)
            for (let j=0;j<this.tree_h;j++)
            {
                if (this.trees[i][j].y>this.fire[i].line.y-170)
                {
                    console.log("?????DAFAFDF");

                    if (this.trees[i][j].frame===0)
                        this.trees[i][j].frame = 1;
                    if (this.trees[i][j].frame===2)
                        this.trees[i][j].frame = 3;



                }

                if (this.trees[i][j].frame===0 || this.trees[i][j].frame===2)
                    left_trees+=1;
            }


        if (left_trees<1 && !this.endGame)
        {
            this.Loose();
        }


        if (!this.endGame && this.timer<0)
        {
            if (this.fire[0].progress<0.1 && this.fire[1].progress<0.1 && this.fire[2].progress<0.1)
            {
                this.Win();
            }
        }




        this.bar.width = 260*this.money;
    }



};
