<template>
    <div id="overview">
        <div id="main">
            <movie-list :genre="genre" :time="time"></movie-list>
            <movie-filter @check-filter="checkFilter"></movie-filter>
        </div>
    </div>
</template>
<script>
    import MovieList from '../components/MovieList.vue';
    import MovieFilter from '../components/MovieFilter.vue';
    export default {
        name: 'movie-page',
        data: {
            genre: [],
            time: []
        },

        components: {
            MovieList,
            MovieFilter
        },
        methods: {
            checkFilter(category,title,checked) {

                if(checked) {
                    this[category].push(title);
                } else {
                    let index = this[category].indexOf(title);
                    if(index > -1){
                        this[category].splice(index,1);
                    }
                }

            }
        }
    }
</script>