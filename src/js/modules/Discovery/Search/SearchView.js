/*jslint browser:true, devel:true, nomen:true*/
/*global define*/

/**
 * SearchView class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class',
    'BaseView',
    'jquery',
    'doT',
    'text!templates/Discovery/search-module.html'
], function (Class, BaseView, $, doT, template) {

    'use strict';

    var SearchView = {
        $name: 'SearchView',
        $extends: BaseView,

        _searchElement: null,
        _highlightsElement: null,

        /**
         *
         */
        initialize: function (element) {
            this.$super(element);

            this._element.html(doT.compile(template)());

            this._searchElement = this._element.find('.search-input').eq(0);
            this._highlightsElement = this._element.find('.highlights').eq(0);
        },

        /**
         *
         */
        destroy: function () {

        }
    }

    return new Class(SearchView);
});