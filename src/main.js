import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

new Vue({
   el: '#app',
   data: {
     genre: [],
     time: []
   },

    components: {
       'movie-list': {
           template: `<div id="movie-list">
                       <div v-for="movie in filteredMovies">{{movie.title}}</div>
                     </div>`,
           props: {
               genre: {
                   type:Array,
                   'default': []
               },
               time: {
                   type: Array,
                   'default': []
               }
           },
           data: function () {
               return {
                   genres,
                   movies: [
                       {
                           title: 'Pulp Fiction',
                           genre: [genres.CRIME, genres.COMEDY],
                           time: ['0930','1330','1745']
                       },
                       {
                           title: 'Robocop',
                           genre: [genres.CRIME],
                           time: ['1450','1850']
                       },
                       {
                           title: 'T2',
                           genre: [genres.HORROR],
                           time: ['2315']
                       }
                   ],
               };
           },
           methods: {
               movieHasCategory: function(category,movieCategory) {

                   var hasCategoryMatches = 0;

                   for(var i = 0; i< category.length; i++){
                       for(var j = 0; j < movieCategory.length; j++){
                           if (category[i] ==  movieCategory[j]) {
                               hasCategoryMatches++;
                           }
                       }
                   }

                   return (hasCategoryMatches == category.length) ? true : false;
               },

              moviePassesGenreFilter(movie) {
                   console.log("movie is "+movie.title);
                   return true;
                  /* if(!this.movies.length){
                       return true;
                   } else {*/
                       return this.genre.find(genre => movie.genre === genre);
                  // }
              },
              moviePassesTimeFilter(movie){
                   return this.time.find(time => movie.time === time);
              }
           },
           computed: {
               noFilterSelected: function() {
                   return this.time.length == 0 && this.genre.length == 0;
               },
               filteredMovies: function() {
                   var filteredMovies = this.movies.filter(this.moviePassesGenreFilter);
                   console.log("count movies is "+filteredMovies.length);
                   return this.movies.filter(this.moviePassesGenreFilter);
               }
           }
       },

        'movie-filter': {
           data() {
               return {
                   genres,
                   times: ['0930','1330','1450','1745','1850','2315']
               };
           },
           template: `<div id="movie-filter">
                        <h2>Filter Results</h2>
                        <h3>By Genre</h3>
                        <div class="filter-group">
                            <check-filter @check-filter="checkFilter" v-for="genre in genres" :title="genre" :category="'genre'"></check-filter>
                        </div>
                        <h3>By Time</h3>
                        <div class="filter-group">
                            <check-filter @check-filter="checkFilter" v-for="time in times" :title="time" :category="'time'"></check-filter>
                        </div>
                        </div>`,
           components: {
               'check-filter': {
                   props: ['title','category'],
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
                           this.$emit('check-filter',this.category,this.title,this.checked);
                       },
                   }

               }
           },
            methods: {
               checkFilter(category,title,checked) {
                   this.$emit('check-filter',category,title,checked);
               },
            }
        }
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