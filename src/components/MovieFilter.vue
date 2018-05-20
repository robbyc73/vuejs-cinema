<template>
    <div id="movie-filter">
        <h2>Filter Results</h2>
        <h3>By Genre</h3>
        <div class="filter-group">
            <check-filter @check-filter="checkFilter" v-for="genre in genres" :title="genre" :category="'genre'"></check-filter>
        </div>
        <h3>By Time</h3>
        <div class="filter-group">
            <check-filter @check-filter="checkFilter" v-for="time in times" :title="time" :category="'time'"></check-filter>
        </div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    import CheckFilter from './CheckFilter.vue';
    export default {
        name: 'movie-filter',
        data() {
            return {
                genres,
                times: ['0930','1330','1450','1745','1850','2315']
            };
        },
        components: {
            CheckFilter
        },
        methods: {
            checkFilter(category,title,checked) {
                this.$emit('check-filter',category,title,checked);
            },
        }
    }
</script>