/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * OverviewController class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class',
    'BaseController',
    './OverviewView'
], function (Class, BaseController, OverviewView) {

    'use strict';

    var OverviewController = {
        $name: 'OverviewController',
        $extends: BaseController,

        _view: null,

        /**
         * Constructor.
         */
        initialize: function (element) {
            console.log('overview construct', element);

            this._view = new OverviewView(element);
        },

        /**
         *
         */
        destroy: function () {

        }
    };

    return new Class(OverviewController);
});