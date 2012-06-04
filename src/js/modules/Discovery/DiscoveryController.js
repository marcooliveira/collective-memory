/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * DiscoveryController class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class',
    'BaseController',
    './DiscoveryView',
    './Search/SearchController',
    './Map/MapController',
    './Map/MapView',
    './Overview/OverviewController',
    './Overview/OverviewView'
], function (Class, BaseController, DiscoveryView, SearchController, MapController, MapView, OverviewController, OverviewView) {

    'use strict';

    var DiscoveryController = {
        $name: 'DiscoveryController',
        $extends: BaseController,
        $binds: ['hideMemoryDetails', 'showMemoryDetails'],

        _view: null,

        _searchController: null,
        _mapController: null,
        _overviewController: null,

        /**
         * Constructor.
         */
        initialize: function (element) {
            console.log('discovery construct', element);

            this._view = new DiscoveryView(element);

            this._searchController = new SearchController(this._view.getSearchElement());
            this._mapController = new MapController(this._view.getMapElement());
            this._overviewController = new OverviewController(this._view.getOverviewElement());

            this._mapController.addListener(MapView.EVENT_MEMORY_CLICK, this.showMemoryDetails);
            this._overviewController.addListener(OverviewView.EVENT_HIDE_CLICK, this.hideMemoryDetails);
        },

        /**
         *
         */
        showMemoryDetails: function (memoryId) {
            this._mapController.collapseView();
            this._overviewController.expandView();
            this._overviewController.setCurrentMemory(1 /*memoryId*/); // TODO: change this later
        },

        /**
         *
         */
        hideMemoryDetails: function () {
            this._mapController.expandView();
            this._overviewController.collapseView();
        },

        /**
         * {@inheritDoc}
         */
        destroy: function () {
            this._view.destroy();

            this.$super();
        }
    };

    return new Class(DiscoveryController);
});