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
    'repositories/Memory/MemoryRepositoryFactory'
], function (Class, BaseController, MapView, MemoryRepositoryFactory) {

    'use strict';

    var MapController = {
        $name: 'MapController',
        $extends: BaseController,
        $binds: [
            '_handleViewportChanged',
            '_handleGetMemoriesSuccess',
            '_handleMemoryClick'
        ],

        _view: null,
        _memoryRepository: null,

        /**
         * Constructor.
         */
        initialize: function (element) {

            console.log('map construct', element);

            this._memoryRepository = MemoryRepositoryFactory.getInstance();

            this._view = new MapView(element, {
                zoom: 15,
                center: {lat: 40.63457, lng: -8.65738}
            });

            this._view.addListener(MapView.EVENT_VIEWPORT_CHANGE, this._handleViewportChanged);
            this._view.addListener(MapView.EVENT_MEMORY_CLICK, this._handleMemoryClick);
        },

        /**
         *
         */
        expandView: function () {
            this._view.expand();
        },

        /**
         *
         */
        collapseView: function () {
            this._view.collapse();
        },

        /**
         *
         */
        _handleMemoryClick: function (id) {
            console.log('controller got memory clicked, passing to parent..', MapView.EVENT_MEMORY_CLICK);
            this._fireEvent(MapView.EVENT_MEMORY_CLICK, id);
        },


        /**
         *
         */
        _handleViewportChanged: function (viewportInfo) {
            console.log('MapController: handling viewport changed:', viewportInfo);

            this._memoryRepository.getMemory(viewportInfo.tl, viewportInfo.br, {}, this._handleGetMemoriesSuccess);
        },

        /**
         *
         */
        _handleGetMemoriesSuccess: function (memories) {
            var i,
                length = memories.length,
                addMarker = this._view.addMarker;

            console.log('_handleGetMemoriesSuccess', memories);

            for (i = 0; i < length; i += 1) {
                /*setTimeout(function (i) {
                    var marker = memories[i];
                    addMarker(marker.title, marker.position);
                }.bind(null, i), i * 20);*/
                addMarker.call(this._view, memories[i]);
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