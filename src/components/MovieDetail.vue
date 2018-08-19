<template>
    <div id="detail">
        <div class="movie">
            <div v-if="movie">
                <movie-item :movie="movie">
                    <div class="movie-details">
                        <p class="movie-genre">{{ movie.Genre}}</p>
                        <p class="movie-plot">{{ movie.Plot}}</p>
                    <table>
                        <tr>
                            <td>
                                Actors
                            </td>
                            <td>
                                {{ movie.Actors}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Release Date
                            </td>
                            <td>
                                {{ movie.Released}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Director
                            </td>
                            <td>
                                {{ movie.Director}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Runtime
                            </td>
                            <td>
                                {{ movie.Runtime}}
                            </td>
                        </tr>
                    </table>
                    </div>
                </movie-item>
            </div>
        </div>
        <div id="home">
            <div class="movie-title">
                <router-link to="/"><h2>Back to Results</h2></router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import MovieItem from './MovieItem.vue';
    export default {
        components : {
            MovieItem
        },
        props: {
            'day': {
                type: Object,
                'default': ''
            },
            'movies': {
                type: Array,
                'default': []
            },
            'genre': {
                type: Array,
                'default': []
            },
            'time': {
                type: Array,
                'default': []
            },
        },
        computed: {
            movie() {
                let movie = this.movies.find(movie => movie.id == this.$route.params.imdbID);

                return movie ? movie.movie : null;
            }
        },
        methods: {
        },
    }
</script>