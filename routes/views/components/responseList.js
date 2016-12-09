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