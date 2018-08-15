var orm = require("../config/orm");


var burger = {

    all: function(callback) {
        orm.selectAll("burgers", function(result) {
            callback(result);
        });
    },

    create: function(column, itemToInsert, callback) {
        orm.insertOne("burgers", column, itemToInsert, function(result){
            callback(result);
        });
    },

    update: function(burgerId, callback){
        orm.updateOne("burgers", burgerId, function(result){
            callback(result);
        })
    }
}

module.exports = burger;