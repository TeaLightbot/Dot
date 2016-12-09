
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