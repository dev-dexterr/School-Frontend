<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <h2 class="headline text-uppercase ml-0">
          {{ $vuetify.lang.t("$vuetify.dashboard") }}
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
                  <Table
                    :head="headers"
                    :data="datas"
                    :search="search"
                    v-on:deleteitem="handleDeleteDialog"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>

        <DashBoardCRUD
          :dialog.sync="dialog"
          :myObj="myObj"
          :room="room"
          :student="student"
          @handleData="handelDashboard"
        />
        <DeleteDialog :dialogDelete.sync="dialogDelete" :deleteObj="deleteObj" @handleDelete="handleDeleteConfirm"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/service/apiService";
export default {
  name: "DashBoard",
  components: {
    Table: () => import("@/components/core/Table.vue"),
    DashBoardCRUD: () => import("@/components/CRUD/DashBoardCRUD.vue"),
    DeleteDialog: () => import("@/components/core/Delete.vue"),
  },
  data() {
    return {
      datas: [],
      search: "",
      headers: [
        {
          text: this.$vuetify.lang.t("$vuetify.id"),
          sortable: false,
          value: "id",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.status"),
          sortable: false,
          value: "status",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.starton"),
          sortable: false,
          align: "center",
          value: "startOn",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.dueon"),
          sortable: false,
          align: "center",
          value: "dueOn",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.roomName"),
          sortable: false,
          value: "room.name",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.lecture"),
          sortable: false,
          value: "room.lecture.firstName",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.student"),
          sortable: false,
          value: "student.lastName",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.opt"),
          align: "right",
          value: "delete",
          sortable: false,
        },
      ],
      dialog: false,
      myObj: {
        dueOn: "",
        room: {
          lecture: {
            firstName: "",
            lastName: "",
          },
          name: "",
        },
        startOn: "",
        status: "",
        student: {
          age: 0,
          email: "",
          firstName: "",
          lastName: "",
          mobile: "",
          status: "",
        },
      },
      deleteObj:{
         dueOn: "",
        room: {
          lecture: {
            firstName: "",
            lastName: "",
          },
          name: "",
        },
        startOn: "",
        status: "",
        student: {
          age: 0,
          email: "",
          firstName: "",
          lastName: "",
          mobile: "",
          status: "",
        },
      },
      updateData:{
        room_Id : 0,
        student_Id : 0
      },
      dialogDelete: false,
      room: [],
      cloneRoom: [],
      student: [],
      cloneStudent: []
    };
  },
  methods: {
    readFee: async function () {
      const data = await api.readFee();
      this.datas = data;
    },
    readRooms: async function () {
      this.cloneRoom = []
      const data = await api.readRooms();
      this.cloneRoom = data;
      data.forEach((a) => this.room.push(a.name))
    },
    readStudent: async function(){
      this.cloneStudent = []
      const data = await api.readStudent();
      this.cloneStudent = data;
      data.forEach((a) => this.student.push(a.lastName))
    },
    handleDialog() {
      this.myObj = {
        dueOn: "",
        room: {
          lecture: {
            firstName: "",
            lastName: "",
          },
          id: 0,
          name: "",
        },
        startOn: "",
        status: "",
        student: {
          age: 0,
          email: "",
          firstName: "",
          lastName: "",
          mobile: "",
          status: "",
        },
      };
      this.dialog = true;
    },
    handleDeleteDialog(obj){
      this.dialogDelete = true
      this.deleteObj = obj
    },
    handleDeleteConfirm(obj){
      this.dialogDelete = false;
      console.log(obj)
      api.deleteFee(obj.id)
        .then(()=>{
          this.readFee();
        })
        .catch((err) => console.log("Fee Delete Error", err))
    },
    handelDashboard(obj){
      this.dialog = false;
      //Loop for room Id 
      for(var i = 0; i < this.cloneRoom.length; i++){
        if(this.cloneRoom[i].name === obj.room.name){
          var roomId = this.cloneRoom[i].id
          this.updateData.room_Id = roomId;
        }
      }

      //Loop for student id 
      for(var x=0; x < this.cloneStudent.length; x++){
        if(this.cloneStudent[x].lastName === obj.student.lastName){
          var studentId = this.cloneStudent[x].id;
          this.updateData.student_Id = studentId
        }
      }
      const feeReq = {
        roomIds: [this.updateData.room_Id],
        studentId: this.updateData.student_Id
      };
      api.feeRoom(feeReq)
        .then(()=>{
          this.readFee();
        })
        .catch((err) => console.log("Fee create Error", err))
    }
  },
  mounted() {
    this.readFee();
    this.readRooms();
    this.readStudent();
  },
};
</script>

<style>
</style>