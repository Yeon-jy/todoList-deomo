import React, {Component,PropTypes} from 'react';
import Todo from './Todo';
export default class TodoList extends Component {
    render(){
        const {todos, onTodoClick,dleTodoClick} = this.props;
        const todo_list_item=todos.map((todo)=>
            <li className="todo-list-item" key={todo.toString()}><span className="todo-list-seclect"></span>{todo}<div
                className="delect-item" onClick={this.props.onAddClick}>删除</div></li>
        )
        return(
                <ul className="todo-list">
			{this.props.todos.map((todo, index) =>
				<Todo {...todo}
					key={index}
					onClick={()=>this.props.onAddClick(index)} />
				)}
        </ul>)

    }
}
TodoList.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
  	text:PropTypes.string.isRequired,
  	completed:PropTypes.bool.isRequired
  })).isRequired
}