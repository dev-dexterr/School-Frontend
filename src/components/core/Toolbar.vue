<template v-slot:activator="{on}">
  <div>
    <v-app-bar flat>
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      </span>
      <div class="headline text-uppercase ml-0">
        <div v-resize-text>
          <router-link to="/" tag="span" style="cursor: pointer">
            <v-icon> mdi-school</v-icon>
            {{ $vuetify.lang.t("$vuetify.school") }}
          </router-link>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/" tag="span" style="cursor: pointer">
          <router-link to="/" tag="span" style="cursor: pointer">
            {{ $vuetify.lang.t("$vuetify.dashboard") }}
          </router-link>
        </v-btn>

        <v-btn text to="/room" tag="span" style="cursor: pointer">
          <router-link to="/room" tag="span" style="cursor: pointer">
            {{ $vuetify.lang.t("$vuetify.room") }}
          </router-link>
        </v-btn>

        <v-btn text to="/lecture" tag="span" style="cursor: pointer">
          <router-link to="/lecture" tag="span" style="cursor: pointer">
            {{ $vuetify.lang.t("$vuetify.lecture") }}
          </router-link>
        </v-btn>

        <v-btn text to="/student" tag="span" style="cursor: pointer">
          <router-link to="/student" tag="span" style="cursor: pointer">
            {{ $vuetify.lang.t("$vuetify.student") }}
          </router-link>
        </v-btn>

        <v-icon>mdi-weather-sunny</v-icon>
        <v-list-item-action class="ml-2">
          <v-switch v-model="isDark" inset></v-switch>
        </v-list-item-action>
        <v-icon>mdi-weather-night</v-icon>

        <LocaleChanger/>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import LocaleChanger from '@/components/core/LocaleChanger'
export default {
  name: "Toolbar",
  components: { LocaleChanger},
  data() {
    return {
      sidebar: false,
      isDark: false
    };
  },
  watch:{
      isDark(){
          this.$vuetify.theme.dark = this.isDark
          localStorage.setItem('dark', this.isDark)
      }
  },
  created(){
      const dark = localStorage.getItem('dark')
      this.isDark = dark ? JSON.parse(dark) : false
  }
};
</script>
