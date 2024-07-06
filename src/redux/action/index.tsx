import { SHOW_ALERT, HIDE_ALERT } from "redux/actionType";

export const showAlert = (
    message: string,
    title : string,
    duration: number
) => ({
    type: SHOW_ALERT,
    payload: { message, title, duration },
});

export const hideAlert = (title: string) => ({
    type: HIDE_ALERT,
    payload: title,
});