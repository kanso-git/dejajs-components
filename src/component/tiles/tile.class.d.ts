import { BehaviorSubject, Subject } from 'rxjs/Rx';
import { Rect } from '../../common/core/graphics';
import { IDejaTile } from './tile.interface';
export declare class DejaTile implements IDejaTile {
    private tile;
    private static currentId;
    cutted$: BehaviorSubject<boolean>;
    dragging$: BehaviorSubject<boolean>;
    dropping$: BehaviorSubject<boolean>;
    pressed$: BehaviorSubject<boolean>;
    selected$: BehaviorSubject<boolean>;
    expanded$: BehaviorSubject<boolean>;
    hidden$: Subject<boolean>;
    pending$: BehaviorSubject<boolean>;
    deleted$: Subject<{}>;
    pixelBounds$: Subject<Rect>;
    isTemporary: boolean;
    fading: boolean;
    private _id;
    private _isCutted;
    private _isDragging;
    private _isDropping;
    private _isPressed;
    private _isSelected;
    private _isExpanded;
    private _isHidden;
    private _isPending;
    private _pixelBounds;
    private _percentBounds;
    private _model;
    constructor(tile: IDejaTile);
    readonly model: IDejaTile;
    pixelBounds: Rect;
    isCutted: boolean;
    isDragging: boolean;
    isDropping: boolean;
    isPressed: boolean;
    isSelected: boolean;
    isExpanded: boolean;
    isHidden: boolean;
    isPending: boolean;
    readonly id: string;
    readonly type: string;
    percentBounds: Rect;
    readonly templateModel: any;
    makeId(): void;
    refreshBounds(): void;
    equalsTo(tile: IDejaTile): boolean;
    clone(): DejaTile;
    delete(): void;
    toTileModel(): IDejaTile;
}
