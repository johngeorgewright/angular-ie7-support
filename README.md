Angular IE7 Support Module
==========================

Since angular 1.2 it dropped support for IE7, and for good reason. However, poor little sods like me have to keep supporting my apps in IE7. While I keep working on my project I'm finding ways to get around IE7 annoyances and as I do I'll put them in to this module.

**Before using this module, make sure you have followed the [appropriate guidelines by angular](https://docs.angularjs.org/guide/ie).**

This module currently fixes:

1. The SCE (Strict Contextual Escaping) problem (simply by turning it off).
2. The `$anmiate.[add|remove]Class` problems which also affect `ng-show ng-hide ng-class`.

Installation
------------

1. Either download directly from here or fetch with bower `bower install angular-ie7-support`.
2. Include a version of jQuery that supports IE7. You may include this conditionally just for IE7.
3. Make sure you have **only** given your app the ID `ng-app` (`<html id="ng-app" ng-app="my-app">`) when in IE7 by using conditional HTML comments.
4. Include this module in to your app `angular.module('my-app', ['ie7-support'])`.

