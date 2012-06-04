/*/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * MemoryRepositoryFactory.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define(['classify/Class', 'lib/dependency_injection/Container', 'repositories/Memory/MockMemoryRepository'], function (Class, Container, MockMemoryRepository) {

    'use strict';

    var MemoryRepositoryFactory = {

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
                            this._instance = new MockMemoryRepository();
                        default:
                            // TODO: create a MemoryRepository()
                    }
                }

                return this._instance;
            }
        }
    };

    return new Class(MemoryRepositoryFactory);
});