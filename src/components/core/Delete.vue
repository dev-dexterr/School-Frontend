<template>
  <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="display-2 pa-2 deleteTitle">
        <v-container>
          <v-row>
            <v-col cols="12" class="pa-0 my-2 display-2">
              <div
                class="d-flex justify-center align-center"
                style="font-size: 25px"
              >
                {{ $vuetify.lang.t("$vuetify.areyouSure") }}
              </div>
              <div
                class="d-flex justify-center align-center"
                style="font-size: 14px"
              >
                <p>{{ $vuetify.lang.t("$vuetify.deletePrompt") }}</p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          outlined
          @click="$emit('update:dialogDelete', false)"
          >{{ $vuetify.lang.t("$vuetify.cancel") }}</v-btn
        >
        <v-spacer />
        <v-btn
          color="error darken-1"
          @click="$emit('handleDelete', deleteObj)"
          >{{ $vuetify.lang.t("$vuetify.delete") }}</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteDialog",
  props: { dialogDelete: Boolean, deleteObj: Object },
};
</script>

<style>
</style>