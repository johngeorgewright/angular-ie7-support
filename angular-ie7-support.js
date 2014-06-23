(function (ng) {

  function ie7ConfigProvider() {
    this._hash = {};
    this.init(); 
  }

  ie7ConfigProvider.prototype.init = function () {
    var rootElement = document.getElementById('ng-app');
    this.set('enabled', !!ng.element(rootElement).length);
  };

  ie7ConfigProvider.prototype.set = function (prop, val) {
    this._hash[prop] = val;
  };

  ie7ConfigProvider.prototype.get = function (prop) {
    return this._hash[prop];
  };

  ie7ConfigProvider.prototype.$get = function () {
    return this._hash;
  };

  function switchSce(ie7ConfigProvider, $sceProvider) {
    var enable = $sceProvider.enabled();
    if (ie7ConfigProvider.get('enabled')) {
      enable = false;
    }
    $sceProvider.enabled(enable);
  }

  function $animatePatch(ie7Config, $$asyncCallback, $animate) {
    function async(fn) {
      fn && $$asyncCallback(fn);
    }

    function addClass(element, className, done) {
      ng.element(element).addClass(className);
      async(done);
    }

    function removeClass(element, className, done) {
      ng.element(element).removeClass(className);
      async(done);
    }

    if (ie7Config.enabled) {
      $animate.addClass = addClass;
      $animate.removeClass = removeClass;
    }
  }

  ng
    .module('ie7-support', [])
    .provider('ie7Config', ie7ConfigProvider)
    .config(['ie7ConfigProvider', '$sceProvider', switchSce])
    .run(['ie7Config', '$$asyncCallback', '$animate', $animatePatch]);

}(angular));

