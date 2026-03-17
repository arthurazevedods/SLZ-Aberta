import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// =============================================================================
// DADOS — Fevereiro 2026 (SSP/MA)
// =============================================================================

const DATA = {
  metadata: {
    fonte:
      "SSP/MA - Relatório Quantitativo Diário de Crimes Violentos Letais Intencionais (CVLI) e Outras Mortes",
    periodo: "Fevereiro de 2026",
    atualizacao: "04/03/2026 08:00",
    observacao: "Dados consolidados preliminares, sujeitos a alterações",
  },
  totais: {
    homicidiosDolosos: 30,
    feminicidios: 1,
    rouboSeguidoDeMorte: 0,
    lesaoCorporalSeguidaDeMorte: 0,
    outrosHomicidiosCulposos: 0,
    pessoasMortasEmDelegaciasOuPresidios: 0,
    adolescentesMortosEmMedidasSocioeducativas: 0,
    homicidiosDolososNoTransito: 0,
    mortesAcidentaisNoTransito: 5,
    infanticidios: 0,
    suicidios: 7,
    mortesAcidentaisExcetoTransito: 0,
    outrasMortesAcidentaisNoTransito: 0,
    mortesEmConfrontoComAPolicia: 2,
    mortesAEsclarecer: 2,
    cvliPeriodoAnterior: 0,
  },
  homicidiosDolosos: [
    { data: "01/02/2026", hora: "23:00", sexo: "Masculino", idade: 35, arma: "De fogo", bairro: "Amendoeira", municipio: "São Luís" },
    { data: "02/02/2026", hora: "02:00", sexo: "Masculino", idade: 21, arma: "Outros meios", bairro: "Conjunto Promorar", municipio: "São Luís" },
    { data: "02/02/2026", hora: "17:40", sexo: "Masculino", idade: 27, arma: "De fogo", bairro: "Cruzeiro", municipio: "São José de Ribamar" },
    { data: "05/02/2026", hora: "04:05", sexo: "Masculino", idade: 17, arma: "De fogo", bairro: "Vila Alonso Costa", municipio: "São José de Ribamar" },
    { data: "11/02/2026", hora: "10:00", sexo: "Masculino", idade: 28, arma: "De fogo", bairro: "Sá Viana", municipio: "São Luís" },
    { data: "11/02/2026", hora: "23:00", sexo: "Masculino", idade: 27, arma: "De fogo", bairro: "Coroadinho", municipio: "São Luís" },
    { data: "12/02/2026", hora: "21:00", sexo: "Masculino", idade: 25, arma: "De fogo", bairro: "Pirâmide", municipio: "Paço do Lumiar" },
    { data: "14/02/2026", hora: "05:45", sexo: "Masculino", idade: 63, arma: "Outros meios", bairro: "Residencial Nova Terra", municipio: "São José de Ribamar" },
    { data: "14/02/2026", hora: "13:16", sexo: "Masculino", idade: 71, arma: "De fogo", bairro: "Gapara", municipio: "São Luís" },
    { data: "14/02/2026", hora: "20:45", sexo: "Masculino", idade: 33, arma: "De fogo", bairro: "Mocajituba", municipio: "Paço do Lumiar" },
    { data: "15/02/2026", hora: "03:00", sexo: "Masculino", idade: 37, arma: "De fogo", bairro: "Anil", municipio: "São Luís" },
    { data: "16/02/2026", hora: "12:40", sexo: "Masculino", idade: 39, arma: "De fogo", bairro: "Vila Janaína", municipio: "São Luís" },
    { data: "18/02/2026", hora: "20:30", sexo: "Masculino", idade: 37, arma: "De fogo", bairro: "Vila São Luís", municipio: "São Luís" },
    { data: "19/02/2026", hora: "19:30", sexo: "Masculino", idade: 33, arma: "De fogo", bairro: "Pedrinhas / Mocajituba", municipio: "Paço do Lumiar" },
    { data: "19/02/2026", hora: "23:00", sexo: "Masculino", idade: 19, arma: "De fogo", bairro: "Cohabiano II", municipio: "São José de Ribamar" },
    { data: "20/02/2026", hora: "00:30", sexo: "Masculino", idade: 24, arma: "De fogo", bairro: "Cidade Olímpica", municipio: "São Luís" },
    { data: "20/02/2026", hora: "12:00", sexo: "Masculino", idade: 33, arma: "De fogo", bairro: "Alto do Turú I", municipio: "São José de Ribamar" },
    { data: "20/02/2026", hora: "22:00", sexo: "Masculino", idade: 31, arma: "De fogo", bairro: "Jardim Tropical I", municipio: "São José de Ribamar" },
    { data: "21/02/2026", hora: "12:00", sexo: "Masculino", idade: 21, arma: "De fogo", bairro: "Mangue Seco", municipio: "Raposa" },
    { data: "21/02/2026", hora: "18:46", sexo: "Masculino", idade: 33, arma: "Branca", bairro: "Cohab-Anil IV", municipio: "São Luís" },
    { data: "21/02/2026", hora: "20:50", sexo: "Masculino", idade: 32, arma: "De fogo", bairro: "Jardim América", municipio: "São Luís" },
    { data: "21/02/2026", hora: "22:30", sexo: "Masculino", idade: 31, arma: "De fogo", bairro: "Sol e Mar", municipio: "São Luís" },
    { data: "23/02/2026", hora: "01:12", sexo: "Masculino", idade: 18, arma: "De fogo", bairro: "Saramanta", municipio: "São José de Ribamar" },
    { data: "24/02/2026", hora: "19:47", sexo: "Masculino", idade: 16, arma: "De fogo", bairro: "Vila Vitória", municipio: "São Luís" },
    { data: "25/02/2026", hora: "18:30", sexo: "Masculino", idade: 28, arma: "De fogo", bairro: "Cruzeiro", municipio: "São José de Ribamar" },
    { data: "25/02/2026", hora: "20:30", sexo: "Masculino", idade: 46, arma: "De fogo", bairro: "Arraial", municipio: "São Luís" },
    { data: "26/02/2026", hora: "22:30", sexo: "Masculino", idade: 20, arma: "De fogo", bairro: "Res. Cidade Verde", municipio: "Paço do Lumiar" },
    { data: "27/02/2026", hora: "19:00", sexo: "Masculino", idade: 29, arma: "De fogo", bairro: "Jardim Tropical I", municipio: "São José de Ribamar" },
    { data: "27/02/2026", hora: "21:20", sexo: "Masculino", idade: 18, arma: "De fogo", bairro: "Cidade Olímpica", municipio: "São Luís" },
    { data: "28/02/2026", hora: "01:42", sexo: "Masculino", idade: 51, arma: "De fogo", bairro: "Cidade Olímpica", municipio: "São Luís" },
  ],
  feminicidios: [
    { data: "16/02/2026", hora: "07:00", sexo: "Feminino", idade: 20, arma: "Branca", bairro: "Piancó", municipio: "São Luís" },
  ],
  mortesAcidentaisNoTransito: [
    { data: "01/02/2026", hora: "20:05", sexo: "Masculino", idade: 45, bairro: "Cidade Olímpica", municipio: "São Luís", causa: "Colisão" },
    { data: "05/02/2026", hora: "10:35", sexo: "Masculino", idade: 31, bairro: "BR-135 Tibiri", municipio: "São Luís", causa: "Atropelamento" },
    { data: "12/02/2026", hora: "20:26", sexo: "Masculino", idade: 54, bairro: "Jardim São Cristóvão", municipio: "São Luís", causa: "Colisão" },
    { data: "14/02/2026", hora: "01:00", sexo: "Masculino", idade: 19, bairro: "MA-201 - Forquilha", municipio: "São Luís", causa: "Colisão" },
    { data: "25/02/2026", hora: "09:32", sexo: "Masculino", idade: 20, bairro: "Maracanã", municipio: "São Luís", causa: "Atropelamento" },
  ],
  suicidios: [
    { data: "01/02/2026", hora: "08:16", sexo: "Masculino", idade: 44, bairro: "Ivar Saldanha", municipio: "São Luís", meio: "Enforcamento" },
    { data: "05/02/2026", hora: "08:22", sexo: "Masculino", idade: 61, bairro: "Vila Conceição", municipio: "São Luís", meio: "Enforcamento" },
    { data: "08/02/2026", hora: "14:20", sexo: "Masculino", idade: 48, bairro: "Jardim Eldorado", municipio: "São Luís", meio: "Ingestão de medicamentos" },
    { data: "15/02/2026", hora: "08:00", sexo: "Masculino", idade: 69, bairro: "Forquilha", municipio: "São Luís", meio: "Queda em altura" },
    { data: "16/02/2026", hora: "07:00", sexo: "Masculino", idade: 23, bairro: "Piancó", municipio: "São Luís", meio: "Queda em altura" },
    { data: "17/02/2026", hora: "11:55", sexo: "Masculino", idade: 26, bairro: "Tirirical", municipio: "São Luís", meio: "Enforcamento" },
    { data: "18/02/2026", hora: "20:59", sexo: "Masculino", idade: 34, bairro: "Maiobinha", municipio: "São José de Ribamar", meio: "Enforcamento" },
  ],
  mortesEmConfrontoComAPolicia: [
    { data: "26/02/2026", hora: "19:37", sexo: "Masculino", idade: 16, orgao: "PMMA/PCMA/GC", situacao: "Em serviço", bairro: "São Benedito", municipio: "São José de Ribamar" },
    { data: "26/02/2026", hora: "19:37", sexo: "Masculino", idade: 19, orgao: "PMMA/PCMA/GC", situacao: "Em serviço", bairro: "São Benedito", municipio: "São José de Ribamar" },
  ],
  mortesAEsclarecer: [
    { data: "14/02/2026", hora: null as string | null, sexo: "Masculino", idade: 51, bairro: "Santa Clara", municipio: "São Luís", obs: "A definir" },
    { data: "28/02/2026", hora: "13:27", sexo: "Masculino", idade: 51, bairro: "Vila Kiola", municipio: "São José de Ribamar", obs: "A definir" },
  ],
};

