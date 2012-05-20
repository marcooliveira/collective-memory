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
    './Map/MapController'
], function (Class, BaseController, DiscoveryView, SearchController, MapController) {

    'use strict';

    var DiscoveryController = {
        $name: 'DiscoveryController',
        $extends: BaseController,

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
        },

        /**
         *
         */
        destroy: function () {

        }
    };

    return new Class(DiscoveryController);
});