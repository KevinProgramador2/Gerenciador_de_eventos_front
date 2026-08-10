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
