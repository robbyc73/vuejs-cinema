import Overview from '../components/Overview.vue';
import MovieDetail from '../components/MovieDetail.vue';
export default [
{  path: '/', component: Overview, name: 'home'},
{  path: '/movie/:imdbID', name: 'movie', component: MovieDetail},
    { path: '*', redirect: { name: 'home'}}
];
