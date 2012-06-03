/*jslint browser:true, devel:true, nomen:true*/
/*global define, google*/

/**
 * MemoryRepository class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class'
], function (Class) {

    'use strict';

    var MemoryRepository = {
        $name: 'MemoryRepository',

        /**
         *
         */
        initialize: function () {
            console.log('MemoryRepository initialized');
        },

        /**
         *
         */
        getMemory: function (tl, br, options, callback) {

            this._mockGetMemory(tl, br, options, callback);
        },

        getTags: function (tl, br, callback) {
            
        },

        _mockGetMemory: function (tl, br, options, callback) {
            var total = Math.floor(Math.random() * 50),
                x,
                markers = [];

            function rand(min, max) {
                return min + (max - min) * Math.random();
            }

            for (x = total - 1; x >= 0; x -= 1) {
                markers.push({
                    title: 'Some Memory Title ' + x,
                    position: {
                        lat: rand(tl.lat, br.lat),
                        lng: rand(tl.lng, br.lng)
                    }
                });
            }

            setTimeout(function () {
                callback.call(null, markers);
            }, 500);
        },

        /**
         *
         */
        destroy: function () {

        }
    };

    return new Class(MemoryRepository);
});