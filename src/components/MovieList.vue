<template>
    <div id="movie-list">
        <div v-for="movie in filteredMovies">
            <movie-item :movie="movie.movie"
                        :sessions="filteredSessions(movie.sessions)"
                        :day="day"
                        :time="time">
            </movie-item>
        </div>
        <div class="no-results" v-if="filteredMovies.length == 0">
            {{ noResultsFound }}
        </div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    import times from '../util/times';
    import MovieItem from './MovieItem.vue';
    export default {
        name: 'movie-list',
        components: {
            MovieItem
        },
        props: {
            genre: {
                type: Array,
                'default': ''
            },
            time: {
                type: Array,
                'default': ''
            },
            movies: {
                type: Array,
                'default': ''
            },
            day: {
                type: Object,
                'default': ''
            },
        },

        methods: {
            moviePassesGenreFilter(movie) {
                if (!this.genre.length) {
                    return true;
                }

                var movieGenres = movie.movie.Genre.split(',');

                var foundGenre = 0;

                for(var i = 0; i < movieGenres.length; i++) {
                    if(this.genre.find(genre => genre === movieGenres[i])) {
                        foundGenre++;
                    }
                }

                return (foundGenre > 0) ? true : false;
            },
            sessionInSelectedDay(session){
                let sessionTime = this.$moment(session.time).format('YYYY-MM-DD');
                let currentDay = this.getCurrentDay();
                return (sessionTime == currentDay);
            },

            getCurrentDay()
            {
                let currDay = this.$moment(this.day).format('YYYY-MM-DD');
                return currDay;
            },
            sessionPassesTimeFilter: function(session){
                if(!this.sessionInSelectedDay(session)) {
                    return false;
                } else if (this.time.length == 0 || this.time.length == 2){
                    return true;
                } else if(this.time[0] === times.AFTER_6PM) {
                    return this.$moment(session.time).hour() >= 18;
                } else if(this.time[0] === times.BEFORE_6PM) {
                    return this.$moment(session.time).hour() < 18;
                }

                return true;
            },
            filteredSessions: function(sessions) {
                return sessions.filter(session => {
                    return this.$moment(session.time).isSame(this.day,'day') && this.sessionPassesTimeFilter(session);
                });
            }
        },
        computed: {
            filteredMovies: function () {
                return this.movies
                    .filter(this.moviePassesGenreFilter)
                    .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
            },
            noResultsFound: function() {
                let noResultStr =  'No results found';

                if(this.genre.length >0) {
                    noResultStr += ' for genre(s) '+this.genre.join(', ');
                }

                if(this.time.length > 0) {
                    noResultStr += ' and time(s) '+this.time.join(', ');
                }

                return noResultStr;
            }


        },
    }
</script>