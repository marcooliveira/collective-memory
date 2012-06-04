/*/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * ContributionRepository interface.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 */
define(['classify/Interface'], function (Interface) {

    'use strict';

    var ContributionRepositoryInterface = {
        $name: 'ContributionRepositoryInterface',

        /**
         *
         */
        getTopContributions: function(memoryId) {},

        /**
         *
         */
        getContributions: function (memoryId, $offset, $limit, $fromId) {}
    };

    return new Interface(ContributionRepositoryInterface);
});