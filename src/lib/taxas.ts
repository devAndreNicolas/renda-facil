export interface TaxasBCB {
    selic: number;
    cdi: number;
    ipca: number;
    dataAtualizacao: string;
}

interface BCBResponse {
    data: string;
    valor: string;
}

const CACHE_KEY = 'rendecerto_taxas_cache';
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

async function fetchTaxa(serie: number): Promise<number> {
    try {
        const response = await fetch(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.${serie}/dados/ultimos/1?formato=json`);
        const data: BCBResponse[] = await response.json();
        return parseFloat(data[0].valor);
    } catch (error) {
        console.error(`Erro ao buscar taxa da série ${serie}:`, error);
        return 0;
    }
}

export async function getTaxasComCache(): Promise<TaxasBCB> {
    // Check cache first (only on client side)
    if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                return data;
            }
        }
    }

    // Fetch fresh data
    // 1178 = Selic anualizada
    // 4389 = CDI anualizada
    // 433 = IPCA mensal
    const [selic, cdi, ipca] = await Promise.all([
        fetchTaxa(1178),
        fetchTaxa(4389),
        fetchTaxa(433)
    ]);

    const taxas: TaxasBCB = {
        selic,
        cdi,
        ipca,
        dataAtualizacao: new Date().toISOString(),
    };

    // Save to cache
    if (typeof window !== 'undefined') {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: taxas,
            timestamp: Date.now(),
        }));
    }

    return taxas;
}
