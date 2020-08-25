export const state = () => {
    return {
        client_id: '',
    }
}

export const mutations = {
    setClientId(state, value) {
        state.client_id = value;
    },
}
