/*jslint browser:true, devel:true, nomen:true*/
/*global define*/

/**
 * ApplicationView class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class',
    'BaseView',
    'jquery',
    'doT',
    'text!templates/Application/layout.html'
], function (Class, BaseView, $, doT, layoutTemplate) {

    'use strict';

    var ApplicationView = {
        $name: 'ApplicationView',
        $extends: BaseView,

        _element: null,
        _headerElement: null,
        _contentElement: null,
        _footerElement: null,

        /**
         * Constructor.
         */
        initialize: function (element) {
            this._element = $(element);
            this._element.html(doT.compile(layoutTemplate)());

            this._headerElement = $('#header');
            this._footerElement = $('#footer');
            this._contentElement = $('#content');
        },

        /**
         *
         */
        getElement: function () {
            return this._element;
        },

        /**
         *
         */
        getHeader: function () {
            return this._headerElement;
        },

        /**
         *
         */
        getFooter: function () {
            return this._footerElement;
        },

        /**
         *
         */
        getContent: function () {
            return this._contentElement;
        },

        /**
         *
         */
        destroy: function () {

        },
    };

    return new Class(ApplicationView);
});