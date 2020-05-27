export const NO_RESP = `Action is completed but Server didn't sent any response`;

export function getErrorMessage(ex, component?: string): string {
    let msg = '';
    const e = ex.error;
    if (e) {
        if (+ex.status === 500 || +ex.status === 0) {
            msg = 'Sorry the server is down! please contact the admin';
        } else {
            msg = e.message;
        }
    } else {
        if (component && component === 'login') {
            msg = 'Sorry the server cannot verify your request! try again';
        } else {
            msg = `Request is unauthorized!`;
        }
    }
    return msg;
}
