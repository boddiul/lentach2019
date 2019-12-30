memetxt = [
    "Дверь мне запили",
    "Я вам запрещаю срать",
    "Show me da wae",
    "Яяяязь",
    "А что, звучит хайпово",
    "Ух, многоэтажка",
    "Данила, ты что крэйзи?",
    "Супербл",
    "Как тебе такое, Илон Маск?",
    "Узнали? Согласны?",
    "Омайгадбл",
    "Мышь (кродёться)",
    "Ведьмаку заплатите чеканной монетой",
    "Воруй убивай",
    "Я идиот, убейте меня",
    "Превед, медвед!",
    "Йа креведко",
    "Чилипиздрик",
    "Чикибамбони",
    "Что дальше? Чайник с функцией «жопа»?",
    "ЩАЧЛО ПОПЯЧТСЯ",
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
    "You're breathtaking",
    "Уничтожил. Низвёл до атомов",
    "I'm gonna take my horse",
    "Всё ещё достоин",
    "Куда ни пойду, везде вижу его",
    "А почему рот в говне?",
    "Слыш тебе сюда нельзя",
    "Bro, not cool",
    "Заебумба",
    "Спулае Мулае",
    "We have a city to burn!",
    "С такими приколами тебе сюда",
    "За себя и за Сашку",
    "Ah shit here we go again",
    "хаха офигенно",
"Верни мне мой 2007-й",
"Сложный прикол",
"Скр скр скр скр",
"Время для очередного крестового похода",
"Never gonna give you up",
"У меня так друг умер",
"Спасибо, кэп",
"С блэкджеком и шлюхами",
"Зима близко",
"28 ударов ножом",
"Всё очень плохо",
"Я - скорость",
"No homo",
"*Бьёт по крыше автомобиля*",
"Ну да, ну да, пошел я на хер",
"146%",
"And his name is John Cena",
"Джокушка Ловушкера",
"Why so serious?",
"The ting goes skrrrr pa",
"Мы с пацанами",
"Stonks",
"F",
"Идеальный баланс",
"Bitch, please",
"Science, bitch!",
"I wanna see you cry, bitch!",
"Это Спарта!",
"Shut up and take my money!",
"Со смыслом",
"Пол - это лава",
"This is fine",
"Да, но вообще-то нет",
"Why are you gay?",
"Бегите, глупцы!"
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


        this.snd_win = this.global.game.add.audio('common-win');
        this.snd_loose = this.global.game.add.audio('common-loose');

        this.bottom = 100;

        this.help = this.global.game.add.sprite(0,140,'common-help');
        this.help.anchor.setTo(0.5, 0.5);
        this.help.scale.setTo(2,2);

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
        this.group.add(this.help);
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

        let help_frame = -1;

        let is_console = false;


        switch (state)
        {

            case 'intro1':

                txt = 'Ура! С Новым Суверенным Интернетом! Тесты прошли успешно и у тебя есть уникальная возможность испробовать его первым! Точнее, у тебя есть важная миссия — необходимо сохранить все мемы. Говорят, совсем скоро они станут настолько редкими, что превратятся в настоящую валюту.\n' +
                    '\n' +
                    'Скачай как можно больше мемасов, чтобы потом было с чего поорать.'

                is_console = true;

                break;

            case 'tutorial_100':
                txt = 'Это бустеры — мемные вирусы, которые помогут тебе скачивать продуктивнее. \n' +
                    '\n' +
                    'Чтобы открыть бустер, нужно доказать товарищу майору, что ты не злоумышленник и пройти капчу.';

                help_frame = 0;

                break;

            case 'tutorial_game':
                txt = 'Так держать, ты доказал, что ты добропорядочный гражданин! Теперь можно спокойно приобрести бустер.\n' +
                    '\n' +
                    'Кстати, капчу можно проходить повторно, чтобы получить дополнительные мемчики.';

                help_frame = 0;
                break;

            case 'final':
                txt = 'Отлично, ты прошел всю капчу. Но это не значит, что ты не можешь пройти её ещё раз — играй в игры и зарабатывай дополнительные мемы!';



                break;

            case 'boost_cant':

                txt = 'Буст: '+this.global.boosters[arg].boost+' мем/сек'+
                    '\nБустер недоступен.\nДля покупки требуется '+Math.round(this.global.boosters[arg].price*getKoef(game_data.booster_num[arg]))+' мемов';
                button_frame = 0;

                break;
            case 'boost_can':

                txt = 'Буст: '+this.global.boosters[arg].boost+' мем/сек' +
                    '\nКупить бустер?';
                button_txt = 'Купить ('+Math.round(this.global.boosters[arg].price*getKoef(game_data.booster_num[arg]))+' мемов)';
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
                    '\nБонус: '+(Math.round((this.global.boosters[arg].price+2500)/2))+' мемов';
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
                    txt = '7 июня полиция задержала корреспондента «Медузы» Ивана Голунова по подозрению «в попытке сбыта наркотиков». Дело получило большой резонанс из-за нарушений со стороны правоохранителей, а также из-за митингов в поддержку Ивана. \n' +
                        '\n' +
                        'Позже оказалось, что пакет с веществами подкинули и журналиста отпустили.\n' +
                        '\n' +
                        'Это, конечно, возмутительно. Но вы сами попробуйте нормально подкинуть обычный пакет.';

                if (arg===1)
                    txt = '27 июля в Москве прошла несогласованная акция протеста «За честные выборы», в ходе которой было задержано рекордное количество человек.\n' +
                        '\n' +
                        'Акция дала старт расследованию «Московского дела», некоторых фигурантов которого обвинили в таких нарушениях, как бросок пластиковой бутылки или стаканчика в сторону силовика.\n' +
                        '\n' +
                        'Это, конечно, возмутительно. Но вы сами попробуйте нормально задержать митингующих, когда вокруг опасность.';

                if (arg===2)
                    txt = 'Рядом со станцией Шиес запланировали построить мусорный полигон. Это очень возмутило местных жителей, которые начали всячески мешать строительству.\n' +
                        '\n' +
                        'Сотрудники местного ЧОП избивали экоактивистов, а силовики задерживали противников строительства и вменяли им различные правонарушения. Позже стройку приостановили. Её возобновят только после общественных слушаний и экспертиз.\n' +
                        '\n' +
                        'Это, конечно, возмутительно. Но вы сами попробуйте завезти технику, когда проезду мешают активисты.\n';


                if (arg===3)
                    txt = '«Хлопну бургер за здоровье Собянина» \n' +
                        '\n' +
                        'Тимати и Гуф поздравили Москву с днём рождения и сняли очень неоднозначный клип. Ролик вышел за день до выборов в Мосгордуму и получил более 1 000 000 дизлайков, что стало рекордом русского ютьюба.\n' +
                        '\n' +
                        'Позже клип удалили.\n' +
                        '\n' +
                        'Это, конечно, возмутительно. Но всё-таки хлопни бургер за здоровье Сергея Семёновича.';


                if (arg===4)
                    txt = 'Одна из главных тем года в России — пожары в Сибири. В июле площадь горящего леса превысила 3 000 000 гектаров, а многие города погрузились в смог.\n' +
                        'Однако, несмотря на масштабы пожаров, МЧС и региональные власти не собирались тушить лес. По их мнению, бороться с такими пожарами было «экономически невыгодно», так как они не представляли угрозы людям и инфраструктуре.\n' +
                        'И только после введения режима ЧС в пяти регионах, а также возмущения людей по всему миру, с пожарами стали бороться.\n' +
                        '\n' +
                        'Это, конечно, возмутительно. Но вы сами посмотрите, как это всё экономически невыгодно.';



                is_console = true;

                break;

            case 'help':

                switch (arg)
                {
                    case 0: txt = 'Тапай по клеткам для перемещения по полю. Для того, чтобы отбить пакет, тапай по сотруднику.';
                        break;
                    case 1: txt = 'Используй руль, либо стрелки, чтобы перемещаться по улицам и подбирать протестующих. Остерегайся пластиковой продукции!';break;
                    case 2: txt = 'Тапай, чтобы выстрелить мусорным пакетом. Защищай колонну спецтехники';break;
                    case 3: txt = 'Отшлёпай все бургеры за здоровье мэра. Но остерегайся творчества российских рэперов.';break;
                    case 4: txt = 'Тапай по вертолётам, чтобы переключать поток воды.Постарайся сделать всё так, чтобы тушение леса было экономически выгодным.';break;
                }

                help_frame = arg+1;

                button_txt = 'Начать игру';
                button_frame = 1;

                break;

            case 'loose':

                switch (arg)
                {
                    case 0: txt = 'Похоже, кому-то нужно поработать над бросками. Ты проиграл.';break;
                    case 1: txt = 'Пластмассовый мир победил, стакан оказался сильней. Не в этот раз, нужно залечить раны.';break;
                    case 2: txt = 'Экоактивисты добились своего. Строительство прикрыли, ты проиграл.';break;
                    case 3: txt = 'Кажется, ты весь в русском рэпе. Прими душ и начинай заново.';break;
                    case 4: txt = 'Ну нет, держать при себе такого пожарного экономически невыгодно. ';break;
                }


                button_txt = 'RESTART';

                button_frame = 1;

				if (sound_on)
                this.snd_loose.play();
                break;

            case 'win':

                switch (arg)
                {
                    case 0: txt = 'Груз на месте… Птичка в клетке… Суп в холодильнике… В общем, всё получилось, поздравляю!';break;
                    case 1: txt = 'Виу-виу! Все бузотёры отправлены в автозак. Так держать!';break;
                    case 2: txt = 'Отлично! Спецтехника на месте, сейчас мы будем строить все полигоны.';break;
                    case 3: txt = 'Йо! Здоровье в порядке, все бургеры отшлёпаны. Ты выиграл этот бой, бой.';break;
                    case 4: txt = 'Леса спасены, деньги сохранены, все довольны.';break;
                }

                button_txt = 'CONTINUE';

                button_frame = 1;

if (sound_on)
                this.snd_win.play();

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
            this.button_label.visible = false;

            this.help.visible = false;

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

            if (help_frame<0)
            {
                this.help.visible = false;
            }
            else
            {
                this.help.visible = true;
                this.help.frame = help_frame;
            }

            if (button_frame<0)
            {
                this.button.visible = false;
            }
            else
            {
                this.button.visible = true;
                this.button_label.visible = true;
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
    {id:0,name:"Volleyball",price:50,ico:'vkid.exe',boost:1},
    {id:1,name:"Pacman",price:250,ico:'meeting.exe',boost:2},
    {id:2,name:"Zombies",price:500,ico:'musor.exe',boost:5},
    {id:3,name:"Burger",price:2500,ico:'burger.exe',boost:13},
    {id:4,name:"Fire",price:5000,ico:'fire.exe',boost:47}];

BUT = [
    {id:0,name:"clicker",unlock:0,frames:2},
    {id:1,name:"f",unlock:300,frames:2},
    {id:2,name:"coin",unlock:8000,frames:5},
    {id:3,name:"dont",unlock:50000,frames:2},
    {id:4,name:"milos",unlock:100000,frames:2},
    {id:5,name:"pig",unlock:500000,frames:5},
];

getKoef = function (num) {
    r = 1.0;
    for (let i=0;i<num;i++)
        r*=1.05;


    console.log(r);
    return r;
}

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
document.addEventListener("touchstart", screen_click);


GameData = class {

    constructor() {
       // this.global=global;


        if (localStorage.getItem("2420_maxscore")== null)
            localStorage.clear();

        this.score = 0;
        this.booster_num = [0,0,0,0,0];
        this.first = 1;
        this.maxscore = 0;
        if (localStorage.getItem("2420_score")!= null)
        {
            this.score = parseInt(localStorage.getItem("2420_score"));

            for (let i=0;i<5;i++)
                this.booster_num[i] = parseInt(localStorage.getItem("2420_booster"+i));

            this.first = parseInt(localStorage.getItem("2420_first"));

            this.maxscore =  parseInt(localStorage.getItem("2420_maxscore"));

        }





    }

    saveData ()  {

        localStorage.setItem("2420_score",this.score);
        localStorage.setItem("2420_maxscore",this.maxscore);
        for (let i=0;i<5;i++)
            localStorage.setItem("2420_booster"+i,this.booster_num[i]);

        localStorage.setItem("2420_first",this.first);
    }


    buyBooster (id) {



        this.score -= Math.round(LVL[id].price*getKoef(game_data.booster_num[id]));



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

            this.pepey = 100;
            this.pepe = this.global.game.add.sprite(120,this.pepey,'main-pepe-laugh');



            this.laugh = -1;
            this.fff = false;

            this.pepe.scale.setTo(2);


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


        update()
        {

            if (this.laugh>0)
            {
                this.laugh-=1/60;
                this.pepe.y = this.pepey+Math.sin(this.laugh*18)*8;
                this.pepe.frame = 1;
            }
            else
            {

                this.pepe.y = this.pepey;


                if (this.fff)
                    this.pepe.frame = 1;
                else
                    this.pepe.frame = 0;
            }
        }

        show() {
            this.group.visible = true;
            this.group.scale.setTo(0.1);





            this.label.text = memetxt[Math.floor(Math.random()*memetxt.length)];

            let tw1 = this.global.game.add.tween(this.group.scale)
                .to({ x:2,y:2 },200,Phaser.Easing.Quartic.Out);


            tw1.onComplete.add(function () {
                    this.laugh = 1;
                    this.fff = true;
                    let tw2 = this.global.game.add.tween(this.group.scale)
                        .to({ x:1.9,y:1.9 },3000,Phaser.Easing.Quartic.Out);
                    tw2.onComplete.add(function () {
                        this.fff = false;
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



            this.button =[null,null,null,null,null,null];
            this.snd =[null,null,null,null,null,null];

            for (let i=0;i<6;i++)
            {
                if (BUT[i].frames>2)
                {
                    this.button[i] = this.global.game.add.button(WIDTH/2,950,'main-'+BUT[i].name,this.click,this);
                    this.button[i].animations.add('click',[1,2,3,4,0],15,false);
                }
                else
                {
                    this.button[i] = this.global.game.add.button(WIDTH/2,950,'main-'+BUT[i].name,this.click,this,0,0,1)
                }


                this.button[i].anchor.setTo(0.5, 0.5);
                this.button[i].scale.setTo(2,2);
                this.button[i].visible = false;

                this.snd[i] = this.global.game.add.audio('main-snd-'+BUT[i].name);
            }


            this.curr = 0;
            this.button[0].visible = true;


        }

        setCurr(i){
            this.button[this.curr].visible = false;
            this.curr = i;
            this.button[this.curr].visible = true;
        }
        click() {

                if (!this.global.hud_busy()) {



                    if (BUT[this.curr].frames>2)
                        this.button[this.curr].animations.play('click');

                    if (sound_on)
                        this.snd[this.curr].play();
                    game_data.score+=1;

                    if (game_data.score>game_data.maxscore)
                    {
                        game_data.maxscore = game_data.score;

                        this.global.shop.checkUnlock();
                    }

                    this.global.button_pepe.show();

                    if (Math.random()>0.9 && !this.global.bubble.group.visible)
                    {
                        this.global.bubble.show();
                    }
                }

        }

    },


    Shop : class {
        constructor(global) {

            this.global = global;

            this.group = this.global.game.add.group();

            this.back = this.global.game.add.sprite(WIDTH/2,HEIGHT/2-100,'main-shop');
            this.back.scale.setTo(2);
            this.back.anchor.setTo(0.5);


            this.width= 310*2;
            this.height = 440*2;

            this.group.add(this.back);


            this.snd_vvv = this.global.game.add.audio('main-vvv');

            this.button = [];
            this.locked = [];
            this.locker = [];

            let xy = [[0,0],[-1,1],[1,1],[-1,2],[1,2],[0,3]]

            for (let i=0;i<6;i++)
            {
                this.button.push(this.global.game.add.button(WIDTH/2+xy[i][0]*120,HEIGHT/2-this.width*0.45+xy[i][1]*190-100,
                    'main-'+BUT[i].name,function() {

                    let bestd =-1;
                    let id = 0;
                        for (let i=0;i<6;i++)
                        {
                            let d = Phaser.Point.distance({x:this.button[i].x,y:this.button[i].y},{x:this.global.game.input.x,y:this.global.game.input.y});

                            if (d<bestd || bestd ===-1)
                            {
                                bestd = d;
                                id = i;
                            }
                        }

                        this.global.button_clicker.setCurr(id);
                        if (sound_on)
                            this.global.button_clicker.snd[id].play();

                    },this));
                this.button[i].scale.setTo(1.5);
                this.button[i].anchor.setTo(0.5);
                this.group.add(this.button[i]);


                this.locked.push(game_data.maxscore<BUT[i].unlock);

                this.locker.push(this.global.game.add.image(this.button[i].x,this.button[i].y,'main-shop-locked'));

                this.locker[i].anchor.setTo(0.5);
                this.locker[i].visible = this.locked[i];
                this.button[i].visible = !this.locked[i];

                this.group.add(this.locker[i]);

            }

            this.group.visible = false;
            this.opened = -1;


            this.aa = 0;

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
                    Math.abs(this.global.game.input.x - WIDTH / 2) < this.width / 2 &&
                    Math.abs(this.global.game.input.y - HEIGHT / 2+100) < this.height / 2;


                if (!clickedOnWindow)
                {
                    this.close();

                }


            }

        }


        checkUnlock() {
            for (let i=0;i<6;i++)
                if (this.locked[i] && BUT[i].unlock<=game_data.maxscore)
                {
                    this.locked[i] = false
                    this.locker[i].visible = false;
                    this.button[i].visible = true;


                    this.global.button_shop.frame = 1;

                    this.aa = 0;

                    if (sound_on)
                        this.snd_vvv.play();

                    let tw = this.global.game.add.tween(this);
                    tw.to({aa:100},2000);
                    tw.onUpdateCallback(function () {
                        this.global.button_shop.x = WIDTH/2+Math.cos(this.aa)*8;
                    }, this﻿﻿);
                    tw.start();﻿
                }
        }

        open() {
            this.group.visible = true;

            this.opened = 1;
        }

        close(){
            this.group.visible = false;
            this.global.button_shop.frame = 0;
        }


    },






    menu_open_tween: null,
    background: null,




    score : 0,
    boosters : null,
    button_clicker : null,
    shop : null,
    button_pepe : null,
    bubble : null,


    message_box : null,

    hud_busy : function() {
        //return this.message_box.group.visible;///this.message_box.opened>0;

        return this.message_box.opened>0 || this.shop.opened>0;
    },

    reset : function(){
        game_data.score = 0;

        game_data.maxscore = 0;


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
                music_main = game.add.audio('main-music',0.8,true);
                music_volley = game.add.audio('volley-music',0.5,true);
                music_pacman = game.add.audio('pacman-music',0.8,true);
                music_pvz = game.add.audio('pvz-music',0.4,true);
                music_burger = game.add.audio('burger-music',0.4,true);
                music_fire = game.add.audio('fire-music',0.5,true);
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

        this.button_pepe = new this.PepeFabric(this,6,1.5,WIDTH/2,300,970-100,50);



        this.bubble = new this.Bubble(this);




        this.button_clear = this.game.add.button(100,1125,'main-button_clear', function () {
            if (!this.hud_busy()) {
                this.message_box.show("clear");
            }
        },this);
        this.button_clear.anchor.setTo(0.5,0.5);
        this.button_clear.scale.setTo(3,3);


        this.button_shop = this.game.add.button(WIDTH/2,1125,'main-button_shop', function () {
            if (!this.hud_busy()) {
                this.shop.open();
            }
        },this);
        this.button_shop.anchor.setTo(0.5,0.5);
        this.button_shop.scale.setTo(3,3);

        this.button_sound = this.game.add.button(WIDTH-100,1125,'main-button_sound', function () {


            sound_on = !sound_on;

            if (sound_on)
            {
                this.button_sound.frame = 0;
                this.button_clicker.snd[0].play();
                music_main.play();
            }
            else
            {
                this.button_sound.frame = 1;

                music_main.pause();
            }

        },this);
        this.button_sound.anchor.setTo(0.5,0.5);
        this.button_sound.scale.setTo(3,3);

        this.button_sound.frame = sound_on ? 0:1;




        this.start_pressed = 0;

        this.button_start = this.game.add.button(0,HEIGHT-48,'main-start',function () {

            this.start_pressed+=1;

            if (sound_on)
            this.button_clicker.snd[0].play();

            if (this.start_pressed>30)
            {

                this.start_pressed = 0;
                window.open('https://www.youtube.com/watch?v=9ku9scx6Jug');
            }



        },this,0,0,1)

        this.button_start.scale.setTo(2);

        this.score_text = this.game.add.text(WIDTH/2,130,'0',{font: '25pt PIX'});

        this.score_text.addColor("#ffffff", 0)﻿


        this.shop = new this.Shop(this);

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

        this.bubble.update();

        
        this.score_text.text = ''+game_data.score;

        for (let i=0;i<5;i++)
            this.boosters[i].update();

        this.button_pepe.update();

        if (screen_clicked && !music_main.isPlaying && sound_on)
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
            game_data.score+=Math.round((LVL[win].price+2500)/2);

    }

    game_data.saveData();

}