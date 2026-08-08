import axios from 'axios'
import { session } from './auth'

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? ''
})

client.interceptors.request.use((config) => {
    const token = session.getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

client.interceptors.response.use(
    (res) => res.data,
    (err) => {
        const status = err.response?.status
        const message = err.response?.data?.message
            ?? (status === 401 ? 'Sessão expirada. Faça login novamente.'
                : status === 403 ? 'Acesso negado.'
                    : !err.response ? 'Não foi possível conectar ao servidor.'
                        : 'Erro inesperado no servidor.')

        if (status === 401 && session.getToken()) session.logout()

        return Promise.reject({ status, message })
    }
)

export const formatDate = (iso) => {
    if (!iso) return ''
    const [y, m, d] = iso.split('-')
    return `${d}/${m}/${y}`
}

export const todayISO = () => new Date().toISOString().slice(0, 10)

export function normalizarImagem(url) {
    if (!url) return ''
    const u = url.trim().replace(/&amp;/g, '&')
    if (!/(google\.com\/url|google\.com\/imgres)/i.test(u)) return u
    try {
        const param = new URL(u).searchParams
        const alvo = param.get('url') ?? param.get('q')
        if (alvo) return decodeURIComponent(alvo)
    } catch { return u }
    return u
}

export const api = {
    login: (email, senha) =>
        client.post('/v1/auth/login', { email, senha }),

    registerAdmin: (admin) =>
        client.post('/v1/admin', admin),

    getEventos: (adminId) =>
        client.get(`/v1/eventos?adminId=${adminId}`),

    createEvento: (evento) =>
        client.post('/v1/eventos', evento),

    updateEvento: (eventoId, evento) =>
        client.patch(`/v1/eventos/${eventoId}`, evento),

    deleteEvento: (eventoId) =>
        client.delete(`/v1/eventos/${eventoId}`)
}