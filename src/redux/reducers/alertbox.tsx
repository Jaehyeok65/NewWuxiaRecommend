import { SHOW_ALERT, HIDE_ALERT } from "redux/actionType";

const initialState = {
    alerts : []
};

export default function alertReducer(state = initialState, action: any) {
    switch (action.type) {
        case SHOW_ALERT:
            const { message, duration, id } = action.payload;
            return {
                ...state,
                alerts: [
                    ...state.alerts,
                    { message, duration, id } 
                ],
            };
        case HIDE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter((alert: any) => alert.id !== action.payload),
            };
        default:
            return state;
    }
}
