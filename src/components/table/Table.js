import React, { Component } from 'react'
import TaskListService from '../../services/tasklist'
import Modal from '../../components/modal/Modal'



class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      loading: true,
      title: '',
      status: '',
      taskId: '',
      showModal: false,
      addUser: false,
      editUse: false
    }
    this.tasklistService = new TaskListService()
    this.editModal = this.editModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

   componentDidMount() {
    this.tasklistService.getTasks()
    .then(response => { 
      this.setState({tasks: response.data, loading: false }) 
    })    

  }

  addModal = () => {
    this.setState({showModal: true, addUser: true});
  }

  editModal = (items) => {
    debugger
    this.setState({ taskId: items._id, description: items.description, status: items.done, showModal: true, editUser: true });
  }

  deleteTask = async (task) => {  
    this.tasklistService.deleteTask(task)
    .then(response => {
      this.showModal(false, true, task)
    });
  }

  showModal = (shouldShow, shouldUpdate, shouldDelete) => {
    debugger
    if (shouldUpdate) {
      this.tasklistService.getTasks()
      .then(response => {
        shouldDelete ? 
        this.setState({ tasks: response.data, deleted: true, elemDelId: shouldDelete }) :
        this.setState({ tasks: response.data, newVal: true })
      })  
    }
   
    this.setState({
      showModal: shouldShow,
      addUser: false,
      editUser: false
    })
  }

  render() {

    if (this.state.loading === true) {
      return <h2>Loading...</h2>;
    }

    if (this.state.newVal === true) {
      
      setTimeout(function(){
        this.setState({newVal: false});
     }.bind(this), 2000);

      return <h2>Registro inserido com sucesso!</h2>   
    }

    if (this.state.deleted === true) {
      
      setTimeout(function(){
        this.setState({deleted: false, elemDelId: false});
     }.bind(this), 2000);

      return <h2>Registro {this.state.elemDelId} removido com sucesso</h2>   
    }

    let tasks = this.state.tasks;
    return (
      <React.Fragment>
      <div>
        <div className="table-wrapper">
          <button className="add-new" onClick={() => this.addModal()}>Add New</button>
        </div>
        <table>
          <thead>
         
            <tr>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map(tasks => (
                <tr id={tasks._id}>
                  <td>{tasks.description}</td>
                  <td>{tasks.done ? <p>Done</p> : <p>Pending</p>}</td>
                  <td>{tasks.createdAt}</td>
                  <td>
                    <button onClick={() => this.editModal(tasks)} type="button" className="secondary-button">Edit</button>
                    <button onClick={() => this.deleteTask(tasks._id)} type="button" className="delete-button">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
                <tr>
                  <td colSpan={3}>No tasks</td>
                </tr>
              )}
          </tbody>
        </table>
        </div>
        {this.state.showModal &&
          <Modal 
          showModal={this.showModal} 
          taskId={this.state.taskId} 
          description={this.state.description} 
          status={this.state.status} 
          editUser={this.state.editUser}
          addUser={this.state.addUser} />}
      </React.Fragment>
    )
  }

}

export default Table