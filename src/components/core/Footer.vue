<template>
    <v-footer height="60" class="d-block text-center">
        <div>
            {{ $vuetify.lang.t("$vuetify.group") }}: {{ $vuetify.lang.t("$vuetify.Manet") }} , {{ $vuetify.lang.t("$vuetify.thong") }} , {{ $vuetify.lang.t("$vuetify.tola") }}
        </div>
    </v-footer>
</template> 

<script>
export default {
    name: "Footer"
}
</script>

