export function setAuthTokens({ token, refreshToken }) {

    localStorage.setItem("access_token", token);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("token_expiry", Date.now() + 2 * 60 * 1000); //expires in 2 mins

}

export function getAccessToken() {
    return localStorage.getItem("access_token");
}
export function getRefreshToken() {
    return localStorage.getItem("refresh_token");
}
export function getTokenExpiry() {
    return parseInt(localStorage.getItem("token_expiry"), 10);
}

export function clearAuthTokens() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expiry");
}


export function simulatedRefreshToken() {

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        return null;
    }

    const newAccessToken = "access_" + Math.random().toString(36).slice(2);

    const newExpiry = Date.now() + 2 * 60 * 1000;

    localStorage.setItem("access_token", newAccessToken);
    localStorage.setItem("token_expiry", newExpiry);
    console.log("Access token refreshed:", newAccessToken);
    return newAccessToken;

}

