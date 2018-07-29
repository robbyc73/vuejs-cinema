import Vue from 'vue';
import './style.scss';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';
import MovieItem from './components/MovieItem.vue';

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype,'$moment', { get() { return this.$root.moment} });
import lodash from 'lodash';
//Object.defineProperty(Vue.prototype,'$lodash', { get() { return this.$root.lodash} });


new Vue({
   el: '#app',
   data: {
     genre: [],
     time: [],
     movies: [],
     moment,
     lodash,
     day: moment(),
   },

    components: {
        MovieList,
        MovieFilter,
        MovieItem
    },
    methods: {
        checkFilter(category,title,checked) {

            if(checked) {
                this[category].push(title);
            } else {
                let index = this[category].indexOf(title);
                if(index > -1){
                    this[category].splice(index,1);
                }
            }

        },
    },
    created(){
       this.$http.get('/api').then(response => {
           this.movies = response.body;
       });




    }


});

//Object.defineProperty(Vue.prototype,'$moment', { get() { return this.$root.moment} });
//Object.defineProperty(Vue.prototype,'$lodash', { get() { return this.$root.lodash} });