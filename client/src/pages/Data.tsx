import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, TrendingUp, TrendingDown } from "lucide-react";

const Data = () => {
  const [selectedZone] = useState("all");
  const [selectedPeriod] = useState("2024");

  const categories = [
    { id: "educacao", label: "Educação" },
    { id: "saude", label: "Saúde" },
    { id: "mobilidade", label: "Mobilidade" },
    { id: "meio-ambiente", label: "Meio Ambiente" },
    { id: "infraestrutura", label: "Infraestrutura" },
    { id: "economia", label: "Economia" },
  ];

  // Sample data for demonstration
  const sampleMetrics = [
    { label: "Taxa de Alfabetização", value: "92.3%", trend: "up", change: "+2.1%" },
    { label: "Cobertura Vacinal", value: "87.5%", trend: "down", change: "-3.2%" },
    { label: "Tempo Médio de Deslocamento", value: "42 min", trend: "up", change: "+5 min" },
    { label: "Áreas Verdes por Habitante", value: "8.2 m²", trend: "up", change: "+0.5 m²" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Explorar Dados
          </h1>
          <p className="text-lg text-muted-foreground">
            Visualize e analise dados urbanos de São Luís de forma interativa
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Região</label>
                <Select defaultValue={selectedZone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toda a cidade</SelectItem>
                    <SelectItem value="centro">Centro</SelectItem>
                    <SelectItem value="zona-norte">Zona Norte</SelectItem>
                    <SelectItem value="zona-sul">Zona Sul</SelectItem>
                    <SelectItem value="zona-rural">Zona Rural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Período</label>
                <Select defaultValue={selectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ação</label>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Dados
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {sampleMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-secondary" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className={`text-xs ${metric.trend === "up" ? "text-secondary" : "text-destructive"}`}>
                  {metric.change} vs. período anterior
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Tabs */}
        <Tabs defaultValue="educacao" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <Card>
                <CardHeader>
                  <CardTitle>Dados de {cat.label}</CardTitle>
                  <CardDescription>
                    Visualizações e estatísticas sobre {cat.label.toLowerCase()} em São Luís
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Placeholder for charts */}
                    <div className="bg-muted/50 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-border">
                      <div className="text-center">
                        <p className="text-lg font-medium text-muted-foreground mb-2">
                          Visualização de {cat.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Gráficos e dados interativos serão exibidos aqui
                        </p>
                      </div>
                    </div>

                    {/* Sample data table */}
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 text-sm font-medium">Indicador</th>
                            <th className="text-left p-3 text-sm font-medium">Valor</th>
                            <th className="text-left p-3 text-sm font-medium">Fonte</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="p-3 text-sm">Exemplo de indicador</td>
                            <td className="p-3 text-sm font-medium">100%</td>
                            <td className="p-3 text-sm text-muted-foreground">IBGE 2024</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar Dataset Completo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Data Sources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Fontes de Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Todos os dados apresentados são provenientes de fontes oficiais e atualizados regularmente:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {["IBGE", "Prefeitura de São Luís", "DataSUS", "INEP", "SNIS", "IPEA"].map((source) => (
                <div key={source} className="px-3 py-2 bg-muted rounded-lg text-sm font-medium text-center">
                  {source}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Data;
