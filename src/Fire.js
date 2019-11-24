States = {};

States.Fire = function (game) {


};

States.Fire.prototype = {



    preload : function() {
    },


    create: function () {
        this.game.add.sprite(0,0,'fire-back');
        this.add.button(40, 40, 'common-goback', function () {

            game.exitMiniGameSignal.dispatch();
        },this)

    },

    update: function () {

    }



};
