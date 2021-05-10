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
                  {{ $vuetify.lang.t("$vuetify.room") }}
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="py-0" cols="12" lg="6" md="6" sm="6">
                <v-text-field
                  outlined
                  style="color: black"
                  :label="$vuetify.lang.t('$vuetify.RoomName')"
                  v-model="myObj.name"
                />
              </v-col>
              <v-col class="py-0" cols="12" lg="6" md="6" sm="6">
                <!-- <v-autocomplete
                  :items="lectures"
                  style="color: black"
                  item-value="id"
                  item-text="firstName"
                  :label="$vuetify.lang.t('$vuetify.lecture')"
                  outlined
                  v-model="myObj.firstName"
                ></v-autocomplete> -->
                <v-select
                    :items="lectures"     
                    :label="$vuetify.lang.t('$vuetify.lecture')"
                    outlined   
                    v-model="myObj.lecture.firstName"        
                />
              </v-col>
              <v-col> </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-8">
        <v-spacer />
        <v-btn color="red darken-2" outlined @click="cancel">{{
          $vuetify.lang.t("$vuetify.cancel")
        }}</v-btn>
        <v-btn color="light-grey darken-2"  @click="edit" :disabled="isBtnEdit">{{
          $vuetify.lang.t("$vuetify.edit")
        }}</v-btn>
        <v-btn color="light-grey darken-2" @click="save" :disabled="isBtnSave">{{
          $vuetify.lang.t("$vuetify.save")
        }}</v-btn>
        <v-spacer v-if="$vuetify.breakpoint.xsOnly" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RoomCRUD",
  props: { dialog: Boolean, lectures: Array , isBtnEdit: Boolean, isBtnSave: Boolean, myObj: Object},
  data() {
    return {
      valid: false,
    };
  },
  methods: {
    cancel() {
      this.$emit("update:dialog", false);
    },
    save() {
      this.$refs.form.validate() == true
        ? this.$emit("handleData", this.myObj)
        : console.log("false")
    },
    edit(){
      this.$refs.form.validate() == true
        ? this.$emit("handleEdit", this.myObj)
        : console.log("false")
    }
  },
};
</script>