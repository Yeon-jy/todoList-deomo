import React, { Component } from 'react';
import { Modal, Button,Input } from 'antd';
export default class AddTodoDialog extends React.Component {
	    constructor (props) {
        super(props);
  render() {
 
    return (
      <div>
        <Modal title="添加TODO"
          visible={visible}
          onOk={this.props.showPopUpHandle}
          confirmLoading={confirmLoading}
          onCancel={this.props.showPopUpHandle}
        >
          <p>
          	<Input type="text" placeholder="请输入待办事项" ref='input'  className="input-box" />
          </p>
        </Modal>
      </div>
    );
  }
    }
}