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
    'text!templates/Discovery/Search/structure.html',
    'text!templates/Discovery/Search/tag.html'
], function (Class, BaseView, $, doT, tagcloud_dummy, structureTemplate, tagTemplate) {

    'use strict';

    var SearchView = {
        $name: 'SearchView',
        $extends: BaseView,
        $binds: ['_handleSearchQueryChanged', '_handleQueryChangedTimerTimeout', '_handleTagClick'],
        $constants: {
            EVENT_QUERY_CHANGE: 'query_change',
            QUERY_CHANGE_TIMEOUT: 300,
            TAGS_FADEOUT_TIME: 100,
            TAGS_START_SIZE: 10,
            TAGS_END_SIZE: 18,
            TAGS_START_COLOR: '#E9D3A8',
            TAGS_END_COLOR: '#E9D3A8'
        },

        _searchElement: null,
        _highlightsElement: null,

        _previousSearch: '',

        _queryChangedTimerId: null,

        _filterTagsCount: 0,
        _filterTags: {},

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

            // set up handler for tag filters
            this._getTagsElement().on('click', 'a', this._handleTagClick);

            $.fn.tagcloud.defaults = {
                size: { start: this.$self().TAGS_START_SIZE, end: this.$self().TAGS_END_SIZE, unit: 'pt' },
                color: { start: this.$self().TAGS_START_COLOR, end: this.$self().TAGS_END_COLOR }
            };
        },

        _handleTagClick: function (eventObject) {
            var currentTarget = $(eventObject.currentTarget),
                tagValue = currentTarget.html();

            // if the tag was selected, then it will deselect
            if (!currentTarget.hasClass('selected')) {
                this._filterTagsCount = this._filterTagsCount + 1;

                // select clicked tag
                currentTarget.addClass('selected');
                this._filterTags[tagValue] = 1;
                console.log('added tag', tagValue);
            } else {
                // decrement select count
                this._filterTagsCount = this._filterTagsCount - 1;

                // deselect tag
                currentTarget.removeClass('selected');
                delete this._filterTags[tagValue];
                console.log('removed tag', currentTarget.html());
            }
            console.log('current tags:', this._filterTags);
        },


        _handleSearchQueryChanged: function (eventObject) {

            if (this._queryChangedTimerId !== null) {
                clearTimeout(this._queryChangedTimerId);
            }

            if (this._previousSearch !== $(eventObject.target).val()) {
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
            return this._element.find('.search-tags');
        },

        getQuerySearchValue: function () {
            return this._searchElement.find('input').eq(0).val();
        },

        setTags: function (tags) {
            var total = tags.length,
                i = 0,
                tagsElement = this._getTagsElement(),
                newElement,
                tagName,
                filterTagsTtmp = this._filterTags,
                fadeInTime = this.$self().TAGS_FADEIN_TIME;

            tagsElement.fadeOut(this.$self().TAGS_FADEOUT_TIME, function () {
                tagsElement.html('');

                for (i = 0; i < total; i = i + 1) {
                    tagName = tags[i].name;

                    tagsElement.append(doT.compile(tagTemplate)(
                        {
                            weight: tags[i].weight,
                            link: '#',
                            name: tagName,
                            selected: filterTagsTtmp.hasOwnProperty(tagName)
                        }
                    ));
                }

                $(function () {
                    $('.search-tags a').tagcloud();
                });

                tagsElement.fadeIn(fadeInTime);
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