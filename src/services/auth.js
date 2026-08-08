const TOKEN_KEY = 'em_token'
const USER_KEY = 'em_user'
const CRED_KEY = 'em_credenciais'

function parse(key) {
    try {
        const raw = localStorage.getItem(key)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export const session = {
    getToken: () => localStorage.getItem(TOKEN_KEY),

    getAdmin: () => parse(USER_KEY),

    saveSession({ token, adminId, nome, email }) {
        localStorage.setItem(TOKEN_KEY, token)
        localStorage.setItem(USER_KEY, JSON.stringify({ adminId, nome, email }))
    },

    saveCredentials: (cred) => localStorage.setItem(CRED_KEY, JSON.stringify(cred)),
    getCredentials: () => parse(CRED_KEY),
    clearCredentials: () => localStorage.removeItem(CRED_KEY),

    logout() {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
    }
}