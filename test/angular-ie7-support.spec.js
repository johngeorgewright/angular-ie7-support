describe('angular-ie7-support', function () {

  var ngElementStub;

  function enableIE7() {
    toggleIE7(true);
  }

  function disableIE7() {
    toggleIE7(false);
  }

  function toggleIE7(on) {
    var appEl = document.getElementById('ng-app'),
        ie7App = on ? [0] : [];
    ngElementStub = sinon.stub(angular, 'element');
    ngElementStub.withArgs(appEl).returns(ie7App);
  }

  beforeEach(module('ie7-support'));

  afterEach(function () {
    angular.element.restore && angular.element.restore();
  });

  describe('SCE', function () {

    describe('when enabled', function () {

      beforeEach(enableIE7);

      it('should have turned it off by default', inject(['$sce', function ($sce) {
        expect($sce.isEnabled()).toBe(false);
      }]));

    });

    describe('when disabled', function () {

      beforeEach(disableIE7);

      it('should leave it to whatever it was before', inject(['$sce', function ($sce) {
        expect($sce.isEnabled()).toBe(true);
      }]));

    });

  });

  describe('$animate', function () {

    var addClass, removeClass, call;

    function stub() {
      addClass = sinon.spy();
      removeClass = sinon.spy();
      ngElementStub.withArgs('mung').returns({
        addClass: addClass,
        removeClass: removeClass
      });
    }

    call = inject(['$animate', function ($animate) {
      $animate.addClass('mung', 'some class');
      $animate.removeClass('mung', 'some other class');
    }]);

    describe('when enabled', function () {

      beforeEach(enableIE7);
      beforeEach(stub);
      beforeEach(call);

      it("will construct an element and call it's methods", function () {
        expect(addClass).toHaveBeenCalledWithExactly('some class');
        expect(removeClass).toHaveBeenCalledWithExactly('some other class');
      });

    });

    describe('when disabled', function () {

      beforeEach(disableIE7);
      beforeEach(stub);
      beforeEach(call);

      it("will fall back", function () {
        expect(addClass.callCount).toBe(0);
        expect(removeClass.callCount).toBe(0);
      });

    });

  });

});

