export function connectApi(state) {
    state.addEventListener('connectApi', function (e) {
        if (e.detail.connection) {
            state.connection = e.detail.connection;
        }
        else {
            state.connection = null;
        }
        state.update();
    });
}