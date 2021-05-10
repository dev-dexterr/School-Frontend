<template>
  <v-app>
    <Toolbar />
    <v-main class="text=center">
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <v-container>
            <v-row>
              <v-col>
                <v-sheet min-height="70vh" rounded="lg">
                  <router-view></router-view>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </transition>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    Toolbar: () => import("@/components/core/Toolbar"),
    Footer: () => import("@/components/core/Footer"),
  },
};
</script>
