/*jslint browser:true, devel:true, nomen:true*/
/*global define, google*/

/**
 * MemoryRepository class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class',
    './ContributionRepositoryInterface',
    'lib/request/ApiRequest'
], function (Class, ContributionRepositoryInterface, ApiRequest) {

    'use strict';

    var MockContributionRepository = {
        $name: 'MockContributionRepository',
        $implements: ContributionRepositoryInterface,

        /**
         *
         */
        getTopContributions: function(memoryId, $limit) {
            return new ApiRequest('/data/contributions/top_contributions_' + memoryId + '.json')
                .addListener('success', function (content) {
                    var that = this;

                    setTimeout(function () {
                        that.fireEvent('fetch_success', $limit ? content.contributions.splice(0, $limit) : content.contributions, content.total);
                    }, 400);
                })
                .addListener('error', function (error) {
                    this.fireEvent('fetch_error', error);
                });
        },

        /**
         *
         */
        getContributions: function (memoryId, $offset, $limit, $fromId) {
            // TODO: Handle offset, limit & fromId
            return new ApiRequest('/data/contributions/contributions_' + memoryId + '.json')
                .addListener('success', function (content) {
                    this.fireEvent('fetch_success', content.contributions, content.total);
                })
                .addListener('error', function (error) {
                    this.fireEvent('fetch_error', error);
                });
        }
    };

    return new Class(MockContributionRepository);
});