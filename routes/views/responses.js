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
  //created: {},
  methods: {
    route: function(page, callback){
      this.showPage = page;
      if (page !== "home"){
        load(this, page);
      }
    },
    sortKarma: sortKarma,
    sortName: sortName,
    karmaSelect: karmaSelect
  }
});
