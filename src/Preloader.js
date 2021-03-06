States.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

States.Preloader.prototype = {

    preload: function () {

        this.game.load.onFileComplete.add(this.fileComplete, this);

        this.game.stage.backgroundColor = 15198183;
        this._logoContainer = this.make.sprite(this.world.centerX, this.world.centerY);
        this.add.existing(this._logoContainer);
        this._logo = this.make.image(0, -80, "preloader", "logo1");
        this._logo.anchor.set(.5);
        this._logo2 = this.make.image(this._logo.x, this._logo.y + 80, "preloader", "logo2");
        this._logo2.anchor.set(.5);
        this._footer = this.make.image(this._logo.x, this._logo.y + 85 + 80, "preloader", "bg0000");
        this._footer.anchor.set(.5);
        this._loading = this.make.image(this._logo.x, this._logo.y + 85 + 80, "preloader", "fg0000");
        this._loading.anchor.set(.5);
        this._logoContainer.addChild(this._logo);
        this._logoContainer.addChild(this._logo2);
        this._logoContainer.addChild(this._footer);
        this._logoContainer.addChild(this._loading);
        var arrowBoxWidth = this._loading.width + 4;
        var cpuHeight = this._loading.height + 2;
        this._loadingMask = this.make.graphics(.5 * -arrowBoxWidth, 0);
        this._loadingMask.beginFill(16711680, .5);
        this._loadingMask.drawRect(0, .5 * -cpuHeight, arrowBoxWidth, cpuHeight);
        this._loadingMask.endFill();
        this._loading.addChild(this._loadingMask);
        this._loading.mask = this._loadingMask;
        this._loadingMask.scale.x = 0;


        this.game.add.text(0, 0, "fix", {font:"1px PIX"})﻿﻿;

        this.load.image('main-back','assets/main/back.png');




        this.load.audioSprite('main-music','assets/main/maintheme.mp3');
        this.load.audioSprite('volley-music','assets/volley/maintheme.mp3');
        this.load.audioSprite('pacman-music','assets/pacman/maintheme.mp3');
        this.load.audioSprite('pvz-music','assets/pvz/maintheme.mp3');
        this.load.audioSprite('burger-music','assets/burger/maintheme.mp3');
        this.load.audioSprite('fire-music','assets/fire/maintheme.mp3');


        this.load.image('main-button_clear','assets/main/button_clear.png');
        this.load.spritesheet('main-button_shop','assets/main/button_shop.png',32,32);
        this.load.spritesheet('main-button_sound','assets/main/button_sound.png',32,32);

        this.load.spritesheet('main-locked','assets/main/locked.png',50,50);
        //this.load.spritesheet('main-booster','assets/main/button_booster.png',50,50);

        this.load.spritesheet('main-booster0','assets/main/booster0.png',50,50);
        this.load.spritesheet('main-booster1','assets/main/booster1.png',50,50);
        this.load.spritesheet('main-booster2','assets/main/booster2.png',50,50);
        this.load.spritesheet('main-booster3','assets/main/booster3.png',50,50);
        this.load.spritesheet('main-booster4','assets/main/booster4.png',50,50);


        this.load.image('main-shop-locked','assets/main/shop_locked.png');

        this.load.spritesheet('main-start','assets/main/start.png',57,24);
        this.load.audioSprite('main-vvv','assets/main/vvv.mp3');

        this.load.audioSprite('common-win','assets/common/win.mp3');
        this.load.audioSprite('common-loose','assets/common/loose.mp3');


        this.load.spritesheet('main-level','assets/main/button_level.png',72,72);

        this.load.spritesheet('main-pepe-laugh','assets/main/pepe_laugh.png',64,64);

        this.load.image('main-shop','assets/main/shop.png');

        this.load.spritesheet('main-clicker','assets/main/button_clicker.png',225,90);
        this.load.spritesheet('main-coin','assets/main/button_coin.png',500/5,100);
        this.load.spritesheet('main-dont','assets/main/button_dont.png',168/2,44);
        this.load.spritesheet('main-f','assets/main/button_f.png',200/2,102);
        this.load.spritesheet('main-pig','assets/main/button_pig.png',500/5,100);
        this.load.spritesheet('main-milos','assets/main/button_milos.png',250/2,125);


        this.load.audioSprite('main-snd-clicker','assets/main/clicker.mp3');
        this.load.audioSprite('main-snd-coin','assets/main/coin.mp3');
        this.load.audioSprite('main-snd-dont','assets/main/dont.mp3');
        this.load.audioSprite('main-snd-f','assets/main/f.mp3');
        this.load.audioSprite('main-snd-pig','assets/main/pig.mp3');
        this.load.audioSprite('main-snd-milos','assets/main/milos.mp3');


        this.load.spritesheet('main-pepe','assets/main/pepe.png',50,50);
        this.load.image('main-bubble','assets/main/bubble.png');


        this.load.image('common-goback','assets/common/arrow.png');
        this.load.spritesheet('common-message','assets/common/message.png',280,380);
        this.load.image('common-console','assets/common/console.png');
        this.load.spritesheet('common-button','assets/common/message_button.png',232,36);

        this.load.spritesheet('common-help','assets/common/help.png',230,110);

        this.load.audioSprite('volley-snus1','assets/volley/volley-snus1.mp3');
        this.load.audioSprite('volley-snus2','assets/volley/volley-snus2.mp3');
        this.load.audioSprite('volley-snus3','assets/volley/volley-snus3.mp3');

        this.load.audioSprite('volley-losing','assets/volley/volley-losing.mp3');
        this.load.audioSprite('volley-win','assets/volley/volley-win.mp3');
        this.load.image('volley-back','assets/volley/back.png');
        this.load.image('volley-left_down_btn','assets/volley/left_down_btn.png');
        this.load.image('volley-left_up_btn','assets/volley/left_up_btn.png');
        this.load.image('volley-right_down_btn','assets/volley/right_down_btn.png');
        this.load.image('volley-right_up_btn','assets/volley/right_up_btn.png');
        this.load.image('net','assets/volley/net.png');
        this.load.spritesheet('volley-player','assets/volley/player.png',275,337);
        this.load.spritesheet('volley-ment','assets/volley/ment.png',135,234);
        this.load.image('drugs','assets/volley/drugs.png');
        this.load.image('shadow','assets/volley/shadow.png');
        this.load.image('score','assets/volley/score.png');

        this.load.image('pacman-back','assets/pacman/back.png');
        this.load.spritesheet('pacman-player','assets/pacman/player.png',140/2,48);
        this.load.spritesheet('pacman-enemy','assets/pacman/enemy.png',64,64);
        //this.load.image('pacman-block','assets/pacman/block.png');
        this.load.spritesheet('pacman-coin','assets/pacman/coin.png',48,48);
        this.load.image('pacman-pogon','assets/pacman/pogon.png');
        this.load.image('pacman-star','assets/pacman/star.png');
        this.load.image('pacman-big_circle','assets/pacman/circle_big.png');
        this.load.image('pacman-small_circle','assets/pacman/circle_small.png');

        this.load.audioSprite('pacman-snd-damage','assets/pacman/damage.mp3');
        this.load.audioSprite('pacman-snd-pick','assets/pacman/food.mp3');

        this.load.image('pvz-back','assets/pvz/back.png');
        this.load.image('pvz-trees','assets/pvz/trees.png');
        this.load.image('pvz-truck0','assets/pvz/truck0.png');
        this.load.image('pvz-truck1','assets/pvz/truck1.png');
        this.load.image('pvz-cat-back','assets/pvz/cata_back.png');
        this.load.spritesheet('pvz-cat','assets/pvz/cata.png',69,203);
        this.load.image('pvz-trash','assets/pvz/trash.png');
        this.load.spritesheet('pvz-man0','assets/pvz/man0.png',100,150);
        this.load.spritesheet('pvz-man1','assets/pvz/man1.png',100,150);

        this.load.audioSprite('pvz-snd-kill1','assets/pvz/kill1.mp3');
        this.load.audioSprite('pvz-snd-kill2','assets/pvz/kill2.mp3');
        this.load.audioSprite('pvz-snd-kill3','assets/pvz/kill3.mp3');
        this.load.audioSprite('pvz-snd-kill4','assets/pvz/kill4.mp3');

        this.load.audioSprite('pvz-snd-punch','assets/pvz/punch.mp3');
        this.load.audioSprite('pvz-snd-reload','assets/pvz/reload.mp3');
        this.load.audioSprite('pvz-snd-shot','assets/pvz/shot.mp3');


        this.load.audioSprite('burger-food1','assets/burger/burger-food1.mp3');
        this.load.audioSprite('burger-food2','assets/burger/burger-food2.mp3');

        this.load.audioSprite('burger-shit','assets/burger/burger-shit.mp3');
        this.load.image('burger-back','assets/burger/back.png');
        this.load.image('burger','assets/burger/burger.png');
        this.load.image('burger-hole','assets/burger/hole.png');
        this.load.image('burger-front','assets/burger/front.png');
        this.load.image('burger-flag','assets/burger/flag.png');
        this.load.image('burger-poop','assets/burger/poop.png');
        this.load.image('burger-clap','assets/burger/clap.png');
        this.load.image('burger-ebalo1','assets/burger/ebalo1.png');
        this.load.image('burger-ebalo2','assets/burger/ebalo2.png');
        this.load.image('burger-ebalo3','assets/burger/ebalo3.png');
        this.load.image('burger-statusBG','assets/burger/statusBG.png');
        this.load.image('burger-status','assets/burger/status.png');
        this.load.image('burger-status-red','assets/burger/status_red.png');


        this.load.image('fire-back','assets/fire/back.png');
        this.load.image('fire-fog','assets/fire/fog.png');
        this.load.spritesheet('fire-fire','assets/fire/fire.png',120,184);
        this.load.spritesheet('fire-tree','assets/fire/tree.png',288,246);
        this.load.spritesheet('fire-heli','assets/fire/heli.png',192,192);
        this.load.image('fire-water','assets/fire/water.png');

        this.load.image('fire-bar','assets/fire/bar.png');
        this.load.image('fire-bar-bg','assets/fire/bar_bg.png');


        this.load.audioSprite('fire-snd-cough1','assets/fire/cough1.mp3');
        this.load.audioSprite('fire-snd-cough2','assets/fire/cough2.mp3');
        this.load.audioSprite('fire-snd-cough3','assets/fire/cough3.mp3');
        this.load.audioSprite('fire-snd-fire','assets/fire/fire.mp3');
        this.load.audioSprite('fire-snd-wateroff','assets/fire/wateroff.mp3');
        this.load.audioSprite('fire-snd-wateron','assets/fire/wateron.mp3');
        this.load.audioSprite('fire-snd-money','assets/fire/money.mp3');
    },

    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {

        this._loadingMask.scale.x = progress / 100;
        if (progress >= 100) {
            this.game.load.onFileComplete.removeAll();

        }
    },

    create: function () {


    },

    update: function () {



        if (/*this.cache.isSoundDecoded('soundtrack')  && this.cache.isSoundDecoded('boosted') &&*/ this.ready === false)
        {
            this.ready = true;


            var self = this;
            this.add.tween(this._logoContainer).to({
                alpha : 0
            }, 450, null, true, 300).onComplete.addOnce(function() {
                self.state.start('Main');
            })
            //this.
        }

    }

};
