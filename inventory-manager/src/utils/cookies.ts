// Set a cookie
function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/; secure";
}

// Get a cookie value
function getCookie(name: string): string | null {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    let res = null;
    cookies.forEach(cookie => {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            res = cookieValue;
        }
    });
    return res;
}

// Delete a cookie
function deleteCookie(name: string) {
    setCookie(name, "", -1);
}

export { setCookie, getCookie, deleteCookie };