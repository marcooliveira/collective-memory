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

        _view: null,

        /**
         * Constructor.
         */
        initialize: function (element) {
            console.log('search construct', element);

            this._view = new SearchView(element);
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