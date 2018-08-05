<template>
    <div class="movie">
    <div class="movie-col-left"><img :src="movie.Poster"></div>
    <div class="movie-item movie-col-right">
        <div class="movie-title">
            <h2>
                {{movie.Title}}
            </h2>
            <span class="movie-rating">{{movie.Rated}}</span>
        </div>
        <div v-for="Rating in movie.Ratings">
            <h4>{{ Rating.Source }} - {{ Rating.Value }}</h4>
        </div>
        <div class="movie-sessions">
            <div class="tooltip-show session-time-wrapper" v-for="session in sessions">
                <button
                        data-toggle="tooltip"
                        data-placement="top"
                        :title="session.seats|seatsForASession"
                        class="session-time movie-title"
                >{{displayFormattedTime(session.time)}}
                </button>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    import times from '../util/times';
    export default {
        name: 'movie-item',
        props: ['movie', 'sessions', 'day', 'time'],

        methods: {
            displayFormattedTime: function(value) {
                return this.$moment(value).format('h:mm A');
            },
        },
        computed: {
        },
        filters: {
            seatsForASession: function(seats) {
                return seats+' available';
            }
        },
    }
</script>