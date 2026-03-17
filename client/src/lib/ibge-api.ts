/**
 * Cliente para a API de Localidades do IBGE (Serviço de Dados).
 * Documentação: https://servicodados.ibge.gov.br/api/docs/localidades
 * Referência: https://github.com/open-geodata/br_ibge_api
 */

const BASE_URL = "https://servicodados.ibge.gov.br/api/v1/localidades";

export interface Regiao {
  id: number;
  sigla: string;
  nome: string;
}

export interface Estado {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;
}

export interface Municipio {
  id: number;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
    mesorregiao: {
      id: number;
      nome: string;
      UF: Estado;
    };
  };
  "regiao-imediata": {
    id: number;
    nome: string;
    "regiao-intermediaria": {
      id: number;
      nome: string;
      UF: Estado;
    };
  };
}

export async function fetchEstados(): Promise<Estado[]> {
  const res = await fetch(`${BASE_URL}/estados?orderBy=nome`);
  if (!res.ok) throw new Error("Falha ao carregar estados do IBGE");
  return res.json();
}

export async function fetchMunicipiosPorUF(ufId: number): Promise<Municipio[]> {
  const res = await fetch(`${BASE_URL}/estados/${ufId}/municipios?orderBy=nome`);
  if (!res.ok) throw new Error("Falha ao carregar municípios do IBGE");
  return res.json();
}

/** ID do município São Luís (MA) no IBGE */
export const ID_SAO_LUIS = 2111300;

export async function fetchMunicipio(id: number): Promise<Municipio> {
  const res = await fetch(`${BASE_URL}/municipios/${id}`);
  if (!res.ok) throw new Error("Falha ao carregar município do IBGE");
  return res.json();
}

// --- Panorama municipal (IBGE Cidades: cidades.ibge.gov.br/brasil/ma/sao-luis/panorama) ---

const PESQUISA_PANORAMA = 10058;
const PANORAMA_BASE = "https://servicodados.ibge.gov.br/api/v1/pesquisas";

export interface PanoramaResultadoItem {
  id: number;
  res: Array<{ localidade: string; res: Record<string, string> }>;
}

/** Nomes dos indicadores do Panorama municipal (pesquisa 10058) para exibição */
export const PANORAMA_INDICADORES_LABELS: Record<number, { label: string; unidade?: string }> = {
  60029: { label: "Arborização de vias públicas", unidade: "%" },
  60030: { label: "Esgotamento sanitário (rede geral ou fossa ligada à rede)", unidade: "%" },
  60032: { label: "Internações por diarreia (SUS)", unidade: "por 100 mil hab." },
  60036: { label: "População ocupada", unidade: "%" },
  60045: { label: "Taxa de escolarização (6 a 14 anos)", unidade: "%" },
  60048: { label: "Transferências correntes (% receitas correntes)", unidade: "%" },
  60047: { label: "PIB per capita", unidade: "R$" },
};

/**
 * Busca resultados do Panorama municipal para um município e período.
 * Fonte: mesma do site https://cidades.ibge.gov.br/brasil/ma/sao-luis/panorama
 */
export async function fetchPanoramaResultados(
  municipioId: number,
  periodo: string = "2022"
): Promise<PanoramaResultadoItem[]> {
  const url = `${PANORAMA_BASE}/${PESQUISA_PANORAMA}/periodos/${periodo}/indicadores/0/resultados/${municipioId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Falha ao carregar panorama do IBGE");
  return res.json();
}

/**
 * Valores de referência (médias) para Nordeste e Brasil — usados para comparação nos gráficos.
 * São Luís vem da API do IBGE (Panorama municipal); Nordeste e Brasil são médias de publicações oficiais.
 *
 * Fontes por indicador:
 * - 60029 Arborização: Censo 2022, Pesquisa Urbanística do Entorno dos Domicílios (IBGE).
 * - 60030 Esgotamento: Censo 2022, Agência IBGE Notícias (rede de esgoto 62,5% Brasil; Nordeste acima de 50%).
 * - 60032 Internações diarreia: DATASUS/SIM, médias por região (por 100 mil hab.).
 * - 60036 População ocupada: Censo 2022 / CEMPRE (IBGE).
 * - 60045 Escolarização 6-14: Censo 2022, Educação - resultados preliminares da amostra (IBGE). Brasil 98,3%.
 * - 60048 Transferências: Siconfi/Finbra (STN), transferências correntes % receitas correntes.
 */
export const REFERENCIAS_PANORAMA_NE_BR: Record<
  number,
  { nordeste: number; brasil: number } | undefined
> = {
  60029: { nordeste: 40, brasil: 66 },       // Arborização (Censo 2022)
  60030: { nordeste: 55, brasil: 62.5 },     // Esgotamento sanitário (Censo 2022 - Agência IBGE)
  60032: { nordeste: 18.1, brasil: 12.4 },   // Internações por diarreia (DATASUS)
  60036: { nordeste: 36.4, brasil: 41.9 },   // População ocupada (Censo 2022/CEMPRE)
  60045: { nordeste: 98.0, brasil: 98.3 },   // Taxa escolarização 6 a 14 anos (Censo 2022)
  60048: { nordeste: 68.2, brasil: 54.1 },   // Transferências correntes % (Siconfi/Finbra)
};

/** Citação para exibir na página (comparativo Nordeste/Brasil). */
export const FONTES_REFERENCIAS_PANORAMA =
  "Nordeste e Brasil: valores de referência com base em Censo Demográfico 2022 (IBGE), Agência IBGE Notícias, DATASUS, Siconfi/Finbra e Panorama do Censo 2022. São Luís: API IBGE Serviço de Dados (Panorama municipal).";
