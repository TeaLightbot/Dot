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