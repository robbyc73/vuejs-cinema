<template>
    <div id="movie-filter">
        <h2>Filter Results</h2>
        <h3>By Genre</h3>
        <div class="filter-group">
            <check-filter v-for="genre in genres" :title="genre" category="genre"></check-filter>
        </div>
        <h3>By Time</h3>
        <div class="filter-group">
            <check-filter v-for="time in times" :title="time" category="time"></check-filter>
        </div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    import times from '../util/times';
    import CheckFilter from './CheckFilter.vue';
    export default {
        name: 'movie-filter',
        data() {
            return {
                genres,
                times
            };
        },
        components: {
            CheckFilter
        },
    }
</script>