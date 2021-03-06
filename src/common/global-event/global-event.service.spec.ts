/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { GlobalEventService } from './global-event.service';

describe('GlobalEventService', () => {
    it('Should, receive a message from the HTML', () => {
        const service = new GlobalEventService();
        service.register('sendaction')
            .first()
            .subscribe((params) => {
                expect(params[0]).toBeTruthy();
                expect(params[1]).toBeFalsy();
                expect(params[2]).toBeNull();
                expect(params[3]).toBe(1);
                service.unregister('sendaction');
                // tslint:disable-next-line:no-string-literal
                expect(service['globalEventEmmitter'].hasListeners('sendaction')).toBeFalsy();
            });

        (<any>window).sendAction(true, false, null, 1);
    });
});
