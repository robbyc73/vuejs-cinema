<template>
    <div id="overview">
        <div id="main">
            <!-- another component here-->
            <day-select :selected-day="selectedDay"
                        :day="day"
            >
            </day-select>

            <movie-list :selected-day="selectedDay"
                        :day="day"
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
        data() {
            return {
                selectedDay: null
            }
        },
        props: ['day','movies','genre','time'],
        components: {
            MovieList,
            MovieFilter,
            DaySelect
        },
        methods: {
          updateSelectedDay(day) {
              this.selectedDay = day;
          }
        },
        created(){
            this.$bus.$on('daySelect',this.updateSelectedDay);
        },
    }
</script>