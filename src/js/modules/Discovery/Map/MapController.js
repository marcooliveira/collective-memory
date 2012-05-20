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
    './MapView'
], function (Class, BaseController, MapView) {

    'use strict';

    var MapController = {
        $name: 'MapController',
        $extends: BaseController,

        _view: null,

        /**
         * Constructor.
         */
        initialize: function (element) {
            console.log('map construct', element);

            this._view = new MapView(element);
        },

        /**
         *
         */
        destroy: function () {

        }
    };

    return new Class(MapController);
});