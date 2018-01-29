var load = function(self, api, page, additions){
    $.ajax({
        url: 'http://localhost:80/api/' + api,
        type: 'get',
        dataType: 'json',
        async: true,
        success: function(data) {
            self._data[page ? page : api] = data;
            if(additions){
              console.log(self._data.iUsers.length)
              self._data[page ? page : api].push(additions);
              console.log(self._data.iUsers.length)
            }
            console.log(self._data[page ? page : api])
        }
    });
};

var karmaSelect = function(){
      var self = this;
      $.ajax({
        url: 'http://localhost:80/api/karma?taker=' + this.selected,
        type: 'get',
        dataType: 'json',
        async: true,
        success: function(data) {
            data.sort(function(a, b){
              if (a.time && b.time && a.time > b.time){
                return -1;
              } else if (a.time && !b.time || !a.time && b.time) {
                return 1;
              }
            });
            self._data.karmaLogs = data;
        }
      });
    }
    
    var inventorySelect = function(){
      var self = this;
      $.ajax({
        url: 'http://localhost:80/api/inventories?user=' + this.selected,
        type: 'get',
        dataType: 'json',
        async: true,
        success: function(data) {
            self._data.items = data.items;
            console.log(data.items);
        }
      });
    }