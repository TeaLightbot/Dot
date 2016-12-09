Vue.component('bug-list', {
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