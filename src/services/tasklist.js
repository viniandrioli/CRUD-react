import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
const TASK_URL = `${API_URL}/api/todos`


export default class TaskListService {


async editTask(payload, id) {
  debugger
    return await axios.put(`${TASK_URL}/${id}`, payload)
    .then((response) => {
      return response;
    })
    .catch(err => console.log(err))
  }
 
async getTasks() {
  debugger
    return await axios.get(`${TASK_URL}`)
    .then((response) => {
      response.data.forEach(elem => {
        elem.createdAt = elem.createdAt.replace(/T.*$/,"");
      });
      return response     
    })
    .catch(err => console.log(err))
}

async addTask(payload) {
  return await axios.post(TASK_URL, payload)
  .then((response) => {
    return response;
  })
  .catch(err => console.log(err))
}

async deleteTask (taskId) {
  return await axios.delete(`${TASK_URL}/${taskId}`)
  .then((response) => {
    return response;
  })
}

}

