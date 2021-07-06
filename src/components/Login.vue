<template>
  <v-container fluid>
    <v-card class="mx-auto my-12" persistent max-width="500px">
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-container fluid>
          <v-row>
            <v-col>
              <div
                class="d-flex justify-center align-center"
                style="font-size: 30px"
              >
                {{ $vuetify.lang.t("$vuetify.login") }}
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="py-0 pa-10 mt-5" cols="12" lg="12" md="6" sm="6">
              <v-text-field
                outlined
                type="text"
                style="color: black"
                :label="$vuetify.lang.t('$vuetify.username')"
                :rules="[rule.required]"
                v-model="form.username"
                prepend-inner-icon="mdi-account"
                @keypress.enter="handleLogin"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0 pa-10" cols="12" lg="12" md="6" sm="6">
              <v-text-field
                type="password"
                clearable
                outlined
                style="color: black"
                :label="$vuetify.lang.t('$vuetify.password')"
                :rules="[rule.required]"
                v-model="form.password"
                prepend-inner-icon="mdi-key"
                @keypress.enter="handleLogin"
              />
            </v-col>
          </v-row>
          <!-- <v-row>
            <v-col class=" cols="12" lg="12" md="6" sm="6">
              <v-btn color="light-grey" @click="handleLogin" large>
                {{ $vuetify.lang.t("$vuetify.login") }}
              </v-btn>
            </v-col>
          </v-row> -->
        </v-container>
      </v-form>
      <v-card-actions class="pt-2 pr-4 pa-5 mr-5 d-flex justify-end">
        <v-btn color="light-grey" @click="handleLogin" large>
          {{ $vuetify.lang.t("$vuetify.login") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
const newForm = () => {
  return {
    username: "",
    password: "",
  };
};

export default {
  name: "Login",
  data() {
    return {
      valid: false,
      rule: {
        required: (v) => !!v || "this field is required",
      },
      message: "",
      form: newForm(),
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleLogin() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("auth/login", this.form).then(
          () => {
            this.$router.push("/dashboard");
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
};
</script>

<style>
</style>