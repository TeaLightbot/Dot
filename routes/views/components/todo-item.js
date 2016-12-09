Vue.component('todo-item', {
  props: ['value','index','name'],
  template: '<p>{{ index ? value : name + ": " + value }}</p>'
});
