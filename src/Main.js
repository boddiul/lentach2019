memetxt = [
    "Дверь запили",
    "Я вам запрещаю срать",
    "Show me da wey",
    "Яяяязь",
    "А что, звучит хайпово",
    "Ух, многоэтажка",
    "Данила, ты что крэйзи",
    "Супербл",
    "Как тебе такое, Илон Маск?",
    "Узнали? Согласны?",
    "Омайгадбл",
    "Мышь (кродёться)",
    "Ведьмаку заплатите чеканной монетой",
    "Воруй убивай",
    "Я идиот, убейте меня",
    "Привет, медвед!",
    "Йа криведко",
    "Чилипиздрик",
    "Чикибамбони",
    "Что дальше? Чайник с функцией «жопа»?",
    "Щачло попячся",
    "Окей, бумер!",
    "Зима близко",
    "Нельзя просто так взять и…",
    "Трололо",
    "Дратути",
    "На донышке",
    "АДВОКАААААТ",
    "Дирижабль. Ага",
    "Я ломал стекло",
    "А сегодня в завтрашний день не все могут смотреть",
    "Плакала половина маршрутки",
    "Охлади своё траханье",
    "Дед, смотри, собака сидит",
    "Сын маминой подруги",
    "Press F",
    "ЪУЪ СЪУКА",
    "Так, блэт",
    "Олды тут?",
    "Кандибобер",
    "Кандидат от народа!",
    "Ооо, либераху порвало",
    "+15 рублей",
    "Легендарный Бока",
    "Популярный Жока",
    "Тьфу на тебя",
    "Пересядь с иглы мужского одобрения на мужское лицо",
    "Вжух!",
    "Ничоси",
    "Ах ты сукин сын, я в деле",
    "И тут я начинаю шмалять",
    "Ну и пузо ты отрастил!",
    "Я за огнемётом",
    "Кто нах*й",
    "Двести тысяч единиц уже готовы",
    "3,6 рентгена в час. Не отлично, но и не ужасно",
    "Это убожество зовётся Оксимирон",
    "Выйди отсюда, розбiйник",
    "Ты быканул или мне показалось?",
    "Я могу слышать изображения",
    "Ты потрясающий!",
    "Уничтожил. Низвёл до атомов",
    "I'm gonna take my horse",
    "Всё ещё достоин",
    "Куда ни пойду, везде вижу его",
    "А почему рот в говне?",
    "Слыш тебе сюда нельзя",
    "Bro, not cool",
    "Заебумба",
    "Спулае Мулае",
    "We have city to burn!",
    "С такими приколами тебе сюда",
    "За себя и за Сашку",
    "Ah shit here we go again",
    "хаха офигенно"
];

