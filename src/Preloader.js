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



        this.load.image('main-back','assets/main/back.png');

        this.load.image('main-goto1','assets/main/goto1.png');
        this.load.image('main-goto2','assets/main/goto2.png');
        this.load.image('main-goto3','assets/main/goto3.png');
        this.load.image('main-goto4','assets/main/goto4.png');
        this.load.image('main-goto5','assets/main/goto5.png');



        this.load.image('common-goback','assets/common/arrow.png');

        this.load.image('volley-back','assets/volley/back.png');
        this.load.image('volley-left_down_btn','assets/volley/left_down_btn.png');
        this.load.image('volley-left_up_btn','assets/volley/left_up_btn.png');
        this.load.image('volley-right_down_btn','assets/volley/right_down_btn.png');
        this.load.image('volley-right_up_btn','assets/volley/right_up_btn.png');
        this.load.image('net','assets/volley/net.png');
        this.load.spritesheet('volley-player','assets/volley/player.png',135,234);
        this.load.spritesheet('volley-ment','assets/volley/ment.png',135,234);
        this.load.image('drugs','assets/volley/drugs.png');
        this.load.image('shadow','assets/volley/shadow.png');

        this.load.image('pacman-back','assets/pacman/back.png');

        this.load.image('pvz-back','assets/pvz/back.png');

        this.load.image('burger-back','assets/burger/back.png');
        this.load.image('burger','assets/burger/burger.png');
        this.load.image('burger-hole','assets/burger/hole.png');
        this.load.image('burger-flag','assets/burger/flag.png');
        this.load.image('burger-poop','assets/burger/poop.png');

        this.load.image('fire-back','assets/fire/back.png');


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
