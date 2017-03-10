import { EventEmitter } from '@angular/core';
/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { Component, ElementRef, Input, OnDestroy, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { DejaTile } from './tile.class';

@Component({
    selector: 'deja-tile',
    styleUrls: [
        './tile.component.scss',
    ],
    templateUrl: './tile.component.html',
})
export class DejaTileComponent implements OnDestroy {
    @Input() public template;
    @Input() public designMode;
    @Output() public modelChanged = new EventEmitter();
    @Output() public close = new EventEmitter();

    public element: HTMLElement;

    private _tile: DejaTile;
    private subscriptions = [] as Subscription[];

    constructor(el: ElementRef) {
        this.element = el.nativeElement as HTMLElement;
        this.element.setAttribute('hidden', '0');
    }

    @Input()
    public set tile(tile: DejaTile) {
        this._tile = tile;

        if (tile) {
            const toogleAttribute = (attribute: string, value: string | boolean) => {
                if (value) {
                    this.element.setAttribute(attribute, value.toString());
                } else {
                    this.element.removeAttribute(attribute);
                }
            };

            this.subscriptions.push(Observable.from(tile.pixelBounds$)
                .first()
                .delay(1)
                .filter(() => !this._tile.isHidden)
                .subscribe(() => this.element.removeAttribute('hidden')));

            this.subscriptions.push(Observable.from(tile.pixelBounds$)
                .subscribe((bounds) => {
                    this.element.style.left = `${bounds.left}px`;
                    this.element.style.top = `${bounds.top}px`;
                    this.element.style.width = `${bounds.width}px`;
                    this.element.style.height = `${bounds.height}px`;
                }));

            this.subscriptions.push(Observable.from(tile.pressed$).subscribe((value) => toogleAttribute('pressed', value)));
            this.subscriptions.push(Observable.from(tile.selected$).subscribe((value) => toogleAttribute('selected', value)));
            this.subscriptions.push(Observable.from(tile.dragging$).subscribe((value) => toogleAttribute('drag', value)));
            this.subscriptions.push(Observable.from(tile.dropping$).subscribe((value) => toogleAttribute('drop', value)));
            this.subscriptions.push(Observable.from(tile.cutted$).subscribe((value) => toogleAttribute('cutted', value)));
            this.subscriptions.push(Observable.from(tile.expanded$).subscribe((value) => toogleAttribute('expanded', value)));

            this.subscriptions.push(Observable.from(tile.deleted$).subscribe(() => this.element.remove()));

            const tooogleHide$ = Observable.from(tile.hidden$).do((value) => toogleAttribute('hidden', value ? '1' : '2'));

            // Hide
            this.subscriptions.push(tooogleHide$
                .debounceTime(1000)
                .filter((value) => value)
                .subscribe(() => this.element.setAttribute('hidden', '0')));

            // Show
            this.subscriptions.push(tooogleHide$
                .debounceTime(1)
                .filter((value) => !value)
                .subscribe(() => this.element.removeAttribute('hidden')));

        } else {
            this.subscriptions.forEach((subscription) => subscription.unsubscribe());
            this.subscriptions = [];
        }
    }

    public get tile() {
        return this._tile;
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}