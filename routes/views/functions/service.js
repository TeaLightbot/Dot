var load = function(self, page){
    $.ajax({
        url: 'http://lm120156:6849/api/' + page,
        type: 'get',
        dataType: 'json',
        async: true,
        success: function(data) {
            self._data[page] = data;
        }
    });
};

var karmaSelect = function(){
      var self = this;
      $.ajax({
        url: 'http://lm120156:6849/api/karma?taker=' + this.selected,
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