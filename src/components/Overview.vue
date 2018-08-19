<template>
    <div id="overview">
        <div id="main">
            <!-- another component here-->
            <day-select :day="day">

            </day-select>

            <movie-list :day="day"
                        :movies="movies"
                        :genre="genre"
                        :time="time">
            </movie-list>
            <movie-filter></movie-filter>
        </div>
    </div>
</template>
<script>
    import MovieList from './MovieList.vue';
    import MovieFilter from './MovieFilter.vue';
    import DaySelect from './DaySelect.vue';
    export default {
        name: 'overview',
        props: ['day','movies','genre','time'],
        components: {
            MovieList,
            MovieFilter,
            DaySelect
        },
    }
</script>