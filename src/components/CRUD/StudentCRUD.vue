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
                  {{ $vuetify.lang.t("$vuetify.student") }}
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="py-0" cols="12" lg="5" md="6" sm="6">
                <v-text-field
                  outlined
                  style="color: black"
                  :label="$vuetify.lang.t('$vuetify.firstname')"
                  v-model="myObj.firstName"
                />
              </v-col>
              <v-col class="py-0" cols="12" lg="5" md="6" sm="6">
                <v-text-field
                  outlined
                  style="color: black"
                  :label="$vuetify.lang.t('$vuetify.lastname')"
                  v-model="myObj.lastName"
                />
              </v-col>
              <v-col class="py-0" cols="12" lg="2" md="6" sm="6">
                <v-text-field
                  outlined
                  style="color: black"
                  :label="$vuetify.lang.t('$vuetify.age')"
                  type="number"
                  v-model="myObj.age"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0" cols="12" lg="5" md="6" sm="6">
                <v-text-field
                  outlined
                  style="color: black"
                  :label="$vuetify.lang.t('$vuetify.mobile')"
                  type="number"
                  v-model="myObj.mobile"
                />
              </v-col>
              <v-col class="py-0" cols="12" lg="7" md="6" sm="6">
                <v-text-field
                  outlined
                  style="color: black"
                  :label="$vuetify.lang.t('$vuetify.email')"
                  type="email"
                  v-model="myObj.email"
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
  name: "StudentCRUD",
  props: { dialog: Boolean, myObj: Object, isBtnEdit: Boolean, isBtnSave: Boolean },
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
    },
  },
};
</script>
