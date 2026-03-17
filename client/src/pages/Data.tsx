import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Loader2, AlertCircle, ExternalLink, MapPin, BarChart3, Shield } from "lucide-react";
import SegurancaDashboardFev2026 from "@/components/SegurancaDashboardFev2026";
import {
  fetchMunicipio,
  fetchPanoramaResultados,
  FONTES_REFERENCIAS_PANORAMA,
  ID_SAO_LUIS,
  PANORAMA_INDICADORES_LABELS,
  REFERENCIAS_PANORAMA_NE_BR,
  type Municipio,
  type PanoramaResultadoItem,
} from "@/lib/ibge-api";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Cell, LabelList } from "recharts";

const PANORAMA_PERIODO = "2022";
const CIDADES_PANORAMA_URL = "https://cidades.ibge.gov.br/brasil/ma/sao-luis/panorama";
const SSP_MA_URL = "https://www.ssp.ma.gov.br/estatisticas-da-grande-sao-luis/";

/** CVLI (Crimes Violentos Letais Intencionais) — Grande São Luís. Fonte: SSP/MA. */
const SSP_CVLI_MENSAL = [
  { mes: "Jan", cvli: 29 },
  { mes: "Fev", cvli: 31 },
  { mes: "Mar", cvli: 23 },
  { mes: "Abr", cvli: 28 },
  { mes: "Mai", cvli: 21 },
  { mes: "Jun", cvli: 26 },
  { mes: "Jul", cvli: 38 },
  { mes: "Ago", cvli: 29 },
  { mes: "Set", cvli: 28 },
  { mes: "Out", cvli: 30 },
  { mes: "Nov", cvli: 19 },
  { mes: "Dez", cvli: 29 },
  { mes: "Jan/26", cvli: 29 },
  { mes: "Fev/26", cvli: 31 },
];

const CHART_CONFIG = {
  valor: { label: "Valor" },
  saoLuis: { label: "São Luís", color: "hsl(var(--primary))" },
  nordeste: { label: "Nordeste", color: "hsl(var(--chart-2))" },
  brasil: { label: "Brasil", color: "hsl(var(--chart-3))" },
};

