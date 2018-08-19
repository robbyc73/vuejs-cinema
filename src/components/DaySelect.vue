<template>
    <div id="day-select">
        <ul class="days">
            <li :class="daySelected(day)" class="day day-selector" style="display: inline" v-for="day in daysAfterCurrent">
                <a @click.prevent="showMoviesForDay(day)">{{formattedDay(day)}}</a>
            </li>
        </ul>
    </div>
</template>
<script>
    import daysInFuture from '../util/daysInFuture';
    export default {
        name: 'day-select',
        props: ['selectedDay'],
        computed: {
            /**
             *
             * @returns {Array}
             */
            daysAfterCurrent() {
                let daysAfterCurrent = [];
                for(let i = 0; i < daysInFuture.DAYS_IN_FUTURE;i++){
                    //TODO return moment object
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
            },
            daySelected(day) {
                return day == this.selectedDay ? 'active' : '';
            }

        }
    }
</script>