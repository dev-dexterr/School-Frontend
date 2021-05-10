<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <h2 class="headline text-uppercase ml-0">
          {{ $vuetify.lang.t("$vuetify.room") }}
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
                    v-on:edititem="handleEditDialog"
                    v-on:deleteitem="handleDeleteDialog"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <RoomCRUD
          :dialog.sync="dialog"
          :lectures="lectures"
          :myObj="myObj"
          :isBtnEdit.sync="isBtnEdit"
          @handleData="handleRoom"
          @handleEdit="handleRoomEdit"
          :isBtnSave.sync="isBtnSave"
        />

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
  name: "Room",
  components: {
    Table: () => import("@/components/core/Table.vue"),
    RoomCRUD: () => import("@/components/CRUD/RoomCRUD.vue"),
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
          text: this.$vuetify.lang.t("$vuetify.name"),
          sortable: false,
          align: "center",
          value: "name",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.lecture"),
          sortable: false,
          align: "center",
          value: "lecture.firstName",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.opt"),
          align: "right",
          value: "actions",
          sortable: false,
        },
      ],
      dialog: false,
      lectures: [],
      isBtnEdit: false,
      isBtnSave: false,
      dialogDelete: false,
      myObj: {
        name: "",
        lecture: {
          id: 0,
          firstName: "",
          lastName: "",
        },
      },
      deleteObj:{
        name: "",
        lecture: {
          id: 0,
          firstName: "",
          lastName: "",
        },
      },
      updateData:{
        name: "",
        lecture_Id : 0
      },
      cloneLecture: []
    };
  },
  methods: {
    readRooms: async function () {
      const data = await api.readRooms();
      this.datas = data;
    },
    readLecture: async function () {
      this.cloneLecture = []
      const data = await api.readLecture();
      this.cloneLecture = data
      data.forEach((p)=> this.lectures.push(p.firstName))
    },
    handleDialog() {
      this.myObj = {
        name: "",
        lecture: {
          id: 0,
          firstName: "",
          lastName: "",
        },
      };
      this.isBtnEdit = true;
      this.isBtnSave = false;
      this.dialog = true;
    },
    handleEditDialog(obj) {
      this.myObj.name = obj.name;
      this.myObj.lecture.id = obj.lecture.id;
      this.myObj.lecture.firstName = obj.lecture.firstName;
      this.myObj.id = obj.id
      this.isBtnEdit = false;
      this.isBtnSave = true;
      this.dialog = true;
    },
    handleRoom(obj){
      this.dialog = false;
      this.updateData.name = obj.name;
      for(var i =0; i < this.cloneLecture.length; i++){
        if(this.cloneLecture[i].firstName === obj.lecture.firstName ){
          var lectureId = this.cloneLecture[i].id;
          this.updateData.lecture_Id = lectureId
        }
      }
      const roomReq = {
        name: obj.name,
        lectureId: this.updateData.lecture_Id
      };
      api.createRoom(roomReq)
        .then(()=>{
          this.readRooms();
        })
        .catch((err) => console.log("Room create Error", err))
    },
    handleRoomEdit(obj){
      this.dialog = false;    
      for(var i = 0 ; i< this.cloneLecture.length; i++){
        if(this.cloneLecture[i].firstName === obj.lecture.firstName){
          var lectureId = this.cloneLecture[i].id;
          this.updateData.lecture_Id = lectureId;
        }
      }

      const roomReq = {
        name : obj.name,
        lectureId: this.updateData.lecture_Id
      };
      api.updateRoom(obj.id , roomReq)
        .then(()=>{
          this.readRooms();
        })
        .catch((err) => console.log("Room update Error", err))
    },
    handleDeleteDialog(obj){
      this.dialogDelete = true
      this.deleteObj = obj
    },
    handleDeleteConfirm(obj){
      this.dialogDelete = false;
      api.deleteRoom(obj.id)
       .then(()=>{
          this.readRooms();
        })
        .catch((err) => console.log("Room Delete Error", err))
    }
  },
  mounted() {
    this.readRooms();
    this.readLecture();
  },
};
</script>

<style>
</style>