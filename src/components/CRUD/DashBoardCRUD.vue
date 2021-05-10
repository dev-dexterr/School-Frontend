<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card class="pa-0" elevation="2">
      <v-card-text class="pb-0">
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="12" class="pa-0 my-2 display-2">
                <div
                  class="d-flex justify-center align-center"
                  style="font-size: 30px"
                >
                  {{ $vuetify.lang.t("$vuetify.dashboard") }}
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="py-0" cols="12" lg="6" md="6" sm="6">
                <v-select
                    :items="room"     
                    :label="$vuetify.lang.t('$vuetify.room')"
                    outlined      
                    v-model="myObj.room.name"     
                />
              </v-col>
              <v-col class="py-0" cols="12" lg="6" md="6" sm="6">
                  <v-select
                    :items="student"     
                    :label="$vuetify.lang.t('$vuetify.student')"
                    outlined   
                    v-model="myObj.student.lastName"        
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-8">
        <v-spacer />
        <v-btn color="red darken-2" outlined @click="cancel">{{
          $vuetify.lang.t("$vuetify.cancel")
        }}</v-btn>
        <v-btn color="dark-grey darken-2" @click="save" >{{
          $vuetify.lang.t("$vuetify.save")
        }}</v-btn>
        <v-spacer v-if="$vuetify.breakpoint.xsOnly" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DashBoardCRUD",
  props: {dialog : Boolean, room : Array , student: Array, myObj : Object},
  data(){
      return{
          valid: false
      }
  },
  methods: {
    save() {
        this.$refs.form.validate() == true
        ? this.$emit("handleData", this.myObj)
        : console.log("false")
    },
    cancel(){
        this.$emit("update:dialog", false);
    }
  },
};
</script>

<style>
</style>