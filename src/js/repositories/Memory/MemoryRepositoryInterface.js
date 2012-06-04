/*/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * MemoryRepository interface.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 */
define(['classify/Interface'], function (Interface) {

    'use strict';

    var MemoryRepositoryInterface = {
        $name: 'MemoryRepositoryInterface',

        /**
         *
         */
        getMemories: function(tl, br, $filters) {}
    };

    return new Interface(MemoryRepositoryInterface);
});