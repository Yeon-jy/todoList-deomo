import React, { Component } from 'react';
import { Layout, Menu, Icon ,Button,Modal} from 'antd';
const {  Sider } = Layout;
import { Link, Route, Switch } from 'react-router-dom';

export default class SliderNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return  <Sider
          trigger={null}
          collapsible
          collapsed={this.props.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" >
            <Menu.Item key="1" > 
              <Icon type="edit" />
              <span onClick={()=>this.props.showPopUpHandle()}>添加Todo</span>
            </Menu.Item>         
            <Menu.Item key="2" defaultSelectedKeys={['1']}>
              <Icon type="file-text" />
              <span onClick={()=>this.props.onFilterChange('SHOW_ALL')}>全部</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="smile-o" />
              <span onClick={()=>this.props.onFilterChange('SHOW_COMPLETED')}>已完成</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="loading-3-quarters" />
              <span onClick={()=>this.props.onFilterChange('SHOW_ACTIVE')}>进行中</span>
            </Menu.Item>
            <Menu.Item key="5">
            <Link to="/user">
                <Icon type="user" />
                <span>个人中心</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="loading-3-quarters" />
              <span onClick={()=>{
                this.props.flush();
                alert("清除成功");
              }}>一键清空TODO</span>
            </Menu.Item>            
          </Menu>
        </Sider>
    }
}