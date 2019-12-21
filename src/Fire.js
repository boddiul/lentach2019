States = {};

States.Fire = function (game) {


};

States.Fire.prototype = {



    fire : [],
    heli : [],
    trees : [],
    tree_h : 5,
    full_h : 600,



    ForestFire : class {
        constructor(global,id) {
            this.global = global;


            this.id = id;


            this.progress = 0;


            let xx =WIDTH/3*(id+0.5);

            this.line = this.global.game.add.sprite(xx,0,'fire-fire');
            this.line.anchor.set(0.5);

            this.line.animations.add('run',[0,1],7,true);
            this.line.animations.play('run');


            this.big = this.global.game.add.sprite(xx,HEIGHT-260/2,'fire-fire');
            this.big.anchor.set(0.5);

            this.big.animations.add('run',[2,3],8,true);
            this.big.animations.play('run');
            this.big.alpha = 0;

        }

        update() {



            if (this.progress<1)
                this.progress+=Math.random()*0.002;

            if (this.global.heli[this.id].active && this.global.heli[this.id].fell)
                this.progress-=0.002;

            if (this.progress>1)
                this.progress = 1;

            if (this.progress<0)
                this.progress = 0;


            if (this.progress>0.5)
            {
                if (this.big.alpha<1)
                    this.big.alpha+=0.05;
            }
            else
            {
                if (this.big.alpha>0)
                    this.big.alpha-=0.05;
            }

            this.line.y = HEIGHT-this.global.full_h*this.progress;


        }
    },

    Heli : class {

        constructor(global,id) {
            this.global = global;


            this.id = id;

            this.cx =WIDTH/3*(id+0.5);
            this.cy = 300;



            this.sprite = this.global.game.add.sprite(this.cx,this.cy,'fire-heli');

            this.sprite.anchor.setTo(0.5,0.5);


            if (Math.random()>0.5)
                this.sprite.animations.add('run',[0,1],5,true);
            else
                this.sprite.animations.add('run',[1,0],5,true);

            this.sprite.animations.play('run');



            this.emitter = this.global.game.add.emitter(WIDTH/3*(id+0.5),230);

            this.emitter.setXSpeed(-10, 10);
            this.emitter.setYSpeed(50, 150);
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
            this.emitter.y = this.sprite.y+50;

        }
    },




    preload : function() {



    },


    onDown: function() {

        let i = this.game.input.x < WIDTH/3 ? 0 : this.game.input.x<WIDTH*2/3 ? 1: 2;

        this.heli[i].changeState();

    },

    create: function () {
        this.game.add.sprite(0,0,'fire-back');
        this.add.button(0, 0, 'common-goback', function () {

            game.exitMiniGameSignal.dispatch();
        },this);

        this.trees = [];

        for (i = 0;i<3;i++)
        {
            this.trees.push([]);
            for (j=0;j<this.tree_h;j++)
            {
                let o = this.game.add.image(i*WIDTH/3,HEIGHT-50-140*(this.tree_h-j),'fire-tree',Math.random()>0.5 ? 0: 2);
                this.trees[i].push(o);

            }
            this.trees[i].reverse();
        }


        this.heli = [new this.Heli(this,0),new this.Heli(this,1),new this.Heli(this,2)];
        this.fire = [new this.ForestFire(this,0),new this.ForestFire(this,1),new this.ForestFire(this,2)];


        this.game.input.onDown.add(this.onDown,this);
    },

    update: function () {

        for (let i=0;i<3;i++)
        {
            this.heli[i].update();
            this.fire[i].update();
        }


        for (let i=0;i<3;i++)
            for (let j=0;j<this.tree_h;j++)
            {
                if (this.trees[i][j].y>this.fire[i].line.y)
                {
                    if (this.trees[i][j].frame===0)
                        this.trees[i][j].frame = 1;
                    if (this.trees[i][j].frame===2)
                        this.trees[i][j].frame = 3;

                }
            }

    }



};
