import { EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
import { DejaClipboardService } from '../../common/core/clipboard/clipboard.service';
import { Position, Rect } from '../../common/core/graphics';
import { IDragCursorInfos, IDragDropContext } from '../mouse-dragdrop/mouse-dragdrop.service';
import { DejaTile, DejaTilesAddEvent, DejaTilesEvent, DejaTilesRemoveEvent, IDejaTile } from './index';
export interface IDragSelection {
    startPosition: Position;
    selectedRect: Rect;
}
export interface IDragDropInfos {
    enabled: boolean;
    startX: number;
    startY: number;
    tiles: DejaTile[];
}
export interface IDejaTilesRefreshParams {
    resetWidth?: boolean;
    ensureVisible?: string;
    ensureBounds?: Rect;
}
export declare class DejaTilesLayoutProvider {
    private clipboardService;
    refreshTiles$: Subject<IDejaTilesRefreshParams>;
    ensureVisible$: Subject<string>;
    ensureBounds$: Subject<Rect>;
    dragging$: BehaviorSubject<boolean>;
    dragSelection$: Subject<IDragSelection>;
    dragDropInfos$: Subject<IDragDropInfos>;
    selectionRect$: Subject<Rect>;
    dragover$: Subject<IDragCursorInfos>;
    dragleave$: Subject<{}>;
    deleteTiles$: Subject<DejaTile[]>;
    designMode: boolean;
    layoutChanged: EventEmitter<DejaTilesEvent>;
    modelChanged: EventEmitter<DejaTilesEvent>;
    selectionChanged: EventEmitter<DejaTilesEvent>;
    contentAdding: EventEmitter<DejaTilesAddEvent>;
    contentRemoving: EventEmitter<DejaTilesRemoveEvent>;
    protected tileMinWidth: number;
    protected tileMinWidthUnit: string;
    protected tileMaxWidth: number;
    protected tileMaxWidthUnit: string;
    protected tileMinHeight: number;
    protected tileMinHeightUnit: string;
    protected tileMaxHeight: number;
    protected tileMaxHeightUnit: string;
    protected maxWidth: number;
    protected maxWidthUnit: string;
    private tilesDic;
    private _tiles;
    private _cursor;
    private _targetBounds;
    private destination;
    private lastTargetBounds;
    private moveTimout;
    private originalLayout;
    private validLayout;
    private beforeSizeLayout;
    private dragPageOffset;
    private dragOriginalPosition;
    private dragRelativePosition;
    private expandedTile;
    private _container;
    private currentTile;
    private hundredPercentWith;
    private dragTarget;
    constructor(clipboardService: DejaClipboardService);
    container: HTMLElement;
    tiles: DejaTile[];
    selectedTiles: string[];
    tileminwidth: string;
    tilemaxwidth: string;
    tileminheight: string;
    tilemaxheight: string;
    maxwidth: string;
    private targetBounds;
    copySelection(): DejaTile[];
    cutSelection(): DejaTile[];
    deleteSelection(): DejaTile[];
    paste(): DejaTile[];
    getTileElementFromHTMLElement(element: HTMLElement): HTMLElement;
    getTileComponentFromHTMLElement(element: HTMLElement): DejaTile;
    deleteTiles(tilesToDelete: DejaTile[]): void;
    removeTiles(tileIdsToRemove: string[]): void;
    createTiles(tiles: IDejaTile[]): void;
    getFreePlace(idealBounds: Rect): Rect;
    moveTile(id: string, bounds: Rect): void;
    HitTest(pixelBounds: Rect): DejaTile[];
    getPercentSize(value: number): number;
    dragEnter(dragContext: IDragDropContext, dragCursor: IDragCursorInfos): boolean;
    startDrag(tiles: DejaTile[], pageX: number, pageY: number): void;
    expandTile(tile: IDejaTile, pixelheight: number): void;
    cancelExpand(): void;
    cancelDrag(tiles: DejaTile[]): void;
    drop(tiles: DejaTile[]): DejaTile[];
    endDrag(): void;
    drag(tiles: DejaTile[], pageX: number, pageY: number): void;
    addTiles(newTiles: DejaTile[]): void;
    private size(tile, pixelpos, directions);
    private move();
    private ensureContainer(percentBounds);
    private ensureTarget(bounds, effectiveBounds?, directions?, originalBounds?);
    private saveLayout();
    private getPixelBounds(rect);
    private getPixelSize(value, unit?);
    private getSizePercentLimit(prop);
    private getSizePixelLimit(prop);
    private getTileMinPixelSize();
    private getTileMaxPixelSize();
    private getTileMinPercentWidth();
    private getTileMaxPercentWidth();
    private getTileMinPercentHeight();
    private getTileMaxPercentHeight();
    private getMaxPercentWidth();
    private getMaxPercentHeight();
    private getCursorFromHTMLElement(x, y, element);
    private extractValueAndUnit(prop, value);
    private restoreLayout(layout);
    private calcHorizontalOverflow(direction, tiles, offset, blackList?);
    private moveHorizontal(direction, tiles, offset, targetBounds);
    private pushHorizontal(bounds, direction, tiles?, offset?);
    private calcVerticalOverflow(direction, tiles, offset, blackList?);
    private moveVertical(direction, tiles, offset, targetBounds);
    private pushVertical(bounds, direction, tiles, offset?);
    private createTile(tile);
    private copyTiles(tiles, isCut?);
    private removeTemporaryTile();
}
