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
    'doT',
	'amd-utils/lang/bind'
], function (Class, BaseView, $, doT, bind) {

    'use strict';

    var MapView = {
        $name: 'MapView',
        $extends: BaseView,
		$binds: ['_handleZoomChanged', '_handleCenterChanged'],

        _map: null,
        _mapOptions: {
            zoom: 15,
            center: new google.maps.LatLng(40.63457, -8.65738),
            mapTypeId: google.maps.MapTypeId.ROADMAP //HYBRID
        },

        /**
         *
         */
        initialize: function (element) {
            this.$super(element);

            this._map = new google.maps.Map(element.get(0), this._mapOptions);

            this._enableListeners();
        },

        _enableListeners: function () {
            google.maps.event.addListener(this._map, 'zoom_changed', this._handleZoomChanged);
            google.maps.event.addListener(this._map, 'center_changed', this._handleCenterChanged);
        },

		_handleZoomChanged: function () {
			console.log('zoom changed');
			console.log(this._map.getZoom());
		},

		_handleCenterChanged: function () {
			console.log('center changed');
			console.log(this._map.getCenter());
		},


        /**
         *
         */
        destroy: function () {

        }
    }

    return new Class(MapView);
});