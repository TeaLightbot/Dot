var model = {
    responses: [],
    users: [],
    featureRequests: [],
    bugReports: [],
    karmaLogs: [],
    selected: '',
    showPage: "home"
}; 
 
var app = new Vue({
  el: '#app',
  data: model,
//  created: load(this, 'users'),
  methods: {
    route: function(page){
      this.showPage = page;
      if (page !== "home" && page !== 'karma'){
        load(this, page);
      }
    },
    karmaRoute: function(){
      load(this, 'users');
      this.route('karma');
    },
    sortKarma: sortKarma,
    sortName: sortName,
    karmaSelect: karmaSelect
  }
});
