const NotFound = { template: '<div><button v-on:click="home">Home</button><button v-on:click="window.location.pathname = \'About\'">About</button><p>Page not found</p></div>' }
const Home = { template: '<p>home page</p>' }
const About = { template: '<p>about page</p>' }
const routes = {
  '/': Home,
  '/about': About
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  methods: {
      home: function(event){
          console.log("Test");
          window.location.pathname = 'Home';
      }
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },  
  render (h) { return h(this.ViewComponent) }
})