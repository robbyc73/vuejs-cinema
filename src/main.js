import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

new Vue({
   el: '#app',
    components: {
       'movie-list': {
           template: `<div id="movie-list">
                       <div v-for="movie in movies">{{movie.title}}</div>
                     </div>`,
           data: function () {
               return {
                   movies: [
                       {title: 'Pulp Fiction'},
                       {title: 'Robocop'},
                       {title: 'T2'}
                   ]
               };
           }
       },
        'movie-filter': {
           data() {
               return {
                   genres
               };
           },
           template: `<div id="movie-filter">
                        <h2>Filter Results</h2>
                        <div class="filter-group">
                            <check-filter @check-filter="checkFilter" v-for="genre in genres" :title="genre"></check-filter>
                        </div>
                        </div>`,
           components: {
               'check-filter': {
                   props: ['title'],
                   data() {
                       return {
                               checked: false
                       };
                   },
                   template: `<div :class="{ 'check-filter': true, 'active': checked }" @click="checkFilter">
                                    <span class="checkbox"></span>
                                    <span class="check-filter-title">{{title}}</span>
                               </div>`,
                   methods: {
                       checkFilter() {
                           this.checked = !this.checked;
                           console.log("first check filter");
                           this.$emit('check-filter');
                       },
                       /*emitEvent() {

                           this.filterObj.checked = !this.filterObj.checked;
                           this.filterObj.filter = title;
                           console.log("first emit");
                           this.$emit('toParent',this.filterObj.checked);
                       }*/
                   }

               }
           },
            methods: {
               checkFilter() {
                   console.log("second check filter");
                   this.$emit('check-filter');
               },
               /* emitTopEvent(filterObj){
                    console.log("second emit");
                    this.$emit('toTopParent',filterObj);
               }*/
            }
        }
    },
    methods: {
        checkFilter() {
            console.log("value of filterObj ");
        }
    }

});