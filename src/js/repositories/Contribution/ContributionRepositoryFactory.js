/*/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * ContributionRepositoryFactory.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define(['classify/Class', 'lib/dependency_injection/Container', 'repositories/Contribution/MockContributionRepository'], function (Class, Container, MockContributionRepository) {

    'use strict';

    var ContributionRepositoryFactory = {

        /**
         *
         */
        $statics: {
            _instance: null,

            /**
             *
             */
            getInstance: function () {
                var container = Container.getInstance();

                if (this._instance == null) {
                    switch (container.getParameter('environment')) {
                        case 'test':
                            this._instance = new MockContributionRepository();
                        default:
                            // TODO: create a ContributionRepository()
                    }
                }

                return this._instance;
            }
        }
    };

    return new Class(ContributionRepositoryFactory);
});