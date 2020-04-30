<template>
  <div id="app">
    
    <!-- the imported pieces being set to display in the template
      when the student-added trigger is returned, it calls the method below -->
      <NewStudentForm v-on:student-added="newStudentAdded"></NewStudentForm>
      <!-- binds the table to show students that are saved in the data method,
      has calls for arriving students or deleted students -->
      <StudentTable
        v-bind:students="students"
        v-on:student-present="studentArrivedOrLeft"
        v-on:delete-student="studentDeleted">
        </StudentTable>
      <StudentMessage v-bind:message="message" v-bind:name="name"></StudentMessage>

  </div>
</template>

<script>
// Importing all the vue pieces to use for the template, the children components
import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'


export default {
  name: 'App',
  data() {
    return {
      students: [],
      message: '',
      name: ''
    }
  },
  components: {
    NewStudentForm,
    StudentTable,
    StudentMessage
  },
  // whenever the app is mounted (like at the beginning), it runs the update students
  // method, so the database of students is pulled into the app on launch.
  mounted() {
    this.updateStudents()
  },
  methods: {
    // adding a new student sends the student info to the api to add to the db
    // then it updates the list with the database info, making the student show up
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then( student => {
        this.updateStudents()
      }).catch(err => {
        let msg = err.response.data.join(', ')
        alert('Error adding student. \n' + msg)
      })
    },
    // when this method is called, the api is sent the student info, 
    // and then the message info is set and will get sent to the 
    // child component.
    studentArrivedOrLeft(student) {
      this.$student_api.updateStudent(student).then( () => {
        this.message = student.present ? 'Welcome, ' : 'Goodbye, '
        this.name = student.name
        this.updateStudents()
      })
    },
    studentDeleted(student) {
      this.$student_api.deleteStudent(student.id).then( () => {
        this.updateStudents()
      })

    },
    updateStudents() {
      this.$student_api.getAllStudents().then( students => {
        this.students = students
      })
    }
  }
}
</script>

<style>

</style>