MessageBox = class {
    constructor(global) {
        this.global = global;



        this.opened = -1;

        this.is_console = false;

        this.group = this.global.game.add.group();

        this.group.x = WIDTH/2; this.group.y = HEIGHT/2;

        this.back = this.global.game.add.sprite(0,0,'common-message');
        this.back.anchor.setTo(0.5, 0.5);
        this.back.scale.setTo(2,2);

        this.back_console = this.global.game.add.sprite(0,0,'common-console');
        this.back_console.anchor.setTo(0.5, 0.5);
        this.back_console.scale.setTo(2,2);

        this.width = [280*2,320*2];
        this.height = [380*2,520*2];


        this.bottom = 100;

        this.label = this.global.game.add.text(0,0,'...',
            {font: '22pt PIX',wordWrap:true,align: 'left', wordWrapWidth: this.width[0]*0.88});

        this.label_console = this.global.game.add.text(0,0,'...',
            {font: '18pt PIX',wordWrap:true,align: 'left', wordWrapWidth: this.width[1]*0.88});

        this.label_console.addColor('#ffffff',0);

        //this.label.padding.set(10, 10);

        this.label.setTextBounds(0-this.width[0]*0.44,0-this.height[0]*0.5+this.bottom*0.75,this.width[0]*2,this.height[0]);


        this.label_console.setTextBounds(0-this.width[1]*0.44,0-this.height[1]*0.5+this.bottom*0.75,this.width[1]*2,this.height[1]);


        this.button = this.global.game.add.button(0,this.height[0]*0.5 - this.bottom,'common-button',function (){
            this.next();
            this.onUp();
        }.bind(this),this);

        this.button_label = this.global.game.add.text(0,this.height[0]*0.5 - this.bottom,'...',{font: '22pt PIX'});
        this.button_label.anchor.setTo(0.5,0.5);﻿


        //this.button_label.padding.set(10, 10);



        this.group.add(this.back);
        this.group.add(this.back_console);
        this.group.add(this.label);
        this.group.add(this.label_console);
        this.group.add(this.button);
        this.group.add(this.button_label);


        this.group.visible = false;

        this.button.visible = false;
        this.button.anchor.setTo(0.5, 0.5);
        this.button.scale.setTo(2,2);
        this.state = '';



        this.nextType = '';



        this.global.game.input.onDown.add(this.onClick,this);

       this.global.game.input.onUp.add(this.onUp,this);
    }

    onUp() {
        if (this.opened>0.5 && !this.group.visible)
        {
            let tw =this.global.game.add.tween(this);

            tw.to({ opened:-1 },10);
            tw.start();
        }
    }

    onClick() {


        if (this.group.visible) {
            let clickedOnWindow =
                Math.abs(this.global.game.input.x - WIDTH / 2) < this.width[this.is_console ? 1 : 0] / 2 &&
                Math.abs(this.global.game.input.y - HEIGHT / 2) < this.height[this.is_console ? 1 : 0] / 2;







            if (!clickedOnWindow)
            {


                if (this.is_console || this.state==='help' || this.state==='win')
                {

                    this.next();
                }
                else
                {
                    this.group.visible = false;

                    if (this.state==='loose')
                    {
                        game.exitMiniGameSignal.dispatch();
                    }
                }
            }
            else
            {
                if (!this.button.visible)
                    this.next();
            }
        }

    }



    next() {


        switch (this.state)
        {
            case 'intro1':
                this.group.visible = false;
                break;

            case 'boost_cant':

                this.group.visible = false;
                break;
            case 'boost_can':

                game_data.buyBooster(this.arg);
                this.group.visible = false;
                break;
            case 'boost_lvl':

                openMiniGame(this.global.boosters[this.arg].lvl_id);



                this.group.visible = false;
                break;

            case 'lvl':

                openMiniGame(this.global.boosters[this.arg].lvl_id);

                game_data.saveData();
                this.group.visible = false;
                break;

            case 'clear':

                this.global.reset();

                this.group.visible = false;
                break;
            case 'game_intro':
                console.log(">>>>>");
                this.show('help',this.arg);


                break;

            case 'help':



                this.global.StartControl();
                this.group.visible = false;
                break;

            case 'win':
                game.exitMiniGameSignal.dispatch(this.arg);
                break;


            case 'loose':
                game.state.start(LVL[this.arg].name);
                break;
        }

    }

    show(state,arg) {


        console.log(state);
        let txt = '...';

        let button_txt = 'OK';
        let button_frame = -1;


        let is_console = false;


        switch (state)
        {

            case 'intro1':

                txt = 'Ура! С Новым Суверенным Интернетом! Все тесты прошли успешно и у тебя есть уникальнейшая возможность испробовать его первым! Правда, делать в нём пока особо нечего. Но есть одна лазейка, с помощь которой ты можешь сохранять мемы. Говорят, совсем скоро они станут настолько редкими, что превратятся в настоящую валюту.\n' +
                    '\n' +
                    'Скачай как можно больше мемасов, чтобы потом было с чего поорать.';

                is_console = true;

                break;

            case 'boost_cant':

                txt = 'Буст: '+this.global.boosters[arg].boost+' мем/сек'+
                    '\nБустер недоступен.\nДля покупки требуется '+this.global.boosters[arg].price+' мемов';
                button_frame = 0;

                break;
            case 'boost_can':

                txt = 'Буст: '+this.global.boosters[arg].boost+' мем/сек' +
                    '\nКупить бустер?';
                button_txt = 'Купить ('+this.global.boosters[arg].price+' мемов)';
                button_frame = 1;

                break;
            case 'boost_lvl':

                txt = 'Буст: '+this.global.boosters[arg].boost+' мем/сек'+
                    '\nВнимание! Обнаружена подозрительная активность. Для покупки бустера требуется пройти капча-игру!'
                button_txt = 'Начать Игру';
                button_frame = 1;

                break;

            case 'lvl':
                txt = 'Пройди игру ещё раз и получи бонусную охапку мемов!'+
                    '\nБонус: '+(Math.round((this.global.boosters[arg].price+5000)/2))+' мемов';
                button_txt = 'Начать Игру';
                button_frame = 1;
                break;

            case 'clear':

                txt = 'Стереть прогресс?';
                button_txt = 'Да';
                button_frame = 0;
                break;


            case 'game_intro':


                if (arg===0)
                    txt = '7 июня полиция задержала корреспондента «Медузы» Ивана Голунова по подозрению «в попытке сбыта наркотиков». Дело получило большой резонанс из-за нарушений со стороны правоохранителей, а также из-за последовавших митингов в поддержку Ивана. \n' +
                        '\n' +
                        'Позже оказалось, что пакет с веществами подкинули и журналиста отпустили из-за отсутствия доказательств его вины.\n' +
                        '\n' +
                        'Это, конечно, возмутительно. Но вы сами попробуйте нормально подкинуть пакет.';

                if (arg===1)
                    txt = 'текст про пакмана';

                if (arg===2)
                    txt = 'текст про Шуес';
                is_console = true;


                break;

            case 'help':

                txt = 'Справка по уровню';
                button_txt = 'Начать игру';
                button_frame = 1;

                break;

            case 'loose':

                txt = 'Проиграл';

                button_txt = 'RESTART';

                button_frame = 1;
                break;

            case 'win':

                txt = 'Победа';

                button_txt = 'CONTINUE';

                button_frame = 1;

                break;

        }


        this.state = state;
        this.arg = arg;
        this.group.visible = true;


        if (is_console)
        {

            this.back.visible = false;
            this.label.visible = false;
            this.button.visible = false;

            this.back_console.visible = true;
            this.label_console.visible = true;

            this.label_console.text = txt;
        }
        else
        {
            this.back.visible = true;
            this.label.visible = true;
            this.button.visible = true;

            this.back_console.visible = false;
            this.label_console.visible = false;


            this.label.text = txt;

            if (button_frame<0)
            {
                this.button.visible = false;
            }
            else
            {
                this.button.visible = true;
                this.button.frame = button_frame;
                this.button_label.text = button_txt;
            }
        }


        this.is_console = is_console;
        this.opened = 1;

        this.group.scale.setTo(0.8,0.8);
        let currentTween = this.global.game.add.tween(this.group.scale);

        currentTween.to({ x:1,y:1 },200,Phaser.Easing.Quartic.Out);
        currentTween.start();
    }
};


