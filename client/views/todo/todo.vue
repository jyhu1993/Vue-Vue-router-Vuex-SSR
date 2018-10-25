<template>
	<section class="real-app">
		<input 
			type="text" 
			class="add-input" 
			autofocus='autofocus' 
			placeholder="接下去要做什么？" 
			name=""
			@keyup.enter='addTodo'
		>
		<Item :todo="todo"
			  v-for="todo in filteredTodos"
			  :key="todo.id"
			  @del="deleteTodo">	
		</Item>
		<Tabs 
			:filter='filter' 
			:todos="todos"
			@toggle="toggleFilter"
			@clearAllCompleted="clearAllCompleted">   
    </Tabs>
	</section>
  
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default{
  beforeRouteEnter (to, from, next) {
    console.log('todo before enter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('todo before update')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('todo before leave')
    next()
  },
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => todo.completed === completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(function (todo, index, arr) {
        return todo.id === Number(id)
      }), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }

  }
}
</script>

<style lang="less" scoped>
	.real-app{
		width:600px;
		margin:0 auto;
		.add-input{
			position:relative;
			margin:0;
			width:100%;
			font-size:24px;
			font-family:inherit;
			font-weight:inherit;
			line-height:1.4em;
			border:none;
			outline:none;
			color:inherit;
			box-sizing:border-box;
			padding:16px 16px 16px 36px;
		}
	}
</style>





