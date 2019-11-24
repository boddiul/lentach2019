

game = new Phaser.Game(
    Game = {
        width: WIDTH,
        height: HEIGHT,
        renderer: Phaser.AUTO,
        parent: "game_container",
        transparent: false,
        antialias: true,
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

    menu_open_tween: null,
    background: null,

    preload: function () {

        this.game.scale.setGameSize(WIDTH,HEIGHT);
        /*this.game.scale.setUserScale(1, 1);

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;*/
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        // this.game.load.onLoadStart.add(this.loadStart, this);
        // this.game.load.onFileComplete.add(this.fileComplete, this);
        // this.game.load.onLoadComplete.add(this.loadComplete, this);
    },

    create: function () {
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'main-back');

        this.add.button(108, 750, 'main-goto1', function () {

            openMiniGame('Volleyball')
        },this).scale.setTo(3,3);

        this.add.button(308, 750, 'main-goto2', function () {

            openMiniGame('Pacman')
        },this).scale.setTo(3,3);

        this.add.button(508, 750, 'main-goto3', function () {

            openMiniGame('Zombies')
        },this).scale.setTo(3,3);

        this.add.button(208, 940, 'main-goto4', function () {

            openMiniGame('Burger')
        },this).scale.setTo(3,3);

        this.add.button(408, 940, 'main-goto5', function () {

            openMiniGame('Fire')
        },this).scale.setTo(3,3);




    },

    update: function () {
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
    //mainSoundtrack.stop();

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

function onExitState() {

    game.state.start("Main", true);
}