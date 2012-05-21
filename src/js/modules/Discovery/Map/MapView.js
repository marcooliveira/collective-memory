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
    'text!templates/Discovery/map-module.html'
], function (Class, BaseView, $, doT, template) {

    'use strict';

    var MapView = {
        $name: 'MapView',
        $extends: BaseView,
        $binds: ['_handleZoomChanged', '_handleCenterChanged'],

        _mapElement: null,
        _searchElement: null,

        _map: null,
        _mapOptions: {
            zoom: 15,
            center: new google.maps.LatLng(40.63457, -8.65738),
            mapTypeId: google.maps.MapTypeId.ROADMAP, // HYBRID,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            panControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            }
        },

        /**
         *
         */
        initialize: function (element) {
            this.$super(element);

            this._element.html(doT.compile(template)());
            this._searchElement = this._element.find('.search-input').eq(0);
            this._mapElement = this._element.find('.map').eq(0);

            this._map = new google.maps.Map(this._mapElement.get(0), this._mapOptions);

            this._enableListeners();
        },

        /**
         *
         */
        _enableListeners: function () {
            google.maps.event.addListener(this._map, 'zoom_changed', this._handleZoomChanged);
            google.maps.event.addListener(this._map, 'center_changed', this._handleCenterChanged);
        },

        /**
         *
         */
        _handleZoomChanged: function () {
            console.log('zoom changed: ' + this._map.getZoom());
        },

        /**
         *
         */
        _handleCenterChanged: function () {
            console.log('center changed: lat = ' + this._map.getCenter().lat() + ' lng = ' + this._map.getCenter().lng());
        },

        /**
         *
         */
        destroy: function () {

        }
    }

    return new Class(MapView);
});