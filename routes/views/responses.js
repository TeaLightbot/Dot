var model = {
    responses: [],
    users: [],
    iUsers: [],
    featureRequests: [],
    bugReports: [],
    karmaLogs: [],
    items: [],
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
      if (page !== "home" && page !== 'karma' && page !== 'inventories'){
        load(this, page);
      }
    },
    karmaRoute: function(){
      load(this, 'users');
      this.route('karma');
    },
    inventoryRoute: function(){
      load(this, 'users', 'iUsers', {name: 'Dot'});
      this.route('inventories');
    },
    sortKarma: sortKarma,
    sortName: sortName,
    karmaSelect: karmaSelect,
    inventorySelect: inventorySelect
  }
});
