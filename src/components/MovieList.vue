<template>
    <div id="movie-list">
        <div v-for="movie in filteredMovies" class="movie">
            <div><img :src="movie.movie.Poster"></div>
            <div class="movie-col-right">
                <div class="movie-title">
                    <h2>
                    {{movie.movie.Title}}
                    </h2>
                </div>
                <div class="movie-rating" v-for="Rating in movie.movie.Ratings">
                    <h4>{{ Rating.Source }} - {{ Rating.Value }}</h4>
                </div>
                <div class="movie-sessions">
                    <div class="tooltip-show session-time-wrapper" v-for="session in movie.sessions">
                        <button
                                data-toggle="tooltip"
                                data-placement="top"
                                :title="session.seats|seatsForASession"
                                class="session-time movie-title"
                        >{{session.time|displayFormattedTime}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    import moment from 'moment';
    export default {
        name: 'movie-list',
        props: ['genre', 'time', 'movies'],
        /*data: function () {
            return {
                movies: [
                    {
                        title: 'Pulp Fiction',
                        genre: genres.COMEDY,
                        time: '0930'
                    },
                    {
                        title: 'Robocop',
                        genre: genres.CRIME,
                        time: '1450'
                    },
                    {
                        title: 'T2',
                        genre: genres.HORROR,
                        time: '2315'
                    }
                ],
            };
        },*/
        methods: {
            movieHasCategory: function (category, movieCategory) {

                var hasCategoryMatches = 0;

                for (var i = 0; i < category.length; i++) {
                    for (var j = 0; j < movieCategory.length; j++) {
                        if (category[i] == movieCategory[j]) {
                            hasCategoryMatches++;
                        }
                    }
                }

                return (hasCategoryMatches == category.length) ? true : false;
            },

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
            moviePassesTimeFilter(movie) {
                if (!this.genre.length) {
                    return true;
                }
                return this.time.find(time => time === movie.time);
            },
        },
        computed: {
            noFilterSelected: function () {
                return this.time.length == 0 && this.genre.length == 0;
            },
            filteredMovies: function () {
                var filteredByGenre = this.movies.filter(this.moviePassesGenreFilter);
                var filteredByTime = this.movies.filter(this.moviePassesTimeFilter);
                return filteredByGenre.concat(filteredByTime.filter(function (item) {
                    return filteredByGenre.indexOf(item) < 0;
                }));
            },

        },
        filters: {
            displayFormattedTime: function(value) {
                return moment(value).format('h:mma')
            },
            seatsForASession: function(seats) {
                return seats+' available';
            }
        }
    }
</script>