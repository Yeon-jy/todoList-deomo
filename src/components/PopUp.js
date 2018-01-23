import React, { Component } from 'react';
import { Modal, Button, Input } from 'antd';
import utils from '../utils';
export default class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleOk = this.handleOk.bind(this);
    }
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    }

    handleOk = (e) => {
        const node = this.refs.add_input.input;
        const text = node.value.trim();
        this.props.submitAdoTodo(text);
        this.props.showPopUpHandle();
        node.value = '';
        this.addLocalStorage(text);//添加至LocalStorage
    }
    addLocalStorage(_text) {
        const refs =this.refs.add_input.input;
            utils.create({
                text:_text,
                completed:false
                // status: 'exe',
                // title: refs.title.value,
                // content: refs.content.value,
                // expire: refs.expire.value
            }, (res) => {
                const result = res.result;
                const msg = res.msg;
                if (result === 1) {
                   console.log('添加成功');
                } else {
                    alert(msg);
                }
            });
    }

    render() {
        const { visible, confirmLoading, ModalText } = this.props;
        return ( <div >
            <Modal title = "添加TODO"
            popType = { this.props.popType } visible = { this.props.visible } onOk = {
                (e) => this.handleOk(e) } confirmLoading = { confirmLoading } onCancel = { this.props.showPopUpHandle } >
            <p>
            <Input type = "text"
            placeholder = "请输入待办事项"
            ref = 'add_input'
            className = "input-box" / >
            </p> 
            </Modal>
          </div>
        );
    }
}