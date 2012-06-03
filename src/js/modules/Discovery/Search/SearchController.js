/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * SearchController class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class',
    'BaseController',
    './SearchView'
], function (Class, BaseController, SearchView) {

    'use strict';

    var SearchController = {
        $name: 'SearchController',
        $extends: BaseController,
        $binds: ['_handleQuerySearchChanged'],

        _view: null,

        /**
         * Constructor.
         */
        initialize: function (element) {
            console.log('search construct', element);

            this._view = new SearchView(element);

            this._view.addListener(SearchView.EVENT_QUERY_CHANGE, this._handleQuerySearchChanged);
        },

        _handleQuerySearchChanged: function (query) {
            console.log('search query changed:', query);

            this._view.setTags([
                {
                    weight: 7,
                    name: 'Aveiro'
                },
                {
                    weight: 4,
                    name: 'Universidade'
                }
            ]);
        },

        /**
         * {@inheritDoc}
         */
        destroy: function () {
            this._view.destroy();

            this.$super();
        }
    };

    return new Class(SearchController);
});