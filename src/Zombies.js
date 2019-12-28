States = {};

States.Zombies = function (game) {


};

States.Zombies.prototype = {



    Ball:class {

        constructor(global) {

            this.global =  global;

            this.sprite = this.global.game.add.sprite(0,0,'pvz-trash');
            this.sprite.visible = false;
            this.sprite.anchor.setTo(0.5);
            this.spdx = 0;
            this.spdy = 0;


        }

        init(x,y,newspd,dir) {
            this.sprite.x = x;
            this.sprite.y = y;


            this.spdx = -newspd*Math.cos(dir);
            this.spdy = -newspd*Math.sin(dir)

            this.sprite.visible = true;
        }

        update() {

            if (this.sprite.visible)
            {
                this.spdy += this.global.spd/40;

                this.sprite.x+= this.spdx;
                this.sprite.y+= this.spdy;
            }
        }
    },

    preload : function() {
    },



    create: function () {


        this.spd = 3;

        this.cat_reload = -1;

        this.back = this.game.add.tileSprite(0,0,WIDTH,HEIGHT,'pvz-back');
        this.add.button(0, 0, 'common-goback', function () {

            game.exitMiniGameSignal.dispatch();
        },this);


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


        this.balls = 5;
        this.ball = [null,null,null,null,null];
        this.ball_i = 0;

        for (let i=0;i<this.balls;i++)
            this.ball[i] = new this.Ball(this);


        this.aa = 0;


        this.game.input.onUp.add(this.click,this);
    },

    click: function()
    {

        if (this.cat_reload<0)
        {
            let angle = Phaser.Point.angle({x:this.cat_x,y:this.cat_y},{x:this.game.input.x,y:this.game.input.y});
            this.ball_i+=1;
            if (this.ball_i>=this.balls)
                this.ball_i =0 ;
            this.ball[this.ball_i].init(this.cat_x,this.cat_y,10,angle);
            this.cat_reload = 1;

            this.cat.rotation = angle-0.5*Math.PI;
        }




    },

    update: function () {
        this.back.tilePosition.y+=this.spd;


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
            this.ball[i].update();



        if (this.cat_reload>=0)
        {

            this.cat_reload -= 1/50;

            if (this.cat_reload>0.6)
                this.cat.frame = 2;
            else
                this.cat.frame = 0;

        }
        else
            this.cat.frame = 1;





    }



};
