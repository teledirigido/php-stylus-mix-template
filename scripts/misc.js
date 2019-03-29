export default {

  getViewport() {
    var e = window; var a = 'inner';
    if (!('innerWidth' in window)) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    return { width: e[a + 'Width'], height: e[a + 'Height'] };
  },

  getTransitions() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };
    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  },

  getAnimations() {
    var t;
    var el = document.createElement('fakeelement');
    var animations = {
      'animation': 'animationend',
      'OAnimation': 'oAnimationEnd',
      'MozAnimation': 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd'
    };
    for (t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  },

  scrollTo2(element, duration, offset, callback) {

    return new Promise((resolve, reject) => {
      var startingY = window.pageYOffset;
      var diff = (window.pageYOffset + element.getBoundingClientRect().top - startingY) - offset;
      var start;
      window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        var time = timestamp - start;
        var percent = Math.min(time / duration, 1);
        window.scrollTo(0, startingY + diff * percent);
        if (time < duration) {
          window.requestAnimationFrame(step);
        } else {
          resolve();
        }
      });
    });
  },

  hasClickedOutside(elementWrapper, target) {
    return new Promise((resolve, reject) => {
      const isVisible = elem => {
        return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
      };
      if (!elementWrapper.contains(target)) {
        if (isVisible(elementWrapper)) {
          resolve();
        }
      }
    });
  },

  isLightboxOpen() {
    const lightboxList = document.querySelectorAll('.lightbox-wrapper');
    let isLightboxOpen = false;
    lightboxList.forEach(el => {
      if (el.classList.contains('active') || el.classList.contains('on-transition')) {
        isLightboxOpen = true;
      }
    });

    return isLightboxOpen;
  },

  setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },

  getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        // ??? trim()?
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  },

  deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }

};
