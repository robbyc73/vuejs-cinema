<template>
    <div id="day-select">
        <ul class="days">
            <li :class="daySelected(day)" class="day day-selector" style="display: inline" v-for="day in days">
                <a @click.prevent="showMoviesForDay(day)">{{formattedDay(day)}}</a>
            </li>
            <li class="day-selector">
                <span class="dec" @click="changeDay(-1)"></span>
                <span class="inc" @click="changeDay(1)"></span>
            </li>
        </ul>
    </div>
</template>
<script>
    import daysInFuture from '../util/daysInFuture';
    export default {
        name: 'day-select',
        props: ['day'],
        data() {
          return {
              days: [0,1,2,3,4,5,6].map(num => this.$moment().add(num,'days'))
          };
        },
        computed: {
        },
        methods : {
            //filterByDay
            formattedDay(day) {
                if(day.format('YYYY-MM-DD') == this.$moment().format('YYYY-MM-DD')) {
                    return 'Today';
                }
                return this.$moment(day).format('ddd DD/MM');
            },
            showMoviesForDay(day) {
               // this.selectedDay = day;
                this.$bus.$emit('daySelect',day);
            },
            daySelected(day) {
                return day.format('YYYY-MM-DD') == this.day.format('YYYY-MM-DD') ? 'active' : '';
            },
            changeDay(amount) {
                let newDay = this.$moment(this.day).add(amount,'days');
                if(this.days.find(day => day.format('YYYY-MM-DD') === newDay.format('YYYY-MM-DD'))) {
                    this.showMoviesForDay(newDay);
                }
            }
        }
    }
</script>