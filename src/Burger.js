States = {};

States.Burger = function (game) {


};

States.Burger.prototype = {



    preload : function() {
    },


    create: function () {
        this.game.add.sprite(0,0,'burger-back');
        this.add.button(40, 40, 'common-goback', function () {

            game.exitMiniGameSignal.dispatch();
        },this)

    },

    update: function () {

    }



};
