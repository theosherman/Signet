'use strict';

/* global SignaturePad */
var app = angular.module('app');

app.directive('signaturePad', function ($parse) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'views/signaturePad.html',
		scope: {
			signaturePad: '='
		},
		link: function (scope, element, attrs, controller) {
			var canvas = element.find('canvas')[0];
			scope.signaturePad = new SignaturePad(canvas);
			
			function resize() {
				var ratio =  Math.max(window.devicePixelRatio || 1, 1);
				canvas.width = canvas.offsetWidth * ratio;
				canvas.height = canvas.width / 4;
				canvas.getContext("2d").scale(ratio, ratio);
			}
			
			resize();
			
			window.onresize = resize;
		}
		
	};
});