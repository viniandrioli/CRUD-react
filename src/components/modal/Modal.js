import React, { Component } from 'react';
import TaskListService from '../../services/tasklist'

import './modal.css';

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      status: '',
    }
    this.tasklistService = new TaskListService()
    this.handleChange = this.handleChange.bind(this);
    this.submitModal = this.submitModal.bind(this);
    this.submitModalEdit = this.submitModalEdit.bind(this);
  }

componentWillMount() {
  this.setState({
    description: this.props.description,
    status: this.props.status,
    taskId: this.props.taskId,
    addUser: this.props.addUser,
    editUser: this.props.editUser,

    showModal: this.props.showModal
  }, () => {
    console.log(this.state);
  });
}

  submitModal(e) {
    e.preventDefault();
    const tasks = [{ description: this.state.description, done: this.state.status }];
    this.tasklistService.addTask(tasks[0])
      .then(response => {
        this.props.showModal(false, true)
      })
  }

  submitModalEdit (e) {
      e.preventDefault();
      const task = [{ description: this.state.description, done: this.state.status }];  
      this.tasklistService.editTask(task[0], this.props.taskId)
      .then(response => {
        this.props.showModal(false, true)
      })
  }


  handleChange(event) {
    const name = event.target.name;
    let value = '';
    name === 'status' ? value = !this.state.status :  value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  render() {

    return (
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal_content">
          <form>
            <label>Description</label>
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
            <div className="checkboxes">
            <label htmlFor="check">
            <input type="checkbox" id="check" defaultChecked={this.state.status} name="status" value={this.state.status} onClick={this.handleChange} />Done</label>
            </div>
            {this.props.addUser && <button className="button-modal" type="submit" onClick={this.submitModal}>Add new user</button>}
            {this.props.editUser && <button className="button-modal" type="submit" onClick={this.submitModalEdit}>Edit user</button>}
            <button className="close-modal" type="button" onClick={() => this.props.showModal(false)}>Close Modal</button>
          </form>
        </div>
      </div>

    )
  }
}


export default Modal