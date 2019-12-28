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

        this.load.spritesheet('main-level','assets/main/button_level.png',72,72);
        this.load.spritesheet('main-clicker','assets/main/button_clicker.png',225,90);

        this.load.spritesheet('main-pepe','assets/main/pepe.png',50,50);
        this.load.image('main-bubble','assets/main/bubble.png');


        this.load.image('common-goback','assets/common/arrow.png');
        this.load.spritesheet('common-message','assets/common/message.png',280,380);
        this.load.spritesheet('common-button','assets/common/message_button.png',232,36);

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

        this.load.image('pacman-back','assets/pacman/back.png');
        this.load.spritesheet('pacman-player','assets/pacman/player.png',140/2,48);
        this.load.spritesheet('pacman-enemy','assets/pacman/enemy.png',64,64);
        //this.load.image('pacman-block','assets/pacman/block.png');
        this.load.spritesheet('pacman-coin','assets/pacman/coin.png',48,48);


        this.load.image('pacman-big_circle','assets/pacman/circle_big.png');
        this.load.image('pacman-small_circle','assets/pacman/circle_small.png');

        this.load.image('pvz-back','assets/pvz/back.png');

        this.load.image('burger-back','assets/burger/back.png');
        this.load.image('burger','assets/burger/burger.png');
        this.load.image('burger-hole','assets/burger/hole.png');
        this.load.image('burger-front','assets/burger/front.png');
        this.load.image('burger-flag','assets/burger/flag.png');
        this.load.image('burger-poop','assets/burger/poop.png');

        this.load.image('fire-back','assets/fire/back.png');
        this.load.image('fire-fog','assets/fire/fog.png');
        this.load.spritesheet('fire-fire','assets/fire/fire.png',120,184);
        this.load.spritesheet('fire-tree','assets/fire/tree.png',288,246);
        this.load.spritesheet('fire-heli','assets/fire/heli.png',192,192);
        this.load.image('fire-water','assets/fire/water.png');

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
