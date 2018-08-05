<template>
    <div class="movie">
    <div class="movie-col-left"><router-link :to="routerLink(movie)"><img :src="movie.Poster"></router-link></div>
    <div class="movie-item movie-col-right">
        <div class="movie-title">
            <router-link :to="routerLink(movie)"><h2>{{movie.Title}}</h2></router-link>
            <span class="movie-rating">{{movie.Rated}}</span>
        </div>
        <div v-for="Rating in movie.Ratings">
            <h4>{{ Rating.Source }} - {{ Rating.Value }}</h4>
        </div>
        <slot>
        </slot>
    </div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    import times from '../util/times';
    export default {
        name: 'movie-item',
        props: ['movie'],
        methods: {
            routerLink(movie) {
                return 'movie/'+movie.imdbID;
            }
        },
    }
</script>