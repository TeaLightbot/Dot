Vue.component('todo-item', {
  props:['value','index','name'],
  template: '<p>{{ index ? value : name + ": " + value }}</p>'
});

Vue.component('response-list', {
  props:['item'],
  template: '<li>' +
                '<ul id="responses">' +
                    '<todo-item   :value="value"' +
                                 ':index="index"' +
                                 ':name="\'Key\'"' +
                    'v-for="(value, index) in item.key"></todo-item>' + 
                    '<todo-item   :value="value"' +
                                 ':index="index"' +
                                 ':name="\'Response\'"' +
                    'v-for="(value, index) in item.response"></todo-item>' +
                '</ul>' +
             '</li>'
});

Vue.component('user-list',{
  props:['user'],
  methods: { 
    karmaClass: function(karma){
      if (karma > 500){
        return 'text-success';
      } else if (karma > 250){
        return 'text-info';
      } else if (karma < -50){
        return 'text-danger';
      } else if (karma < -50){
        return 'text-warning';
      }
      return '';  
    }
  },
  template: '<li v-bind:class=karmaClass(user.karma)><h3>{{user.name}}</h3>'+
              'Karma: {{user.karma}}' +
              
            '</li>'
});

Vue.component('karma-list',{
  props:['karma'],
  methods: { 
    plusClass: function(plus){
      return plus ? "text-success" : "text-danger";  
    }
  },
  template: '<li v-bind:class=plusClass(karma.plus)>' +
              '{{ (karma.plus ? "++" : "--") + " from " + karma.giver + " " + karma.reason }}'+
            '</li>'
});

Vue.component('feature-list',{
  props:['feature'],
  methods: { 
    statusClass: function(status){
      if (status.includes('implemented')){
        return 'text-success';
      } else if (status.includes('accepted')){
        return 'text-info';
      } else if (status.includes('rejected')){
        return 'text-danger';
      } else if (status.includes('rejected')){
        return 'text-warning';
      }
      return '';  
    }
  },
  template: '<tr v-bind:class=statusClass(feature.status)>' +
              '<td>{{feature.feature}}</td>'+
              '<td>{{feature.status}}</td>' +
              '<td>{{feature.from}}</td>' +
            '</tr>'
});

Vue.component('bug-list',{
  props:['bug'],
  methods: { 
    statusClass: function(status){
      if (status.includes('fixed')){
        return 'text-success';
      } else if (status.includes('partial')){
        return 'text-info';
      } else if (status.includes('reported')){
        return 'text-danger';
      }
      return '';  
    }
  },
  template: '<tr v-bind:class=statusClass(bug.status)>' +
              '<td>{{bug.bug}}</td>'+
              '<td>{{bug.status}}</td>' +
              '<td>{{bug.from}}</td>' +
            '</tr>'
});

var model = {
    responses: [],
    users: [],
    features: [],
    bugs: [],
    karmaLogs: [],
    selected: '',
    showPage: "home"
}; 
  
var load = function(){
    var self = this;
    $.ajax({
        url: 'http://lm120156:6849/api/responses',
        type: 'get',
        dataType: 'json',
        async: true,
        success: function(data) {
            self._data.responses = data;
        }
    });
    $.ajax({
        url: 'http://lm120156:6849/api/users',
        type: 'get',
        dataType: 'json',
        async: true,
        success: function(data) {
            self._data.users = data;
        }
    });
    $.ajax({
        url: 'http://lm120156:6849/api/featureRequests',
        type: 'get',
        dataType: 'json',
        async: true,
        success: function(data) {
            self._data.features = data;
        }
    });
    $.ajax({
        url: 'http://lm120156:6849/api/bugReports',
        type: 'get',
        dataType: 'json',
        async: true,
        success: function(data) {
            self._data.bugs = data;
        }
    });
};

var app = new Vue({
  el: '#app',
  data: model,
  created: load,
  methods: {
    route: function(page){
      this.showPage = page;
    },
    sortKarma: function(array){
      array.sort(function(a, b){
        if (a.karma > b.karma){
          return -1;
        } else {
          return 1;
        }
      })
    },
    sortName: function(array){
      array.sort(function(a, b){
        if (a.name.toLowerCase() < b.name.toLowerCase()){
          return -1;
        } else {
          return 1;
        }
      })
    },
    karmaSelect: function(){
      var self = this;
      $.ajax({
        url: 'http://lm120156:6849/api/karma?taker=' + this.selected,
        type: 'get',
        dataType: 'json',
        async: true,
        success: function(data) {
          console.log("here")
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
  }
});

