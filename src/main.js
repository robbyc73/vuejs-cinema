import Vue from 'vue';
import './style.scss';
import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype,'$moment', { get() { return this.$root.moment} });
import lodash from 'lodash';

import { checkFilter, setDay } from "./util/bus";

const bus = new Vue();
Object.defineProperty(Vue.prototype,'$bus', { get() { return this.$root.bus} });

import VueRouter from 'vue-router';
Vue.use(VueRouter);


import routes  from './util/routes';

const router = new VueRouter({
   routes
});

new Vue({
   el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        lodash,
        day: moment(),
        bus
    },
    created(){
        this.$http.get('/api').then(response => {
            this.movies = response.body;
        });

        //use bind to pass through context to function in bus file
        this.$bus.$on('check-filter',checkFilter.bind(this));
        this.$bus.$on('daySelect',setDay.bind(this));
    },
    router
});

// example of a directive, purely for practise. easier to set data toggle and placement on the button for tooltip
Vue.directive('tooltip', {
    bind(el,bindings) {
        let span = document.createElement('SPAN');
        let text = document.createTextNode('Seats Available: '+bindings.value.seats);
        span.appendChild(text);
        span.className = 'tooltip';
        span.dataset.toggle = 'tooltip';
        span.dataset.placement = 'bottom';
        span.dataset.title = 'Seats Available: '+bindings.value.seats;
        el.appendChild(span);
    }
});