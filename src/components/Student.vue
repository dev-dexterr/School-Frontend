<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <h2 class="headline text-uppercase ml-0">
          {{ $vuetify.lang.t("$vuetify.student") }}
        </h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="pa-0" elevation="2" max-width="1800px">
          <v-card-text class="pb-0">
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-sheet>
                    <v-toolbar-items class="d-flex align-center">
                      <v-row>
                        <v-col lg="4">
                          <v-text-field
                            :label="$vuetify.lang.t('$vuetify.search')"
                            v-model="search"
                            append-icon="mdi-magnify"
                          />
                        </v-col>
                      </v-row>

                      <v-spacer />
                      <v-btn
                        text
                        tag="span"
                        style="cursor: pointer"
                        
                        @click="handleDialog"
                      >
                        {{ $vuetify.lang.t("$vuetify.Add") }}
                      </v-btn>
                    </v-toolbar-items>
                  </v-sheet>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <Table :head="headers" :data="datas" :search="search" v-on:edititem="handleEditDialog" v-on:deleteitem="handleDeleteDialog"/>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>

        <StudentCRUD :dialog.sync="dialog" :myObj="myObj" @handleData="handleStudent" @handleEdit="handleStudentEdit" :isBtnEdit.sync="isBtnEdit" :isBtnSave.sync="isBtnSave"/>
        <DeleteDialog
          :dialogDelete.sync="dialogDelete"
          :deleteObj="deleteObj"
          @handleDelete="handleDeleteConfirm"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/service/apiService";
export default {
  name: "Student",
  components:{
    StudentCRUD: ()=> import("@/components/CRUD/StudentCRUD.vue"),
    Table: () => import("@/components/core/Table.vue"),
    DeleteDialog: () => import("@/components/core/Delete.vue"),
  },
  data(){
    return{
      dialogDelete: false,
      datas: [],
      search: "",
      headers:[
        {
          text: this.$vuetify.lang.t("$vuetify.id"),
          sortable: false,
          value: "id"
        },
        {
          text: this.$vuetify.lang.t("$vuetify.firstname"),
          value: "firstName"
        },
        {
          text: this.$vuetify.lang.t("$vuetify.lastname"),
          value: "lastName"
        },
        {
          text: this.$vuetify.lang.t("$vuetify.age"),
          value: "age"
        },
        {
          text: this.$vuetify.lang.t("$vuetify.mobile"),
          value: "mobile"
        },
        {
          text: this.$vuetify.lang.t("$vuetify.email"),
          value: "email"
        },
        {
          text: this.$vuetify.lang.t("$vuetify.status"),
          value: "student.status",
          align: "start"
        },
        {
          text: this.$vuetify.lang.t("$vuetify.opt"),
          align: "right",
          value: "actions",
          sortable: false,
        }
      ],
      myObj: {
        firstName: "",
        lastName: "",
        age: 0,
        mobile: "",
        email: "",
      },
      updateData:{
        firstName: "",
        lastName: "",
        age: 0,
        mobile: "",
        email: "",
      },
      deleteObj:{
        firstName: "",
        lastName: "",
        age: 0,
        mobile: "",
        email: "",
      },
      dialog: false,
      wait:false,
      isBtnEdit: false,
      isBtnSave: false,
    }
  },
  methods:{
    readStudent: async function(){
      const data = await api.readStudent();
      this.datas = data;
    },
    handleStudent(obj){
      this.dialog = false;
      this.updateData.firstName = obj.firstName;
      this.updateData.lastName = obj.lastName;
      this.updateData.age = obj.age;
      this.updateData.mobile = obj.mobile;
      this.updateData.email = obj.email;
      this.wait = true
    },
    handleEditDialog(obj){
      this.myObj.firstName = obj.firstName;
      this.myObj.lastName = obj.lastName;
      this.myObj.age = obj.age;
      this.myObj.mobile = obj.mobile;
      this.myObj.email = obj.email
      this.myObj.id = obj.id;
      this.isBtnEdit = false;
      this.isBtnSave = true;
      this.dialog = true
    },
    handleDialog(){
      this.myObj = {
        firstName: "",
        lastName: "",
        age: 0,
        mobile: "",
        email: "",
      }
      this.isBtnEdit = true;
      this.isBtnSave = false
      this.dialog = true
    },
    handleDeleteDialog(obj){
      this.dialogDelete = true
      this.deleteObj = obj
    },
    handleDeleteConfirm(obj){
      this.dialogDelete = false
      api.deleteStudent(obj.id)
        .then(()=>{
          this.readStudent();
        })
        .catch((err) => console.log("Student Delete Error", err))
    },
    handleStudentEdit(obj){
      this.dialog = false
      this.updateData.firstName = obj.firstName;
      this.updateData.lastName = obj.lastName;
      this.updateData.age = obj.age;
      this.updateData.email = obj.email;
      this.updateData.mobile = obj.mobile;
      api.updateStudent(obj.id , this.updateData).then(()=>{
        this.readStudent();
      })
      .catch((err) => console.log("Update Student: " + err));
    }
  },
  mounted(){
    this.readStudent();
  },
  watch:{
    wait: function(){
      if(this.wait == true){
        api.createStudent(this.updateData)
        .then(()=>{
          this.readStudent();
          this.wait = false
        })
        .catch((err) => console.log("New Student: " + err))
      }
    }
  }
}
</script>
