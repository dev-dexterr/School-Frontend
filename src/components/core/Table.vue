<template>
  <div class="container">
    <v-data-table
      :headers="this.$props.head"
      :items="this.$props.data"
      :search="this.$props.search"
    >
    <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip top >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="mr-2"
              color="blue"
              @click="$emit('edititem', item)"
              v-bind="attrs"
              v-on="on"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>{{ $vuetify.lang.t("$vuetify.edit") }}</span>
        </v-tooltip>
        <v-tooltip top >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              @click="$emit('deleteitem', item)"
              color="red"
              v-bind="attrs"
              v-on="on"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>{{ $vuetify.lang.t("$vuetify.delete") }}</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.delete`]="{item}">
        <v-tooltip top >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              @click="$emit('deleteitem', item)"
              color="red"
              v-bind="attrs"
              v-on="on"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>{{ $vuetify.lang.t("$vuetify.delete") }}</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.status`]>
          <span>
            <v-chip dark small class="my-0" color="green">
            {{ $vuetify.lang.t("$vuetify.paid") }}
          </v-chip>
          </span>
      </template>
      <template v-slot:[`item.student.status`]>
          <span>
            <v-chip dark small class="my-0" color="green">
            {{ $vuetify.lang.t("$vuetify.active") }}
          </v-chip>
          </span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    head: Array,
    data: Array,
    search: String,
  },
};
</script>
