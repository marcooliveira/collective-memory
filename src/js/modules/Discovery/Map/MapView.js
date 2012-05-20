/*jslint browser:true, devel:true, nomen:true*/
/*global define*/

/**
 * MapView class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
	'classify/Class',
	'BaseView',
	'jquery',
	'doT'
], function (Class, BaseView, $, doT, _) {

	'use strict';

	var MapView = {
		$name: 'MapView',
		$extends: BaseView,

		_map: null,
		_mapOptions: {
			zoom: 8,
			center: new google.maps.LatLng(-34.397, 150.644),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		},

		/**
		 *
		 */
		initialize: function (element) {
			this.$super(element);

			this._map = new google.maps.Map(element.get(0), this._mapOptions);
		},

		/**
		 *
		 */
		destroy: function () {

		}
	}

	return new Class(MapView);
});