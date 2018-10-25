<template>
	<div :class="['todo-item',todo.completed ? 'completed':'']">
		<input type="checkbox" class="toggle" v-model="todo.completed">
		<label>{{todo.content}}</label>
		<button 
			class="destory"
			@click="deleteTodo"
		>X</button>
	</div>
</template>

<script>
	export default{
	  props: {
	    todo: {
	      type: Object,
	      required: true
	    }
	  },
	  methods: {
	    deleteTodo () {
	      this.$emit('del', this.todo.id)
	    }
	  }
	}
</script>
<style lang='less' scoped>
	.todo-item{
        position:relative;
        background-color:#fff;
        font-size:24px;
        border-bottom:1px solid rgba(0,0,0,0.06);
        &:hover{
        	.destory{
        		visibility:visible;
        	}
        }
        &.completed{
        	label{
                color: #d9d9d9;
                text-decoration: line-through;
            }
        }
        .toggle{
        	outline: none;
        	border: none;
        	appearance:none;
        	width: 40px;
        	height: 40px;
        	line-height: 40px;
        	position: absolute;
        	top: 0;
        	bottom: 0;
        	margin:auto;
        	padding-left: 5px;
        	cursor: pointer;
        	&:after{
	            content: url('../../assets/images/round.svg')
	        }
	        &:checked:after{
	            content: url('../../assets/images/done.svg')
	        }
        }

        label{
        	white-space: pre-line;
        	word-break: keep-all;
        	padding:15px;
        	margin-left: 45px;
        	transition: color 0.5s;
        	display: block;
        }
        .destory{
        	position: absolute;
        	top: 0;
        	right: 10px;
        	bottom: 0;
        	width: 40px;
        	height: 40px;
        	margin:auto 0;
        	font-size: 30px;
        	color: #cc9a9a;
        	transition: color 0.2s ease-out;
        	border:none;
        	outline: none;
        	cursor: pointer;
        	visibility: hidden;
        }


        
 	}


</style>















