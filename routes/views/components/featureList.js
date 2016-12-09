Vue.component('feature-list', {
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