LVL = [
    {id:0,name:"Volleyball",price:100,ico:'vkid.exe',boost:1},
    {id:1,name:"Pacman",price:500,ico:'meeting.exe',boost:2},
    {id:2,name:"Zombies",price:1000,ico:'musor.exe',boost:5},
    {id:3,name:"Burger",price:5000,ico:'burger.exe',boost:13},
    {id:4,name:"Fire",price:10000,ico:'fire.exe',boost:47}];


let sound_on = true;

let music_main = null;
let music_volley = null;
let music_pacman = null;
let music_pvz = null;
let music_burger = null;
let music_fire = null;


let screen_clicked = false;
function screen_click() {
    screen_clicked = true;
}

document.addEventListener("click", screen_click);

GameData = class {

    constructor() {
       // this.global=global;


        if (localStorage.getItem("2420_first")== null)
            localStorage.clear();

        this.score = 0;
        this.booster_num = [0,0,0,0,0];
        this.first = 1;
        if (localStorage.getItem("2420_score")!= null)
        {
            this.score = parseInt(localStorage.getItem("2420_score"));

            for (let i=0;i<5;i++)
                this.booster_num[i] = parseInt(localStorage.getItem("2420_booster"+i));

            this.first = parseInt(localStorage.getItem("2420_first"));

        }





    }

    saveData ()  {

        localStorage.setItem("2420_score",this.score)
        for (let i=0;i<5;i++)
            localStorage.setItem("2420_booster"+i,this.booster_num[i]);

        localStorage.setItem("2420_first",this.first);
    }


    buyBooster (id) {



        this.score -= LVL[id].price;
        this.booster_num[id]+=1;
        this.saveData();
    }


};


const game_data  = new GameData();





game = new Phaser.Game(
    Game = {
        width: WIDTH,
        height: HEIGHT,
        renderer: Phaser.AUTO,
        parent: "game_container",
        transparent: false,
        antialias: false,
        physicsConfig: null,
        preserveDrawingBuffer: true,

        preload: function () {
        },

        create: function () {
        }
    }
);

States.Main = function(game) {
};




