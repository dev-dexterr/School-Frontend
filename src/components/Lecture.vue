<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <h2 class="headline text-uppercase ml-0">
          {{ $vuetify.lang.t("$vuetify.lecture") }}
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

        <LectureCRUD
          :dialog.sync="dialog"
          :myObj="myObj"
          @handleData="handleLecture"
          @handleEdit="handleLectureEdit"
          :isBtnEdit.sync="isBtnEdit"
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
  name: "Lecture",
  components: {
    Table: () => import("@/components/core/Table.vue"),
    LectureCRUD: () => import("@/components/CRUD/LectureCRUD.vue"),
    DeleteDialog: () => import("@/components/core/Delete.vue"),
  },
  data() {
    return {
      dialogDelete: false,
      headers: [
        {
          text: this.$vuetify.lang.t("$vuetify.id"),
          sortable: false,
          value: "id",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.firstname"),
          align: "center",
          value: "firstName",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.lastname"),
          align: "center",
          value: "lastName",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.opt"),
          align: "right",
          value: "actions",
          sortable: false,
        },
      ],
      datas: [],
      search: "",
      dialog: false,
      myObj: {
        firstName: "",
        lastName: "",
      },
      deleteObj:{
        firstName: "",
        lastName: "",
      },
      updateData: {
        firstName: "",
        lastName: "",
      },
      wait: false,
      isBtnEdit: false,
      isBtnSave: false,
    };
  },
  methods: {
    readLecture: async function () {
      const data = await api.readLecture();
      this.datas = data;
    },
    handleLecture(obj) {
      this.dialog = false;
      this.updateData.firstName = obj.firstName;
      this.updateData.lastName = obj.lastName;
      this.wait = true;
    },
    handleDialog() {
      this.myObj = {
        firstName: "",
        lastName: "",
      };
      this.isBtnEdit = true;
      this.isBtnSave = false
      this.dialog = true;
    },
    handleEditDialog(obj) {
      this.myObj.firstName = obj.firstName;
      this.myObj.lastName = obj.lastName;
      this.myObj.id = obj.id
      this.isBtnEdit = false;
      this.isBtnSave = true;
      this.dialog = true;
    },
    handleDeleteDialog(obj){
      this.dialogDelete = true
      this.deleteObj = obj
    },
    handleDeleteConfirm(obj){
      this.dialogDelete = false
      api.deleteLecture(obj.id)
        .then(()=>{
          this.readLecture();
        })
        .catch((err) => console.log("Lecture Delete Error", err))
    },
    handleLectureEdit(obj){
      this.dialog = false;
      this.updateData.firstName = obj.firstName;
      this.updateData.lastName = obj.lastName;
      api.updateLecture(obj.id, this.updateData).then(()=>{
        this.readLecture();
      })
      .catch((err) => console.log("Update Lecture: " + err));
    }
  },
  mounted() {
    this.readLecture();
  },
  watch: {
    wait: function () {
      if (this.wait == true) {
        api
          .createLecture(this.updateData)
          .then(() => {
            this.readLecture();
            this.wait = false;
          })
          .catch((err) => console.log("New Lecture: " + err));
      }
    },
  },
};
</script>

<style>
</style>