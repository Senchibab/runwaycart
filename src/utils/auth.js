export function setAuthTokens({ token, refreshToken }) {

    localStorage.setItem("access_token", token);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("token_expiry", Date.now() + 1 * 60 * 1000); //expires in 1 mins

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

//changing simulated to async
export async function simulatedRefreshToken() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const refreshToken = getRefreshToken();

            if (!refreshToken) {
                return resolve(null);
            }

            const newAccessToken = "access_" + Math.random().toString(36).slice(2);

            //updated to 3 mins
            const newExpiry = Date.now() + 3 * 60 * 1000;

            localStorage.setItem("access_token", newAccessToken);
            localStorage.setItem("token_expiry", newExpiry);
            console.log("Access token refreshed:", newAccessToken);
            resolve(newAccessToken);
        }, 100); //simulatin a small delay
    })


}

