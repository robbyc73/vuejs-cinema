import {addClass, removeClass} from './helpers';
let mouseOverHandler = function(event) {
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
    addClass(span,'tooltip-show');
};
let mouseOutHandler = function(event) {
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
    removeClass(span,'tooltip-show');
}
export default {
    install(Vue) {
        Vue.directive('tooltip', {
            bind(el, bindings) {
                let span = document.createElement('SPAN');
                let text = document.createTextNode('Seats Available: ' + bindings.value.seats);
                span.appendChild(text);
                span.className = 'tooltip';
                span.dataset.title = 'Seats Available: ' + bindings.value.seats;
                el.appendChild(span);
                let div = el.getElementsByTagName('DIV')[0];
                div.addEventListener('mouseover',mouseOverHandler);
                div.addEventListener('mouseout',mouseOutHandler);
            }
        });
    }
}