import Vue from 'vue';
import './style.scss';
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

new Vue({
   el: '#app',
   data: {
     genre: [],
     time: []
   },

    components: {
        MovieList,
        MovieFilter
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

        }
    }

});