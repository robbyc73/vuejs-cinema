<template>
    <div id="detail">
        <div id="home">
            <div class="movie-title">
                <router-link to="/"><h2>Return To List</h2></router-link>
            </div>
        </div>
        <div class="movie">
            <div v-if="movie" class="movie-details">
                <movie-item :movie="movie.movie">
                    <table>
                        <tr>
                            <td>
                                Plot
                            </td>
                            <td>
                                {{ movie.movie.Plot}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Actors
                            </td>
                            <td>
                                {{ movie.movie.Actors}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                DVD Date
                            </td>
                            <td>
                                {{ movie.movie.DVD}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Genre
                            </td>
                            <td>
                                {{ movie.movie.Genre}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Director
                            </td>
                            <td>
                                {{ movie.movie.Director}}
                            </td>
                        </tr>
                    </table>
                </movie-item>
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

                return movie ? movie : null;
            }
        },
        methods: {
        },
    }
</script>