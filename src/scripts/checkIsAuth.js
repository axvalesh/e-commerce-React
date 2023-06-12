

export function checkIsAuth() {
    const isAuth = JSON.parse(localStorage.getItem('isAuth'))
    if(isAuth) {
        return true
    }
    return false
}