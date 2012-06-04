/*jslint browser:true, devel:true, nomen:true*/
/*global define*/

/**
 * OverviewView class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class',
    'BaseView',
    'jquery',
    'doT',
    'text!templates/Discovery/Overview/structure.html',
    'text!templates/Discovery/Overview/top_contributions.html'
], function (Class, BaseView, $, doT, structureTemplate, topContributionsTemplate) {

    'use strict';

    var OverviewView = {
        $name: 'OverviewView',
        $extends: BaseView,
        $constants: {
            EVENT_HIDE_CLICK: 'hide_click'
        },
        $binds: [
            '_handleHideBtnClick'
        ],

        _hideBtnElement: null,
        _contentElement: null,
        _loaderElement: null,

        _topContributionsTemplate: null,

        /**
         *
         */
        initialize: function (element) {
            this.$super(element);

            this._element.html(doT.compile(structureTemplate)());

            this._hideBtnElement = this._element.find('.header .hide-btn');
            this._hideBtnElement.on('click', this._handleHideBtnClick);

            this._loaderElement = this._element.find('.loader');
            this._contentElement = this._element.find('.content');

            this._topContributionsTemplate = doT.compile(topContributionsTemplate);
        },

        /**
         *
         */
        setAsLoading: function () {
            this._loaderElement.show();
            this._contentElement.hide();
        },

        /**
         *
         */
        unsetAsLoading: function () {
            this._loaderElement.hide();
            this._contentElement.show();
        },

        /**
         *
         */
        setTopContributions: function (contributions) {
            var html = this._topContributionsTemplate({ contributions: contributions });
            this._contentElement.find('.top-contributions').html(html);
        },

        /**
         *
         */
        expand: function () {
            this._element.addClass('expanded');
        },

        /**
         *
         */
        collapse: function () {
            this._element.removeClass('expanded');
        },

        /**
         *
         */
        _handleHideBtnClick: function () {
            console.log('hide click');
            this._fireEvent(this.$self().EVENT_HIDE_CLICK);
        },

        /**
         * {@inheritDoc}
         */
        destroy: function () {
            this._hideBtnElement.off('click', this._handleHideBtnClick);

            this._element.empty();

            this.$super();
        }
    };

    return new Class(OverviewView);
});