// =============================================================================
// HELPERS
// =============================================================================

/** Converte idade com aproximação (~25) para número. */
function parseIdade(idade: number | string): number {
  if (typeof idade === "number" && !Number.isNaN(idade)) return idade;
  const s = String(idade).trim().replace(/^~/, "");
  const n = parseInt(s, 10);
  return Number.isNaN(n) ? 0 : n;
}

/** Converte dd/mm/yyyy para Date para ordenação. */
function parseDataBR(data: string): Date {
  const [d, m, y] = data.split("/").map(Number);
  return new Date(y, m - 1, d);
}

/** Ordena registros por data (e hora quando existir). */
function ordenarPorData<T extends { data: string; hora?: string | null }>(lista: T[]): T[] {
  return [...lista].sort((a, b) => {
    const da = parseDataBR(a.data).getTime();
    const db = parseDataBR(b.data).getTime();
    if (da !== db) return da - db;
    const ha = a.hora || "";
    const hb = b.hora || "";
    return ha.localeCompare(hb);
  });
}

/** Exibe hora ou "-" quando ausente. */
function exibirHora(hora: string | null | undefined): string {
  return hora != null && hora !== "" ? hora : "—";
}

/** Agrupa por chave e conta. */
function agruparContar<T>(lista: T[], key: keyof T): { nome: string; total: number }[] {
  const map = new Map<string, number>();
  for (const item of lista) {
    const v = item[key];
    const nome = v != null ? String(v) : "Não informado";
    map.set(nome, (map.get(nome) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([nome, total]) => ({ nome, total }));
}

// Cores institucionais (paleta sóbria)
const CORES = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  chart1: "hsl(214 84% 45%)",
  chart2: "hsl(152 69% 42%)",
  chart3: "hsl(45 93% 58%)",
  chart4: "hsl(280 50% 45%)",
  chart5: "hsl(0 60% 48%)",
  chart6: "hsl(25 70% 48%)",
};

const CORES_PIZZA = [CORES.chart1, CORES.chart2, CORES.chart3, CORES.chart4, CORES.chart5];

// =============================================================================
// COMPONENTE
// =============================================================================

interface SegurancaDashboardFev2026Props {
  /** Se true, usa layout compacto (sem min-h-screen) para embedding em abas. */
  embedded?: boolean;
}

const SegurancaDashboardFev2026: React.FC<SegurancaDashboardFev2026Props> = ({ embedded }) => {
  const { metadata, totais, homicidiosDolosos, feminicidios, mortesAcidentaisNoTransito, suicidios, mortesEmConfrontoComAPolicia, mortesAEsclarecer } = DATA;

  // Dados para gráfico de totais por categoria
  const dadosTotaisCategoria = [
    { categoria: "Homicídios dolosos", total: totais.homicidiosDolosos },
    { categoria: "Feminicídios", total: totais.feminicidios },
    { categoria: "Mortes no trânsito", total: totais.mortesAcidentaisNoTransito },
    { categoria: "Suicídios", total: totais.suicidios },
    { categoria: "Confronto com polícia", total: totais.mortesEmConfrontoComAPolicia },
    { categoria: "A esclarecer", total: totais.mortesAEsclarecer },
  ].filter((r) => r.total > 0);

  // Distribuição por município (homicídios dolosos)
  const porMunicipio = agruparContar(homicidiosDolosos, "municipio");
  const dadosPizzaMunicipio = porMunicipio.map((m) => ({ name: m.nome, value: m.total }));

  // Distribuição por tipo de arma (homicídios dolosos)
  const porArma = agruparContar(homicidiosDolosos, "arma");

  // Insights
  const municipioMaisHomicidios = porMunicipio.length
    ? porMunicipio.reduce((a, b) => (b.total > a.total ? b : a)).nome
    : "—";
  const armaPredominante = porArma.length
    ? porArma.reduce((a, b) => (b.total > a.total ? b : a)).nome
    : "—";
  const idades = homicidiosDolosos.map((h) => parseIdade(h.idade)).filter((i) => i > 0);
  const faixaEtariaRecorrente =
    idades.length > 0
      ? (() => {
          const faixas = ["> 50", "41–50", "31–40", "21–30", "11–20", "0–10"];
          const contagem = [0, 0, 0, 0, 0, 0];
          for (const i of idades) {
            if (i > 50) contagem[0]++;
            else if (i > 40) contagem[1]++;
            else if (i > 30) contagem[2]++;
            else if (i > 20) contagem[3]++;
            else if (i > 10) contagem[4]++;
            else contagem[5]++;
          }
          const idx = contagem.indexOf(Math.max(...contagem));
          return faixas[idx];
        })()
      : "—";
  const totalHomicidios = homicidiosDolosos.length;
  const emSaoLuis = homicidiosDolosos.filter((h) => h.municipio === "São Luís").length;
  const proporcaoSaoLuis =
    totalHomicidios > 0
      ? `${((emSaoLuis / totalHomicidios) * 100).toFixed(1)}%`
      : "—";

  const homicidiosOrdenados = ordenarPorData(homicidiosDolosos);
  const feminicidiosOrdenados = ordenarPorData(feminicidios);
  const transitoOrdenados = ordenarPorData(mortesAcidentaisNoTransito);
  const suicidiosOrdenados = ordenarPorData(suicidios);
  const confrontoOrdenados = ordenarPorData(mortesEmConfrontoComAPolicia);
  const esclarecerOrdenados = ordenarPorData(mortesAEsclarecer);

  const coresCategoria = [CORES.chart1, CORES.chart2, CORES.chart3, CORES.chart4, CORES.chart5, CORES.chart6];
  const chartConfigCategoria = Object.fromEntries(
    dadosTotaisCategoria.map((r, i) => [r.categoria, { label: r.categoria, color: coresCategoria[i] ?? CORES.chart1 }])
  );

  return (
    <div className={embedded ? "bg-muted/30 py-6 px-2 sm:px-4" : "min-h-screen bg-muted/30 py-6 px-4 sm:px-6 lg:px-8"}>
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Cabeçalho */}
        <header className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Dashboard de Segurança Pública — Grande São Luís
            </h1>
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
              Preliminar
            </Badge>
          </div>
          <p className="text-muted-foreground">{metadata.fonte}</p>
          <p className="text-sm text-muted-foreground">
            Período: <strong>{metadata.periodo}</strong> · Atualização: {metadata.atualizacao}
          </p>
        </header>

        {/* Cards de resumo */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Totais do período</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Homicídios dolosos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{totais.homicidiosDolosos}</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Feminicídios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{totais.feminicidios}</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Mortes acidentais (trânsito)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{totais.mortesAcidentaisNoTransito}</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Suicídios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{totais.suicidios}</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Mortes em confronto (polícia)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{totais.mortesEmConfrontoComAPolicia}</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Mortes a esclarecer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{totais.mortesAEsclarecer}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Gráfico de barras — totais por categoria */}
        <section>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Totais por categoria</CardTitle>
              <CardDescription>Comparativo das categorias com ocorrências no período</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigCategoria} className="h-[280px] w-full">
                <BarChart data={dadosTotaisCategoria} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="categoria" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill={CORES.chart1} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Gráfico de pizza — homicídios por município */}
          <section>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Homicídios dolosos por município</CardTitle>
                <CardDescription>Distribuição na Grande São Luís</CardDescription>
              </CardHeader>
              <CardContent>
                {dadosPizzaMunicipio.length > 0 ? (
                  <ChartContainer
                    config={Object.fromEntries(porMunicipio.map((m, i) => [m.nome, { label: m.nome, color: CORES_PIZZA[i % CORES_PIZZA.length] }]))}
                    className="h-[280px] w-full"
                  >
                    <PieChart>
                      <Pie
                        data={dadosPizzaMunicipio}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {dadosPizzaMunicipio.map((_, i) => (
                          <Cell key={i} fill={CORES_PIZZA[i % CORES_PIZZA.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                ) : (
                  <p className="py-8 text-center text-sm text-muted-foreground">Sem dados para exibir.</p>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Gráfico de barras — tipo de arma */}
          <section>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Homicídios dolosos por tipo de arma</CardTitle>
                <CardDescription>Classificação do meio utilizado</CardDescription>
              </CardHeader>
              <CardContent>
                {porArma.length > 0 ? (
                  <ChartContainer
                    config={Object.fromEntries(porArma.map((a, i) => [a.nome, { label: a.nome, color: CORES_PIZZA[i % CORES_PIZZA.length] }]))}
                    className="h-[280px] w-full"
                  >
                    <BarChart data={porArma} margin={{ top: 8, right: 8, bottom: 8, left: 8 }} layout="vertical" barCategoryGap="12%">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis type="category" dataKey="nome" tickLine={false} axisLine={false} width={100} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="total" fill={CORES.chart1} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ChartContainer>
                ) : (
                  <p className="py-8 text-center text-sm text-muted-foreground">Sem dados para exibir.</p>
                )}
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Tabela homicídios dolosos */}
        <section>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Detalhamento — Homicídios dolosos</CardTitle>
              <CardDescription>Registros ordenados por data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Sexo</TableHead>
                      <TableHead>Idade</TableHead>
                      <TableHead>Arma</TableHead>
                      <TableHead>Bairro</TableHead>
                      <TableHead>Município</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {homicidiosOrdenados.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>{row.data}</TableCell>
                        <TableCell>{exibirHora(row.hora)}</TableCell>
                        <TableCell>{row.sexo}</TableCell>
                        <TableCell>{parseIdade(row.idade)}</TableCell>
                        <TableCell>{row.arma}</TableCell>
                        <TableCell>{row.bairro}</TableCell>
                        <TableCell>{row.municipio}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tabelas outras categorias */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Outras categorias</h2>

          {feminicidiosOrdenados.length > 0 && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">Feminicídios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Sexo</TableHead>
                        <TableHead>Idade</TableHead>
                        <TableHead>Arma</TableHead>
                        <TableHead>Bairro</TableHead>
                        <TableHead>Município</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feminicidiosOrdenados.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.data}</TableCell>
                          <TableCell>{exibirHora(row.hora)}</TableCell>
                          <TableCell>{row.sexo}</TableCell>
                          <TableCell>{row.idade}</TableCell>
                          <TableCell>{row.arma}</TableCell>
                          <TableCell>{row.bairro}</TableCell>
                          <TableCell>{row.municipio}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {transitoOrdenados.length > 0 && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">Mortes acidentais no trânsito</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Sexo</TableHead>
                        <TableHead>Idade</TableHead>
                        <TableHead>Bairro</TableHead>
                        <TableHead>Município</TableHead>
                        <TableHead>Causa</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transitoOrdenados.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.data}</TableCell>
                          <TableCell>{exibirHora(row.hora)}</TableCell>
                          <TableCell>{row.sexo}</TableCell>
                          <TableCell>{row.idade}</TableCell>
                          <TableCell>{row.bairro}</TableCell>
                          <TableCell>{row.municipio}</TableCell>
                          <TableCell>{"causa" in row ? String(row.causa) : "—"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {suicidiosOrdenados.length > 0 && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">Suicídios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Sexo</TableHead>
                        <TableHead>Idade</TableHead>
                        <TableHead>Bairro</TableHead>
                        <TableHead>Município</TableHead>
                        <TableHead>Meio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {suicidiosOrdenados.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.data}</TableCell>
                          <TableCell>{exibirHora(row.hora)}</TableCell>
                          <TableCell>{row.sexo}</TableCell>
                          <TableCell>{row.idade}</TableCell>
                          <TableCell>{row.bairro}</TableCell>
                          <TableCell>{row.municipio}</TableCell>
                          <TableCell>{"meio" in row ? String(row.meio) : "—"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {confrontoOrdenados.length > 0 && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">Mortes em confronto com a polícia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Sexo</TableHead>
                        <TableHead>Idade</TableHead>
                        <TableHead>Órgão</TableHead>
                        <TableHead>Situação</TableHead>
                        <TableHead>Bairro</TableHead>
                        <TableHead>Município</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {confrontoOrdenados.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.data}</TableCell>
                          <TableCell>{exibirHora(row.hora)}</TableCell>
                          <TableCell>{row.sexo}</TableCell>
                          <TableCell>{row.idade}</TableCell>
                          <TableCell>{"orgao" in row ? String(row.orgao) : "—"}</TableCell>
                          <TableCell>{"situacao" in row ? String(row.situacao) : "—"}</TableCell>
                          <TableCell>{row.bairro}</TableCell>
                          <TableCell>{row.municipio}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {esclarecerOrdenados.length > 0 && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">Mortes a esclarecer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Sexo</TableHead>
                        <TableHead>Idade</TableHead>
                        <TableHead>Bairro</TableHead>
                        <TableHead>Município</TableHead>
                        <TableHead>Obs.</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {esclarecerOrdenados.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.data}</TableCell>
                          <TableCell>{exibirHora(row.hora)}</TableCell>
                          <TableCell>{row.sexo}</TableCell>
                          <TableCell>{row.idade}</TableCell>
                          <TableCell>{row.bairro}</TableCell>
                          <TableCell>{row.municipio}</TableCell>
                          <TableCell>{"obs" in row ? String(row.obs) : "—"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Insights */}
        <section>
          <Card className="border-primary/20 bg-primary/5 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Insights do período</CardTitle>
              <CardDescription>Indicadores calculados a partir dos dados preliminares</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 sm:grid-cols-2">
                <li className="flex flex-col rounded-lg border bg-card p-3">
                  <span className="text-xs font-medium text-muted-foreground">Município com mais homicídios dolosos</span>
                  <span className="mt-1 font-semibold text-foreground">{municipioMaisHomicidios}</span>
                </li>
                <li className="flex flex-col rounded-lg border bg-card p-3">
                  <span className="text-xs font-medium text-muted-foreground">Tipo de arma predominante</span>
                  <span className="mt-1 font-semibold text-foreground">{armaPredominante}</span>
                </li>
                <li className="flex flex-col rounded-lg border bg-card p-3">
                  <span className="text-xs font-medium text-muted-foreground">Faixa etária mais recorrente (homicídios)</span>
                  <span className="mt-1 font-semibold text-foreground">{faixaEtariaRecorrente}</span>
                </li>
                <li className="flex flex-col rounded-lg border bg-card p-3">
                  <span className="text-xs font-medium text-muted-foreground">Proporção em São Luís (homicídios dolosos)</span>
                  <span className="mt-1 font-semibold text-foreground">{proporcaoSaoLuis}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Rodapé */}
        <footer className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
          <p className="text-center text-sm text-amber-800 dark:text-amber-200">
            Dados consolidados preliminares, sujeitos a alterações decorrentes de investigações.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SegurancaDashboardFev2026;
