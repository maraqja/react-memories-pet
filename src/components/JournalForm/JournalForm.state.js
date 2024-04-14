export const INITIAL_STATE = {
    isValid: {
        title: true,
        text: true,
        date: true,
    },
    values: {
        title: '',
        text: '',
        date: '',
        tag: '',
    },
    isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
    switch (action.type) {
        case 'SET_VALUE':
            return {
                ...state,
                values: {
                    ...state.values,
                    ...action.payload,
                },
            };
        case 'CLEAR':
            return {
                ...state,
                values: INITIAL_STATE.values,
                isFormReadyToSubmit: INITIAL_STATE.isFormReadyToSubmit,
            };
        case 'RESET_VALIDITY':
            return { ...state, isValid: INITIAL_STATE.isValid };
        case 'SUBMIT': {
            const isValid = {
                title: !state.values.title.trim() ? false : true,
                text: !state.values.text.trim() ? false : true,
                date: !state.values.date ? false : true,
            };
            const isFormReadyToSubmit = !Object.values(isValid).includes(false)
                ? true
                : false;
            return { ...state, isValid, isFormReadyToSubmit };
        }
    }
}
