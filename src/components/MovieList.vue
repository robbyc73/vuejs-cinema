<template>
    <div id="movie-list">
        <div v-for="movie in filteredMovies" class="movie">{{movie.title}}</div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    export default {
        name: 'movie-list',
        props: ['genre', 'time'],
        data: function () {
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
        },
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

                return this.genre.find(genre => genre === movie.genre);
            },
            moviePassesTimeFilter(movie) {
                if (!this.genre.length) {
                    return true;
                }
                return this.time.find(time => time === movie.time);
            }
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
            }
        }
    }
</script>