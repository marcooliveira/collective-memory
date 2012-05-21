/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * FooterController class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class',
    'BaseController',
    './FooterView'
], function (Class, BaseController, FooterView) {

    'use strict';

    var FooterController = {
        $name: 'FooterController',
        $extends: BaseController,

        _view: null,

        /**
         * Constructor.
         */
        initialize: function (element) {
            console.log('footer construct', element);

            this._view = new FooterView(element);
        },

        /**
         *
         */
        destroy: function () {

        }
    };

    return new Class(FooterController);
});