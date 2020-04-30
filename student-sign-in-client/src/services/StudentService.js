import axios from 'axios'

const base_url = '/api/students'
export default {

    // Methods for the api to return data
    // getting all students: axios goes through the URL and gets that data to return
    // same uses of get, post, patch, and delete as the router
    getAllStudents() {
        return axios.get(base_url).then(response => {
            return response.data
        })
    },

    addStudent(student) {
        return axios.post(base_url, student).then(response => {
            return response.data
        })
    },

    updateStudent(student) {
        console.log("StudentService.js going off")
        return axios.patch(`${base_url}/${student.id}`, student).then(response => {
            return response.data
        })
    },

    deleteStudent(id) {
        return axios.delete(`${base_url}/${id}`).then(response => {
            return response.data
        })
    }
}