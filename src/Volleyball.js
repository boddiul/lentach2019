States = {};

States.Volleyball = function (game) {


};

States.Volleyball.prototype = {



    preload : function() {
    },


    create: function () {
        this.game.add.sprite(0,0,'volley-back');
        this.add.button(40, 40, 'common-goback', function () {

            game.exitMiniGameSignal.dispatch();
        },this)

    },

    update: function () {

    }



};
