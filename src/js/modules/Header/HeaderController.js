/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * HeaderController classl.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class',
    'BaseController',
    './HeaderView'
], function (Class, BaseController, HeaderView) {

    'use strict';

    var HeaderController = {
        $name: 'HeaderController',
        $extends: BaseController,
        $binds: '_handleTimeFilterChange',

        _view: null,

        /**
         * Constructor.
         */
        initialize: function (element) {
            console.log('header construct', element);

            this._view = new HeaderView(element);
            this._view.addListener(HeaderView.EVENT_TIME_FILTER_CHANGE, this._handleTimeFilterChange);
        },

        /**
         *
         */
        destroy: function () {

        },

        /**
         *
         */
        _handleTimeFilterChange: function (range) {
            console.log('time filter change', range);
        }
    };

    return new Class(HeaderController);
});