const Data = () => {
  const [municipio, setMunicipio] = useState<Municipio | null>(null);
  const [panorama, setPanorama] = useState<PanoramaResultadoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPanorama, setLoadingPanorama] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchMunicipio(ID_SAO_LUIS)
      .then((data) => {
        if (!cancelled) setMunicipio(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Erro ao carregar dados");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoadingPanorama(true);
    fetchPanoramaResultados(ID_SAO_LUIS, PANORAMA_PERIODO)
      .then((data) => {
        if (!cancelled) setPanorama(data);
      })
      .catch(() => {
        if (!cancelled) setPanorama([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingPanorama(false);
      });
    return () => { cancelled = true; };
  }, []);

  const handleDownloadJson = () => {
    if (!municipio) return;
    const blob = new Blob([JSON.stringify(municipio, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sao-luis-ibge.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Explorar Dados
          </h1>
          <p className="text-lg text-muted-foreground">
            Dados de São Luís (MA) via API do IBGE — Localidades
          </p>
        </div>

        {error && (
          <Card className="mb-8 border-destructive">
            <CardContent className="pt-6 flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>{error}</p>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="localidades" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mb-6">
            <TabsTrigger value="localidades" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              São Luís — MA
            </TabsTrigger>
            <TabsTrigger value="panorama" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Panorama ({PANORAMA_PERIODO})
            </TabsTrigger>
            <TabsTrigger value="seguranca" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Segurança Pública
            </TabsTrigger>
          </TabsList>

          <TabsContent value="localidades">
            <Card>
              <CardHeader>
                <CardTitle>São Luís — Maranhão</CardTitle>
                <CardDescription>
                  Informações oficiais do município (fonte: IBGE — Serviço de Dados, Localidades)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin mr-2" />
                    Carregando dados...
                  </div>
                ) : municipio ? (
                  <>
                    <div className="border rounded-lg overflow-hidden mb-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Campo</TableHead>
                            <TableHead>Valor</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-muted-foreground">ID (IBGE)</TableCell>
                            <TableCell className="font-mono">{municipio.id}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-muted-foreground">Município</TableCell>
                            <TableCell className="font-medium">{municipio.nome}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-muted-foreground">Microrregião</TableCell>
                            <TableCell>{municipio.microrregiao.nome}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-muted-foreground">Mesorregião</TableCell>
                            <TableCell>{municipio.microrregiao.mesorregiao.nome}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-muted-foreground">UF</TableCell>
                            <TableCell>{municipio.microrregiao.mesorregiao.UF.sigla} — {municipio.microrregiao.mesorregiao.UF.nome}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-muted-foreground">Região Imediata</TableCell>
                            <TableCell>{municipio["regiao-imediata"].nome}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-muted-foreground">Região Intermediária</TableCell>
                            <TableCell>{municipio["regiao-imediata"]["regiao-intermediaria"].nome}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" onClick={handleDownloadJson}>
                        <Download className="h-4 w-4 mr-2" />
                        Baixar JSON
                      </Button>
                    </div>
                  </>
                ) : null}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="panorama">
            <Card>
              <CardHeader>
                <CardTitle>Panorama municipal ({PANORAMA_PERIODO})</CardTitle>
                <CardDescription>
                  Indicadores de ambiente, economia, educação e saúde — mesma fonte do{" "}
                  <a
                    href={CIDADES_PANORAMA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline inline-flex items-center gap-1"
                  >
                    IBGE Cidades
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingPanorama ? (
                  <div className="flex items-center justify-center py-12 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin mr-2" />
                    Carregando indicadores...
                  </div>
                ) : panorama.length > 0 ? (
                  <>
                    <div className="border rounded-lg overflow-hidden mb-8">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Indicador</TableHead>
                            <TableHead className="text-right">Valor ({PANORAMA_PERIODO})</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {panorama.map((item) => {
                            const valor = item.res[0]?.res[PANORAMA_PERIODO];
                            const meta = PANORAMA_INDICADORES_LABELS[item.id];
                            const label = meta?.label ?? `Indicador ${item.id}`;
                            const unidade = meta?.unidade ?? "";
                            return (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{label}</TableCell>
                                <TableCell className="text-right">
                                  {valor != null ? `${valor}${unidade ? ` ${unidade}` : ""}` : "—"}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="space-y-8">
                      <h3 className="text-lg font-semibold">Comparativo com Nordeste e Brasil</h3>
                      <p className="text-sm text-muted-foreground">
                        {FONTES_REFERENCIAS_PANORAMA}
                      </p>
                      {panorama
                        .filter((item) => {
                          const ref = REFERENCIAS_PANORAMA_NE_BR[item.id];
                          const sl = item.res[0]?.res[PANORAMA_PERIODO];
                          return ref && sl != null && !Number.isNaN(parseFloat(String(sl)));
                        })
                        .map((item) => {
                          const slVal = parseFloat(String(item.res[0]?.res[PANORAMA_PERIODO]));
                          const ref = REFERENCIAS_PANORAMA_NE_BR[item.id]!;
                          const meta = PANORAMA_INDICADORES_LABELS[item.id];
                          const label = meta?.label ?? `Indicador ${item.id}`;
                          const unidade = meta?.unidade ?? "";
                          const chartData = [
                            { territorio: "São Luís", valor: slVal },
                            { territorio: "Nordeste", valor: ref.nordeste },
                            { territorio: "Brasil", valor: ref.brasil },
                          ];
                          const cores = [
                            "hsl(var(--primary))",
                            "hsl(var(--chart-2))",
                            "hsl(var(--chart-3))",
                          ];
                          return (
                            <Card key={item.id}>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">{label}</CardTitle>
                                {unidade && (
                                  <CardDescription>Valores em {unidade}</CardDescription>
                                )}
                              </CardHeader>
                              <CardContent>
                                <ChartContainer config={CHART_CONFIG} className="h-[240px] w-full">
                                  <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                      dataKey="territorio"
                                      tickLine={false}
                                      axisLine={false}
                                      tickMargin={8}
                                    />
                                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
                                      {chartData.map((_, index) => (
                                        <Cell key={index} fill={cores[index]} />
                                      ))}
                                      <LabelList
                                        dataKey="valor"
                                        position="inside"
                                        fill="white"
                                        className="fill-white font-medium"
                                        formatter={(v: number) =>
                                          `${Number(v).toLocaleString("pt-BR", {
                                            minimumFractionDigits: 1,
                                            maximumFractionDigits: 1,
                                          })}${unidade === "%" ? "%" : ""}`
                                        }
                                      />
                                    </Bar>
                                  </BarChart>
                                </ChartContainer>
                              </CardContent>
                            </Card>
                          );
                        })}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground py-4">
                    Indicadores não disponíveis. Consulte o{" "}
                    <a
                      href={CIDADES_PANORAMA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      panorama no IBGE Cidades
                    </a>
                    .
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguranca">
            <Card>
              <CardHeader>
                <CardTitle>Segurança Pública — Grande São Luís</CardTitle>
                <CardDescription>
                  CVLI (Crimes Violentos Letais Intencionais): homicídio doloso, feminicídio, roubo seguido de morte e lesão corporal seguida de morte. Dados oficiais da{" "}
                  <a
                    href={SSP_MA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline inline-flex items-center gap-1"
                  >
                    SSP/MA
                    <ExternalLink className="h-3 w-3" />

                  </a>
                  .
                </CardDescription>
                <CardDescription>
                  Estes dados não são fornecidos via API ou CSV.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">CVLI por mês — Grande São Luís (2025 e Jan/Fev 2026)</h3>
                    <ChartContainer
                      config={{ cvli: { label: "CVLI", color: "hsl(var(--primary))" } }}
                      className="h-[280px] w-full"
                    >
                      <BarChart data={SSP_CVLI_MENSAL} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="cvli" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                          <LabelList
                            dataKey="cvli"
                            position="inside"
                            fill="white"
                            className="fill-white font-medium"
                            formatter={(v: number) =>
                              Number(v).toLocaleString("pt-BR", { maximumFractionDigits: 0 })
                            }
                          />
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Fonte: Secretaria de Segurança Pública do Maranhão (SSP/MA). Dados atualizados conforme publicados em{" "}
                    <a href={SSP_MA_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      Estatísticas da Grande São Luís
                    </a>
                    . Para dados em tempo real e quadros comparativos, consulte o site da SSP/MA.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <SegurancaDashboardFev2026 embedded />
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Fontes de Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Os dados desta página vêm da API oficial do IBGE (Serviço de Dados):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <a
                href={SSP_MA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-muted rounded-lg text-sm font-medium text-center hover:bg-muted/80 transition-colors"
              >
                SSP/MA — Estatísticas Grande São Luís
              </a>
              <a
                href={CIDADES_PANORAMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-muted rounded-lg text-sm font-medium text-center hover:bg-muted/80 transition-colors"
              >
                IBGE Cidades — Panorama São Luís
              </a>
              <a
                href="https://servicodados.ibge.gov.br/api/docs/localidades"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-muted rounded-lg text-sm font-medium text-center hover:bg-muted/80 transition-colors"
              >
                IBGE — API Localidades
              </a>
              <a
                href="https://servicodados.ibge.gov.br/api/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-muted rounded-lg text-sm font-medium text-center hover:bg-muted/80 transition-colors"
              >
                IBGE — Documentação APIs
              </a>
              <a
                href="https://github.com/open-geodata/br_ibge_api"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-muted rounded-lg text-sm font-medium text-center hover:bg-muted/80 transition-colors"
              >
                open-geodata/br_ibge_api
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Data;
