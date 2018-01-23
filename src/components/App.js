
import React, { Component ,PropTypes} from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import '../static/css/App.css';
import '../static/scss/todo.scss';
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions/action'
import SliderNav from './SliderNav';
import  TodoList from './TodoList';
import  PopUp from './PopUp';
import  User from './User';
import  Test from './Test';
import  ComfirmPopUp from './dialog/ComfirmPopUp';
import { DatePicker ,Layout, Menu, Icon ,Button,Modal} from 'antd';
import utils from '../utils';



import 'antd/dist/antd.css';  

const { Header, Sider, Content } = Layout;


// 路由基础配置
const option = {
    basename: '',
    forceRefresh: !('pushState' in window.history),
    getUserConfirmation: () => {},
    keyLength: 12
}


class App extends Component {
  state = {
    collapsed: false,
    popUpVisible:false,
    popUpComfirm:false,
    isComplete:false,
    selectTodoIndex:0,
    selectTodoText:'',
  }


  update=(text)=>{
    utils.done(this.state.selectTodoIndex,  (res) => {
      console.log("修改成功res：",res);
    });    
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  comfirmPopUptoggle = () => {
    this.setState({
      isComplete:false,
      popUpComfirm: !this.state.popUpComfirm
    });
  }
  comfirmComplete=()=>{
    this.setState({
      isComplete:true
    })
  }
  showPop=(e)=>{
    this.setState({
      popUpVisible: !this.state.popUpVisible
    });   
  }
  setSelectIndex=(index,e)=>{
    console.log(e);
    this.setState({
      selectTodoIndex:index
    });

    this.comfirmPopUptoggle();
  }
  addTodoFn=(text)=>{
      // alert(text);
      
  }

  render() {
      const { dispatch, visibleTodos, visibilityFilter} = this.props

    return (
      <BrowserRouter>
      <div>
        <Layout className="App">
          <ComfirmPopUp
          showComfirmPopUpHandle={(e)=>this.comfirmPopUptoggle(e)}
          visible={this.state.popUpComfirm}
          addToComplete={(e)=>this.addToComplete(e)}
          comfirmComplete={(text)=>{
            dispatch(completeTodo(this.state.selectTodoIndex));
            //修改locaoStorage的数据
            this.update(text);
            }
          }
          />
          <PopUp 
          showPopUpHandle={(e)=>this.showPop(e)} 
          ModalText={"Content of the modal"} 
          visible={this.state.popUpVisible} 
          submitAdoTodo={(text)=>{
                  dispatch(addTodo(text));
                  this.addTodoFn(text)}}
          confirmLoading={false}/>
          <SliderNav 
          collapsed={this.state.collapsed}
          showPopUpHandle={(e)=>this.showPop(e)}
          filter={visibilityFilter}
          flush={utils.flush}
          onFilterChange={nextFilter=>
          dispatch(setVisibilityFilter(nextFilter))}
          />
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={(e)=>this.toggle(e)}
              />
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 680 }}>
                  <TodoList todos={visibleTodos}
                            onAddClick={(index)=>
                            this.setSelectIndex(index)}
                  />
                  <Route path="/user" component={User}/>
                  <Route path="/test" component={Test}/>
            </Content>
          </Layout>
        </Layout>
      </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
}

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)
    }
}
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

//高阶函数的写法，返回一个函数。import { connect } from 'react-redux'由contect这个方法来生成App这个组件,将select里面定义的东西传给app这个组件
export default connect(select)(App);
