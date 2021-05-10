import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import en from '@/lang/en.ts'
import kh from '@/lang/kh.ts'

Vue.use(Vuetify);

const theme = JSON.parse(localStorage.getItem('dark')) || false
const opts = {
    theme: {
        dark: theme !== false
    },
    lang: {
        locales: { en, kh },
        current: localStorage.getItem('lang') || 'en'
    }
}

export default new Vuetify(opts)
// export default new Vuetify({
//     lang:{
//         locales:{en , kh},
//         current: localStorage.getItem('lang') || 'en'
//     }
// });
