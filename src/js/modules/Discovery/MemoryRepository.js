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
    'lib/math/MathUtils'
], function (Class, MathUtils) {

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
        getTag: function (tl, br, callback) {
            this._mockGetTag(tl, br, callback);
        },

        _mockGetTag: function (tl, br, callback) {
            var tags = [
                    { weight: 10, name: 'aveiro' },
                    { weight: 7, name: 'university' },
                    { weight: 5, name: 'students' },
                    { weight: 4, name: 'party' },
                    { weight: 10, name: 'ua' },
                    { weight: 7, name: 'deti' },
                    { weight: 8, name: 'enterro' },
                    { weight: 6, name: 'integra-te' },
                    { weight: 3, name: 'santiago' },
                    { weight: 2, name: 'portugal' },
                    { weight: 2, name: 'engenharia' },
                    { weight: 7, name: 'ria' },
                    { weight: 4, name: 'essua' },
                    { weight: 4, name: 'deca' },
                    { weight: 3, name: 'caloiródromo' },
                    { weight: 4, name: 'fórum' }
                ],
                total = tags.length,
                result,
                i;

            result = [];

            for (i = 0; i < total; i = i + 1) {
                if (Math.random() > 0.4) {
                    result.push(tags[i]);
                }
            }

            callback.call(null, result);
        },

        /**
         *
         */
        getMemory: function (tl, br, options, callback) {
            this._mockGetMemory(tl, br, options, callback);
        },

        _mockGetMemory: function (tl, br, options, callback) {
            var total = MathUtils.rand(5, 20),
                x,
                markers = [];

            for (x = total - 1; x >= 0; x -= 1) {
                markers.push({
                    title: 'Some Memory Title ' + x,
                    position: {
                        lat: MathUtils.rand(tl.lat, br.lat),
                        lng: MathUtils.rand(tl.lng, br.lng)
                    }
                });
            }

            setTimeout(function () {
                callback.call(null, markers);
            }, MathUtils.rand(50, 400));
        },

        /**
         *
         */
        destroy: function () {

        }
    };

    return new Class(MemoryRepository);
});