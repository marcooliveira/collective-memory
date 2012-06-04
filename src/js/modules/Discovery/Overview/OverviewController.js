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
        $binds: ['_handleHideClick'],

        _view: null,

        /**
         * Constructor.
         */
        initialize: function (element) {
            console.log('overview construct', element);

            this._view = new OverviewView(element);
            this._view.addListener(OverviewView.EVENT_HIDE_CLICK, this._handleHideClick);

            this.collapseView();
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
        _handleHideClick: function () {
            console.log('controller got event hide click');
            this._fireEvent(OverviewView.EVENT_HIDE_CLICK);
        },

        /**
         * {@inheritDoc}
         */
        destroy: function () {
            this._view.destroy();

            this.$super();
        }
    };

    return new Class(OverviewController);
});