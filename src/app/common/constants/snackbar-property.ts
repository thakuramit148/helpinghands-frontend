export function getSnackbarProperties(data: string, panelClass: string): any {
    return {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        data,
        duration: 10000,
        panelClass
    };
}
