import Vue from 'vue';

window.API_DOMAIN = `${window.location.protocol}//${window.location.host}/assets/api`;

// function hasClass (obj, cls) {
//   return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
// }

// // this.addClass(document.getElementsByTagName('body')[0], 'in-fixed')
// function addClass (obj, cls) {
// 	/* eslint-disable */
//   if (!hasClass(obj, cls)) obj.className += ' ' + cls;
//   /* eslint-enable */
// }

// function removeClass (obj, cls) {
//   if (hasClass(obj, cls)) {
//     let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
//     obj.className = obj.className.replace(reg, '');
//   }
// }

Vue.prototype.API_DOMAIN  = window.API_DOMAIN;

// Vue.prototype.addClass    = addClass;
// Vue.prototype.removeClass = removeClass;

