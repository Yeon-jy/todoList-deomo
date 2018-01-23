import { combineReducers } from 'redux'
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions/action'
const { SHOW_ALL } = VisibilityFilters
import utils from '../utils';
let readLocalStore=[];
function retrieve () {
        // 列表项id
        // const id = this.props.list.get('id');
        // 列表类型：exe，del，done
        // const status = this.props.status;
        // 调用公共方法查询方法
        utils.retrieve((res) => {
          console.log(res.result);
          readLocalStore=res.data;
            // this.setList(res.data);
        }, '', '');
    }



function visibilityFilter(state = SHOW_ALL,action){
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}


function todos(state = readLocalStore, action) {
    retrieve();
    switch (action.type) {

        case ADD_TODO:
            return [
                ...state,//将旧的状态和新的状态拼在一起，返回新的state
                {
                    text: action.text,
                    completed: false
                }
            ]
        case COMPLETE_TODO:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    completed: true
                }),
                ...state.slice(action.index + 1)
            ]
        default:
            return state
    }
}

//combineReducers可以将所有的reducer合并进来
const todoApp = combineReducers({
    visibilityFilter,
    todos
})
export default todoApp

