import React, { Component } from 'react';
import { Modal, Button,Input } from 'antd';
export default class ComfirmPopUp extends React.Component {
    constructor (props) {
        super(props);
        this.handleOk=this.handleOk.bind(this);
    }


  handleOk = (e) => {
    this.props.showComfirmPopUpHandle();
    this.props.comfirmComplete();
  }
  handleCancel = (e) => {
     this.props.showComfirmPopUpHandle();
  }
  render() {
    return (
      <div>
        <Modal
          title="温馨提示："
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>确认要提交任务吗？</p>
        </Modal>
      </div>
    );
  }
}
