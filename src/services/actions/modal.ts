import { ReactNode } from "react";

export const OPEN_MODAL = 'OPEN_MODAL' as const;
export const CLOSE_MODAL = 'CLOSE_MODAL' as const;

export interface IOpenModalAction {
    readonly type: typeof OPEN_MODAL
    readonly content: ReactNode
}

export interface ICloseModalAction {
    readonly type: typeof CLOSE_MODAL
}

export interface IDefault {
    readonly type: undefined
}

export type TModalActions =
    | IOpenModalAction
    | ICloseModalAction
    | IDefault

export const openModal = (content: ReactNode): IOpenModalAction => ({
    type: OPEN_MODAL,
    content
});

export const closeModal = (): ICloseModalAction => ({
    type: CLOSE_MODAL
});