import { TPayload } from "../types/data";

export const WS_CONNECTION_START = 'WS_CONNECTION_START' as const;
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS' as const;
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR' as const;
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED' as const;
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE' as const;
export const WS_CONNECTION_CLOSE = 'WS_CONNECTION_CLOSE' as const;

export const USER_WS_CONNECTION_START = 'USER_WS_CONNECTION_START' as const;
export const USER_WS_CONNECTION_SUCCESS = 'USER_WS_CONNECTION_SUCCESS' as const;
export const USER_WS_CONNECTION_CLOSED = 'USER_WS_CONNECTION_CLOSED' as const;
export const USER_WS_CONNECTION_ERROR = 'USER_WS_CONNECTION_ERROR' as const;
export const USER_WS_GET_MESSAGE = 'USER_WS_GET_MESSAGE' as const;
export const USER_WS_CONNECTION_CLOSE = 'USER_WS_CONNECTION_CLOSE' as const;

interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START
}

interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR
}

interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED
}

interface IWsGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: TPayload;
}

interface IWsConnectionCloseAction {
    readonly type: typeof WS_CONNECTION_CLOSE
}

// User actions

interface IUserWsConnectionStartAction {
    readonly type: typeof USER_WS_CONNECTION_START
}

interface IUserWsConnectionSuccessAction {
    readonly type: typeof USER_WS_CONNECTION_SUCCESS
}

interface IUserWsConnectionErrorAction {
    readonly type: typeof USER_WS_CONNECTION_ERROR
}

interface IUserWsConnectionClosedAction {
    readonly type: typeof USER_WS_CONNECTION_CLOSED
}

interface IUserWsGetMessageAction {
    readonly type: typeof USER_WS_GET_MESSAGE;
    readonly payload: TPayload;
}

interface IUserWsConnectionCloseAction {
    readonly type: typeof USER_WS_CONNECTION_CLOSE
}

interface IDefault {
    readonly type: undefined
}

export type TWsActions =
    | IWsConnectionStartAction
    | IWsConnectionSuccessAction
    | IWsConnectionErrorAction
    | IWsConnectionClosedAction
    | IWsGetMessageAction
    | IWsConnectionCloseAction
    | IUserWsConnectionStartAction
    | IUserWsConnectionSuccessAction
    | IUserWsConnectionErrorAction
    | IUserWsConnectionClosedAction
    | IUserWsGetMessageAction
    | IUserWsConnectionCloseAction
    | IDefault

export const wsInit = (): IWsConnectionStartAction => ({
    type: WS_CONNECTION_START
});

export const wsClose = (): IWsConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSED
});

export const onOpen = (): IWsConnectionSuccessAction => ({
    type: WS_CONNECTION_SUCCESS
});

export const onError = (): IWsConnectionErrorAction => ({
    type: WS_CONNECTION_ERROR
});

export const onClose = (): IWsConnectionCloseAction => ({
    type: WS_CONNECTION_CLOSE
});

export const onMessage = (payload: TPayload): IWsGetMessageAction => ({
    type: WS_GET_MESSAGE,
    payload
});

export const userWsInit = (): IUserWsConnectionStartAction => ({
    type: USER_WS_CONNECTION_START
});

export const userWsClose = (): IUserWsConnectionClosedAction => ({
    type: USER_WS_CONNECTION_CLOSED
});

export const userOnOpen = (): IUserWsConnectionSuccessAction => ({
    type: USER_WS_CONNECTION_SUCCESS
});

export const userOnError = (): IUserWsConnectionErrorAction => ({
    type: USER_WS_CONNECTION_ERROR
});

export const userOnClose = (): IUserWsConnectionCloseAction => ({
    type: USER_WS_CONNECTION_CLOSE
});

export const userOnMessage = (payload: TPayload): IUserWsGetMessageAction => ({
    type: USER_WS_GET_MESSAGE,
    payload
});


