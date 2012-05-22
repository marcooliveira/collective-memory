/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * ApplicationController.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class',
    'BaseController',
    'jquery',
    'amd-utils/object/mixIn',
    './ApplicationView',
    'Header/HeaderController',
    'Footer/FooterController',
    'Discovery/DiscoveryController'
], function (Class, BaseController, $, mixIn, ApplicationView, HeaderController, FooterController, DiscoveryController) {

    'use strict';

    var ApplicationController = {
        $name: 'ApplicationController',
        $extends: BaseController,

        _config: {
            environment: 'dev',
            debug:        true
        },

        _headerController: null,
        _footerController: null,
        _contentController: null,

        _view: null,


        /**
         * Constructor.
         *
         * @param {object} config An object
         */
        initialize: function (config) {
            mixIn(this._config, config);

            this._view = new ApplicationView($(document.body));

            this._headerController = new HeaderController(this._view.getHeader());
            this._footerController = new FooterController(this._view.getFooter());

            this._readHash();
        },

        /**
         * {@inheritDoc}
         */
        destroy: function () {
            this._headerController.destroy();
            this._footerController.destroy();
            this._contentController.destroy();

            this._view.destroy();

            this.$super();
        },

        /**
         *
         */
        _readHash: function () {
            // TODO: read hash and initialize the modules according to the routing

            this._contentController = new DiscoveryController(this._view.getContent());
        }
    };

    return new Class(ApplicationController);
});