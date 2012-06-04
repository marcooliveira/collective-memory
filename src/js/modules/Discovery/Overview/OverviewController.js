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
    './OverviewView',
    'repositories/contribution/ContributionRepositoryFactory'
], function (Class, BaseController, OverviewView, ContributionRepositoryFactory) {

    'use strict';

    var OverviewController = {
        $name: 'OverviewController',
        $extends: BaseController,
        $binds: [
            '_handleHideClick',
            '_handleTopContributionsSuccess',
            '_handleTopContributionsError'
        ],

        _view: null,

        _contributionsRepository: null,
        _topContributionsRequest: null,
        _contributionsRequest: null,

        /**
         * Constructor.
         */
        initialize: function (element) {
            console.log('overview construct', element);

            this._view = new OverviewView(element);
            this._view.addListener(OverviewView.EVENT_HIDE_CLICK, this._handleHideClick);

            this.collapseView();

            this._contributionsRepository = ContributionRepositoryFactory.getInstance();
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
        setCurrentMemory: function (memoryId) {
            if (this._topContributionsRequest) {
                this._topContributionsRequest.abort();
            }

            this._view.setAsLoading();

            this._topContributionsRequest = this._contributionsRepository
                .getTopContributions(memoryId)
                .addListener('fetch_success', this._handleTopContributionsSuccess)
                .addListener('fetch_error', this._handleTopContributionsError)
                .execute();
        },

        /**
         *
         */
        _handleHideClick: function () {
            console.log('controller got event hide click');
            this._fireEvent(OverviewView.EVENT_HIDE_CLICK);
        },

        /**
         *
         */
        _handleTopContributionsSuccess: function (contributions) {
            this._view.setTopContributions(contributions);
            this._checkBothRequestsState();
        },

        /**
         *
         */
        _handleTopContributionsError: function (error) {
            console.log('error getting contributions', error);
            this._checkBothRequestsState();
        },

        /**
         *
         */
        _checkBothRequestsState: function () {
            if ((this._contributionsRequest == null || !this._contributionsRequest.isExecuting()) &&
                (this._topContributionsRequest == null || !this._topContributionsRequest.isExecuting())) {
                this._view.unsetAsLoading();
            }
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