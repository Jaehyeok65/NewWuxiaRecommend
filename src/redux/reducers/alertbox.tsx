import { SHOW_ALERT, HIDE_ALERT } from "redux/actionType";

const initialState = {
    alerts: [],
};

export default function alertReducer(state = initialState, action: any) {
    switch (action.type) {
        case SHOW_ALERT:
            const title = action.payload.title;
            return {
                ...state,
                alerts: [...state.alerts, { title, ...action.payload }],
            };
        case HIDE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(
                    (alert: any) => alert.title !== action.payload
                ),
            };
        default:
            return state;
    }
}
