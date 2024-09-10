import { SHOW_ALERT, HIDE_ALERT } from "redux/actionType";

export const showAlert = (
    message: string,
    id : string,
    duration: number
) => ({
    type: SHOW_ALERT,
    payload: { message, id, duration },
});

export const hideAlert = (title: string) => ({
    type: HIDE_ALERT,
    payload: title,
});