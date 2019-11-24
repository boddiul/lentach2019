States = {};

States.Pacman = function (game) {


};

States.Pacman.prototype = {



    preload : function() {
    },


    create: function () {
        this.game.add.sprite(0,0,'pacman-back');
        this.add.button(40, 40, 'common-goback', function () {

            game.exitMiniGameSignal.dispatch();
        },this)

    },

    update: function () {

    }



};
