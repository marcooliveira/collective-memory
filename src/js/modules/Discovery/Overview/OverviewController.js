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
            '_handleContributionsSuccess',
            '_handleContributionsError',
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
                this._topContributionsRequest.destroy();
            }
            if (this._contributionsRequest) {
                this._contributionsRequest.destroy();
            }
            this._view.setAsLoading();

            this._topContributionsRequest = this._contributionsRepository
                .getTopContributions(memoryId, this._view.getNrTopContributions())
                .addListener('fetch_success', this._handleTopContributionsSuccess)
                .addListener('fetch_error', this._handleTopContributionsError)
                .execute();

            this._contributionsRequest = this._contributionsRepository
                .getContributions(memoryId)
                .addListener('fetch_success', this._handleContributionsSuccess)
                .addListener('fetch_error', this._handleContributionsError)
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
        _handleContributionsSuccess: function (contributions, total) {
            this._view.clearContributions();
            this._view.setTotalContributions(total);
            this._view.addContributions(contributions);
            this._checkBothRequestsState();
        },

        /**
         *
         */
        _handleContributionsError: function (error) {
            console.log('error getting contributions', error);
            this._checkBothRequestsState();
        },

        /**
         *
         */
        _checkBothRequestsState: function () {
            if ((!this._contributionsRequest || !this._contributionsRequest.isExecuting()) &&
                (!this._topContributionsRequest || !this._topContributionsRequest.isExecuting())) {
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