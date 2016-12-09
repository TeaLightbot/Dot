var sortName = function(array){
    array.sort(function(a, b){
        if (a.name.toLowerCase() < b.name.toLowerCase()){
            return -1;
        } else {
            return 1;
        }
    })
};

var sortKarma = function(array){
    array.sort(function(a, b){
        if (a.karma > b.karma){
            return -1;
        } else {
            return 1;
        }
    });
}