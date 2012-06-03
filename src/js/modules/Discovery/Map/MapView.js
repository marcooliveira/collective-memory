/*jslint browser:true, devel:true, nomen:true*/
/*global define, google*/

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
    'amd-utils/object/mixIn',
    'text!templates/Discovery/Map/structure.html'
], function (Class, BaseView, $, doT, mixIn, structureTemplate) {

    'use strict';

    var MapView = {
        $name: 'MapView',
        $extends: BaseView,
        $binds: ['_handleZoomChanged', '_handleCenterChanged', 'addMarker', '_handleUpdateViewportTimerTimeout'],
        $constants: {
            EVENT_CENTER_CHANGE: 'center_change',
            EVENT_ZOOM_CHANGE: 'zoom_change',
            EVENT_VIEWPORT_CHANGE: 'viewport_change'
        },

        _viewportUpdateTimeout: 250,

        _options: {
            zoom: 15,
            center: {
                lat: 40.63457,
                lng: -8.65738
            }
        },

        _mapElement: null,
        _searchElement: null,

        _map: null,
        _mapOptions: {
            mapTypeId: google.maps.MapTypeId.ROADMAP, // HYBRID,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            panControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            }
        },

        _updateViewportTimerId: null,

        /**
         *
         */
        initialize: function (element, $options) {
            this.$super(element);

            mixIn(this._options, $options || {});

            this._element.html(doT.compile(structureTemplate)());
            this._searchElement = this._element.find('.search-input').eq(0);
            this._mapElement = this._element.find('.map').eq(0);

            this._mapOptions.center = new google.maps.LatLng(this._options.center.lat, this._options.center.lng);
            this._mapOptions.zoom = this._options.zoom;

            this._map = new google.maps.Map(this._mapElement.get(0), this._mapOptions);

            this._enableListeners();
        },

        addMarker: function (title, position) {
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(position.lat, position.lng),
              map: this._map,
              draggable: false,
              animation: google.maps.Animation.DROP
            });
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
            this.updateViewport();
        },

        /**
         *
         */
        _handleCenterChanged: function () {
            this.updateViewport();
        },

        updateViewport: function () {
            if (this._updateViewportTimerId !== null) {
                clearTimeout(this._updateViewportTimerId);
            }

            this._updateViewportTimerId = setTimeout(this._handleUpdateViewportTimerTimeout, this._viewportUpdateTimeout);
        },

        _handleUpdateViewportTimerTimeout: function () {
            this._updateViewportTimerId = null;

            var bounds = this._map.getBounds();

            console.log('center changed: lat = ' + this._map.getCenter().lat() + ' lng = ' + this._map.getCenter().lng());
            this._fireEvent(this.$self().EVENT_CENTER_CHANGE, { lat: this._map.getCenter().lat(), lng: this._map.getCenter().lng() });

            this._fireEvent(this.$self().EVENT_VIEWPORT_CHANGE,
                {
                    tl: {
                        lat: bounds.getNorthEast().lat(),
                        lng: bounds.getNorthEast().lng()
                    },
                    br: {
                        lat: bounds.getSouthWest().lat(),
                        lng: bounds.getSouthWest().lng()
                    }
                }
            );
        },

        /**
         * {@inheritDoc}
         */
        destroy: function () {
            this._map.destroy();

            //this._element.empty();

            this.$super();
        }
    };

    return new Class(MapView);
});