States.Main.prototype = {


    BoosterStageControl : class {
        constructor(global,lvl_index/*,lvl_id,price,ico_txt,boost*/)
        {this.global=global;

            let lvl_id = LVL[lvl_index].name;
            let price = LVL[lvl_index].price;
            let ico_txt = LVL[lvl_index].ico;
            let boost = LVL[lvl_index].boost;

            this.lvl_index = lvl_index;
            this.lvl_id = lvl_id;

            this.boost = boost;

            this.price = price;

            let xx = 30+lvl_index*(100+40)+50;
            this.booster_button = this.global.add.button(xx,700,'main-booster'+lvl_index, function () {


                if (!this.global.hud_busy())
                {

                    if (game_data.score>=this.price) {

                        this.global.message_box.show("boost_can",this.lvl_index);

                    }
                    else
                    {
                        this.global.message_box.show("boost_cant",this.lvl_index);
                    }
                }


            },this,0);
            this.booster_button.anchor.setTo(0.5,0.5);
            this.booster_button.scale.setTo(2,2);

            this.booster_button.animations.add('run',[0,1,2,3],5,true);




            /*let lx = 0; let ly = lvl_index<3 ? 0 :1;

            switch(lvl_index)
            {
                case 0: lx = -1; break;
                case 2: lx = 1; break;
                case 3: lx = -0.5;break;
                case 4: lx = 0.5;break;
            }*/

            let yy = 680-100-100+(lvl_index%2)*50;
            this.level_button = this.global.add.button(
                /*WIDTH/2+lx*210,480-100-40+ly*180,*/
                xx,yy,
                'main-level', function () {

                if (!this.global.hud_busy())
                {
                    this.global.message_box.show("lvl",this.lvl_index);
                    //openMiniGame(this.lvl_id)
                }


            },this,lvl_index,lvl_index);
            this.level_button.anchor.setTo(0.5,0.5);
            this.level_button.scale.setTo(2,2);


            this.level_label = this.global.game.add.text(xx,yy+90,ico_txt,{font: '12pt PIX'});
            this.level_label.addColor("#ffffff",0);
            this.level_label.anchor.setTo(0.5);﻿
            this.level_label.visible = false;

            this.booster_lock = this.global.add.button(xx,700,'main-locked',function () {

                if (!this.global.hud_busy()) {

                    if (game_data.score>=this.price) {

                        if (game_data.booster_num[this.lvl_index] < 1)
                            this.global.message_box.show("boost_lvl", this.lvl_index)
                        else
                        {
                            this.global.message_box.show("boost_can",this.lvl_index);
                        }

                    }
                    else
                    {
                        this.global.message_box.show("boost_cant",this.lvl_index);
                    }


                }

            },this,0);

            this.booster_lock.anchor.setTo(0.5,0.5);
            this.booster_lock.scale.setTo(2,2);

            this.booster_label = this.global.game.add.text(xx,700+80,'',{font: '16pt PIX'});
            this.booster_label.addColor("#ffffff",0);
            this.booster_label.anchor.setTo(0.5);﻿


            if (game_data.booster_num[lvl_index]<1)
                this.level_button.visible = false;
            else
                this.booster_lock.visible = false;
        }


        update() {

            this.num = game_data.booster_num[this.lvl_index];


            let anim = this.booster_button.animations.getAnimation('run').isPlaying;

            if (this.num < 1)
            {
                if (game_data.score>=this.price)
                {
                    this.booster_lock.frame = 1;
                }
                else
                {
                    this.booster_lock.frame = 0;
                }

                if (anim)
                {
                    this.booster_button.animations.stop('run',true);
                }

            }
            else
            {

                if (!anim)
                {
                    this.booster_button.animations.play('run');
                }

                this.booster_lock.visible = false;
                this.level_button.visible = true;
                this.level_label.visible = true;
                this.booster_label.text = this.num+'x'+this.boost;
            }


        }

    },

    PepeFabric : class {
        constructor(global,maxnum,scale,xx,ww,yy,hh) {
            this.global=global;
            this.maxnum = maxnum;
            this.xx = xx;
            this.yy = yy;
            this.hh = hh;
            this.scale = scale;

            this.ww = ww;


            this.pepe = [];

            for (let i=0;i<maxnum;i++)
            {
                this.pepe.push(this.global.game.add.sprite(xx,yy,'main-pepe'));
                this.pepe[i].visible = false;

                this.pepe[i].scale.setTo(scale,scale);
                this.pepe[i].anchor.setTo(0.5, 0.5);
            }


            this.curr = 0;
        }


        update() {
            for (let i=0;i<this.maxnum;i++)
            {
                if (this.pepe[i].visible)
                {
                    this.pepe[i].y-=1/3;
                    this.pepe[i].alpha -= 1/60;


                    //console.log("showing");
                    if (this.pepe[i].alpha<0.1)
                    {
                        this.pepe[i].visible = false;
                    }
                }

            }
        }


        show() {
            this.curr+=1;
            if (this.curr >= this.maxnum)
            {
                this.curr = 0;
            }

            this.pepe[this.curr].visible = true;

            this.pepe[this.curr].y = this.yy + (Math.random()-0.5)*this.hh;
            this.pepe[this.curr].x = this.xx + (Math.random()-0.5)*this.ww;

            this.pepe[this.curr].alpha = 1;
        }
    },


    Bubble : class {
        constructor(global) {

            this.global = global;
            this.back = this.global.game.add.sprite(0,0, 'main-bubble');

            this.back.anchor.setTo(0.5);

            this.label = this.global.game.add.text(0,10, 'AAAAAAAA AAA AAAAA AAAAA AAAAA AAAA AAAAA AAAAA AAAAA AAAAAA AAAAAAA',
                {font:'10pt PIX',wordWrap:true,align: 'left', wordWrapWidth: 240});
            this.label.anchor.setTo(0.5);
            this.group = this.global.game.add.group();
            this.group.x = WIDTH / 2;
            this.group.y = 300;
            this.group.scale.setTo(2);

            this.group.add(this.back);
            this.group.add(this.label);

            this.group.visible = false;
        }


        show() {
            this.group.visible = true;
            this.group.scale.setTo(0.1);




            this.label.text = memetxt[Math.floor(Math.random()*memetxt.length)];

            let tw1 = this.global.game.add.tween(this.group.scale)
                .to({ x:2,y:2 },200,Phaser.Easing.Quartic.Out);


            tw1.onComplete.add(function () {
                    let tw2 = this.global.game.add.tween(this.group.scale)
                        .to({ x:1.9,y:1.9 },3000,Phaser.Easing.Quartic.Out);
                    tw2.onComplete.add(function () {
                        let tw3 = this.global.game.add.tween(this.group.scale)
                            .to({ x:0.1,y:0.1 },300,Phaser.Easing.Back.In);
                            tw3.onComplete.add(function () {
                            this.group.visible = false;
                        },this)
                            tw3.start();
                    },this);

                    tw2.start();
                },this);

           // console.log("YEA");
                tw1.start();

        }

    },

    ButtonClicker : class {
        constructor(global) {

            this.global=global;

            this.button = this.global.add.button(WIDTH/2,950,'main-clicker', function () {



                if (!this.global.hud_busy()) {


                    game_data.score+=100;

                    this.global.button_pepe.show();

                    if (Math.random()>0.9 && !this.global.bubble.group.visible)
                    {
                        this.global.bubble.show();
                    }
                }

            },this,0,0,1,0);

            this.button.anchor.setTo(0.5, 0.5);
            this.button.scale.setTo(2,2);
        }

    },






    menu_open_tween: null,
    background: null,




    score : 0,
    boosters : null,
    button_clicker : null,
    button_pepe : null,
    bubble : null,


    message_box : null,

    hud_busy : function() {
        //return this.message_box.group.visible;///this.message_box.opened>0;

        return this.message_box.opened>0;
    },

    reset : function(){
        game_data.score = 0;



        for (let i=0;i<5;i++)
            game_data.booster_num[i] = 0;

        game_data.first = 1;

        game_data.saveData();

        this.game.state.start('Main');

    },


    preload: function () {



            this.game.scale.setGameSize(WIDTH,HEIGHT);
            /*this.game.scale.setUserScale(1, 1);

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;*/
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;

            this.game.renderer.renderSession.roundPixels = true;
            //Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);



            if (music_main===null)
            {
                music_main = game.add.audio('main-music',1,true);
                music_volley = game.add.audio('volley-music',1,true);
                music_pacman = game.add.audio('pacman-music',1,true);
                music_pvz = game.add.audio('pvz-music',1,true);
                music_burger = game.add.audio('burger-music',1,true);
                music_fire = game.add.audio('fire-music',1,true);
            }




        // this.game.load.onLoadStart.add(this.loadStart, this);
        // this.game.load.onFileComplete.add(this.fileComplete, this);
        // this.game.load.onLoadComplete.add(this.loadComplete, this);
    },

    create: function () {


        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'main-back');
        this.background.scale.setTo(2,2);


        this.boosters = [
            new this.BoosterStageControl(this,0),
            new this.BoosterStageControl(this,1),
            new this.BoosterStageControl(this,2),
            new this.BoosterStageControl(this,3),
            new this.BoosterStageControl(this,4)];



        this.button_clicker = new this.ButtonClicker(this);

        this.button_pepe = new this.PepeFabric(this,6,1.5,WIDTH/2,400,970-100,50);



        this.bubble = new this.Bubble(this);




        this.button_clear = this.game.add.button(100,1125,'main-button_clear', function () {
            if (!this.hud_busy()) {
                this.message_box.show("clear");
            }
        },this);
        this.button_clear.anchor.setTo(0.5,0.5);
        this.button_clear.scale.setTo(3,3);


        this.button_shop = this.game.add.button(WIDTH/2,1125,'main-button_shop', function () {

        },this);
        this.button_shop.anchor.setTo(0.5,0.5);
        this.button_shop.scale.setTo(3,3);

        this.button_sound = this.game.add.button(WIDTH-100,1125,'main-button_sound', function () {

        },this);
        this.button_sound.anchor.setTo(0.5,0.5);
        this.button_sound.scale.setTo(3,3);




        this.score_text = this.game.add.text(WIDTH/2,130,'0',{font: '25pt PIX'});

        this.score_text.addColor("#ffffff", 0)﻿



        this.message_box = new MessageBox(this);

        this.save_time = 5;
        this.boost_time = 1;



        if (game_data.first>0)
        {
            this.message_box.show('intro1');
            game_data.first = 0;
        }



        music_volley.stop();
        music_pacman.stop();
        music_pvz.stop();
        music_burger.stop();
        music_fire.stop();


    },

    update: function () {

        this.save_time-=1/60;


        this.boost_time-=1/60;

        if (this.save_time<0)
        {
            this.save_time = 5;
            game_data.saveData();
        }

        if (this.boost_time<0)
        {
            let sum = 0;

            for (let i=0;i<5;i++)
                sum+=game_data.booster_num[i]*this.boosters[i].boost;

            game_data.score+=sum;
            this.boost_time = 1;
        }


        
        this.score_text.text = ''+game_data.score;

        for (let i=0;i<5;i++)
            this.boosters[i].update();

        this.button_pepe.update();

        if (screen_clicked && !music_main.isPlaying)
            music_main.play();

    }



};




