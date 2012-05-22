/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * MapController class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class',
    'BaseController',
    './MapView',
    'Discovery/MemoryRepository'
], function (Class, BaseController, MapView, MemoryRepository) {

    'use strict';

    var MapController = {
        $name: 'MapController',
        $extends: BaseController,
        $binds: ['_handleViewportChanged', '_handleGetMemoriesSuccess'],

        _view: null,
        _memoryRepository: new MemoryRepository(),

        /**
         * Constructor.
         */
        initialize: function (element) {
            console.log('map construct', element);

            this._view = new MapView(element, {
                zoom: 15,
                center: { lat: 40.63457, lng: -8.65738 }
            });

            this._view.addListener(MapView.EVENT_VIEWPORT_CHANGE, this._handleViewportChanged);
        },

        _handleViewportChanged: function (viewportInfo) {
            console.log('MapController: handling viewport changed:', viewportInfo);

            this._memoryRepository.getMemory(viewportInfo.tl, viewportInfo.br, {}, this._handleGetMemoriesSuccess);
        },

        _handleGetMemoriesSuccess: function (markers) {
            var i,
                addMarker = this._view.addMarker;

            console.log('_handleGetMemoriesSuccess', markers);

            for (i = 0; i < markers.length; i += 1) {
                setTimeout(function (i) {
                    var marker = markers[i];
                    addMarker(marker.title, marker.position);
                }.bind(null, i), i * 200);
            }
        },

        /**
         * {@inheritDoc}
         */
        destroy: function () {
            this._view.destroy();

            this.$super();
        }
    };

    return new Class(MapController);
});