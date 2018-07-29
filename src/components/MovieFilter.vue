<template>
    <div id="movie-filter">
        <h2>Filter Results</h2>
        <h3>By Genre</h3>
        <div class="filter-group">
            <check-filter @check-filter="checkFilter" v-for="genre in genres" :title="genre" category="genre"></check-filter>
        </div>
        <h3>By Time</h3>
        <div class="filter-group">
            <check-filter @check-filter="checkFilter" v-for="time in times" :title="time" category="time"></check-filter>
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
                /*times: ['1:15 PM','4:30 PM','9:30 PM','1:30 PM','2:50 PM','4:15 PM','5:30 PM','5:45 PM','6:30 PM','6:50 PM','11:15 PM']*/
            };
        },
        components: {
            CheckFilter
        },
        methods: {
            checkFilter(category,title,checked) {
                this.checked = !this.checked;
                this.$emit('check-filter',category,title,checked);
            },
        }
    }
</script>