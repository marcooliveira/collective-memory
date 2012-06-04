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
    'vendor/addywaddy/tagcloud',
    'text!templates/Discovery/Search/structure.html'
], function (Class, BaseView, $, doT, tagcloud_dummy, structureTemplate) {

    'use strict';

    var SearchView = {
        $name: 'SearchView',
        $extends: BaseView,
        $binds: ['_handleSearchQueryChanged', '_handleQueryChangedTimerTimeout'],
        $constants: {
            EVENT_QUERY_CHANGE: 'query_change',
            QUERY_CHANGE_TIMEOUT: 300
        },

        _searchElement: null,
        _highlightsElement: null,

        _previousSearch: '',

        _queryChangedTimerId: null,

        /**
         *
         */
        initialize: function (element) {
            this.$super(element);

            this._element.html(doT.compile(structureTemplate)());

            this._searchElement = this._element.find('.search-input').eq(0);
            this._highlightsElement = this._element.find('.highlights').eq(0);

            // set up handler for text change
            this._searchElement.find('input').eq(0).keyup(this._handleSearchQueryChanged);

            $.fn.tagcloud.defaults = {
                size: { start: 10, end: 18, unit: 'pt' },
                color: { start: '#E9D3A8', end: '#E9D3A8' }
            };
        },


        _handleSearchQueryChanged: function (eventObject) {
            if (this._queryChangedTimerId !== null) {
                clearTimeout(this._queryChangedTimerId);
            }

            if (this._previousSearch !== eventObject.srcElement.value) {
                this._queryChangedTimerId = setTimeout(this._handleQueryChangedTimerTimeout, this.$self().QUERY_CHANGE_TIMEOUT);
            }
        },

        _handleQueryChangedTimerTimeout: function () {
            this._queryChangedTimerId = null;

            // store new previous value
            this._previousSearch = this.getQuerySearchValue();

            // dispatch query change event
            this._fireEvent(this.$self().EVENT_QUERY_CHANGE, {
                query: this._previousSearch,
                tl: 0, // TODO: change to the map top left and bottom right coords
                br: 0
            });
        },

        _getTagsElement: function () {
            return $('.search-tags');
        },

        getQuerySearchValue: function () {
            return this._searchElement.find('input').eq(0).val();
        },

        setTags: function (tags) {
            var total = tags.length,
                i = 0,
                tagsElement = this._getTagsElement(),
                newElement;

            tagsElement.html('');

            for (i = 0; i < total; i = i + 1) {
                newElement = '<a href="#" rel="' + tags[i].weight + '">' + tags[i].name + '</a>';
                tagsElement.append(newElement);
            }

            $(function () {
                $('.search-tags a').tagcloud();
            });
        },

        /**
         * {@inheritDoc}
         */
        destroy: function () {
            //this._element.empty();

            this.$super();
        }
    };

    return new Class(SearchView);
});