game.state.add('Boot', States.Boot);
game.state.add('Preloader', States.Preloader);
game.state.add('Main', States.Main);


game.exitMiniGameSignal = new Phaser.Signal();
game.exitMiniGameSignal.add(onExitState);


game.state.start('Boot');


function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

function openMiniGame(name)
{

    music_main.stop();


    switch (name) {
        case "Volleyball":
            if(game.state.states.Volleyball && game.state.checkState('Volleyball')) {
                game.state.start("Volleyball", true);
            } else {
                loadScript("src/Volleyball.js?" + Math.random(), function () {
                    game.state.add('Volleyball', States.Volleyball);
                    game.state.start("Volleyball", true);
                });
            }
            break;

        case "Pacman":
            if(game.state.states.Pacman && game.state.checkState('Pacman')) {
                game.state.start("Pacman", true);
            } else {
                loadScript("src/Pacman.js?" + Math.random(), function () {
                    game.state.add('Pacman', States.Pacman);
                    game.state.start("Pacman", true);
                });
            }
            break;

        case "Zombies":
            if(game.state.states.Zombies && game.state.checkState('Zombies')) {
                game.state.start("Zombies", true);
            } else {
                loadScript("src/Zombies.js?" + Math.random(), function () {
                    game.state.add('Zombies', States.Zombies);
                    game.state.start("Zombies", true);
                });
            }
            break;


        case "Burger":
            if(game.state.states.Burger && game.state.checkState('Burger')) {
                game.state.start("Burger", true);
            } else {
                loadScript("src/Burger.js?" + Math.random(), function () {
                    game.state.add('Burger', States.Burger);
                    game.state.start("Burger", true);
                });
            }
            break;


        case "Fire":
            if(game.state.states.Fire && game.state.checkState('Fire')) {
                game.state.start("Fire", true);
            } else {
                loadScript("src/Fire.js?" + Math.random(), function () {
                    game.state.add('Fire', States.Fire);
                    game.state.start("Fire", true);
                });
            }
            break;

    }
}

function onExitState(win = -1) {


    game.state.start("Main", true);





    if (win>=0)
    {



        if (game_data.booster_num[win]===0)
            game_data.buyBooster(win);
        else
            game_data.score+=Math.round((LVL[win].price+5000)/2);

    }

    game_data.saveData();

}