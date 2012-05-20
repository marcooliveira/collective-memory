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

        _view: null,

        /**
         * Constructor.
         */
        initialize: function (element) {
            console.log('header construct', element);

            this._view = new HeaderView(element);
        },

        /**
         *
         */
        destroy: function () {

        }
    };

    return new Class(HeaderController);
});