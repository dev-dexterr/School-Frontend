<template>
  <v-menu v-model="showMenu" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn class="btnLocaleActivation" v-on="on" text>
        <v-icon>mdi-earth</v-icon>
        &nbsp;{{ $vuetify.lang.t("$vuetify.changeLang") }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, i) in langs"
        :key="`Lang${i}`"
        :value="item.lang"
        @click="switchLocale(item.lang)"
        :class="[item.class]"
      >
        <country-flag :country="item.flag" size="small" />
        <v-list-item-title class="ml-3">{{
          item.lang.toUpperCase()
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import CountryFlag from 'vue-country-flag'
export default {
  name: "LocaleChanger",
  components:{
    CountryFlag
  },
  data() {
    return {
      showMenu: false,
      langs: [
        {
          lang: "en",
          flag: "gb",
          class: "btnEN",
        },
        {
          lang: "kh",
          flag: "khm",
          class: "btnKH",
        },
      ],
    };
  },
  methods: {
    switchLocale(lang) {
      this.$vuetify.lang.current = lang;
      localStorage.setItem("lang", lang)
    }
  },
};
</script>

<style>
.flag{
  width: 70px !important;
}

.v-list-item{
  min-width: 185px !important;
}
</style>