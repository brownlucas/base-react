/**
 * Created by brownlg on 30/03/18.
 */

// greetings.js
var exports = module.exports = {};

function DatabaseOperations(db) {

    this.addData = function () {
        var collection = db.collection("names");

        collection.findOne( {  }, function(err, item) {
            console.log("item count = " + item);

        });

        return "query ran";
    };

    this.getData = function () {
        var collection = db.collection("names");

        collection.findOne( {  }, function(err, item) {
            console.log("item count = " + item);

        });

        return "query ran";
    };
};

module.exports = DatabaseOperations;
