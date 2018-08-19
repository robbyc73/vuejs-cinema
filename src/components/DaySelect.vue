<template>
    <div id="day-select">
        <ul class="days">
            <li class="day" style="display: inline" v-for="day in daysAfterCurrent">
                <a @click.prevent="showMoviesForDay(day)">{{formattedDay(day)}}</a>
            </li>
        </ul>
    </div>
</template>
<script>
    import daysInFuture from '../util/daysInFuture';
    export default {
        name: 'day-select',
        props: ['date'],
        computed: {
            /**
             *
             * @returns {Array}
             */
            daysAfterCurrent() {
                let daysAfterCurrent = [];
                for(let i = 0; i < daysInFuture.DAYS_IN_FUTURE;i++){
                    daysAfterCurrent[i] = this.$moment(this.day).add('days',i);
                }
                return daysAfterCurrent;
            },
        },
        methods : {
            //filterByDay
            formattedDay(day) {
                return this.$moment(day).format('DD/MM');
            },
            showMoviesForDay(day) {
                this.$bus.$emit('daySelect',day);
            }
        }
    }
</script>