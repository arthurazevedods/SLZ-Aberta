import { Target, Eye, Users, Github, Database, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description: "Democratizar o acesso às informações públicas de São Luís, transformando dados técnicos em conhecimento público compreensível por todos os cidadãos."
    },
    {
      icon: Eye,
      title: "Visão",
      description: "Ser referência em transparência pública e dados abertos, contribuindo para uma São Luís mais inteligente, participativa e orientada por evidências."
    },
    {
      icon: Heart,
      title: "Valores",
      description: "Transparência, acessibilidade, colaboração e compromisso com a verdade dos dados. Acreditamos no poder da informação para transformar realidades."
    }
  ];

  const partners = [
    "IBGE - Instituto Brasileiro de Geografia e Estatística",
    "Prefeitura Municipal de São Luís",
    "DataSUS - Departamento de Informática do SUS",
    "INEP - Instituto Nacional de Estudos e Pesquisas Educacionais",
    "SNIS - Sistema Nacional de Informações sobre Saneamento",
    "IPEA - Instituto de Pesquisa Econômica Aplicada"
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Sobre a SLZ Aberta
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Uma iniciativa que integra tecnologia, cidadania e transparência para transformar a forma como os ludovicenses acessam e compreendem sua cidade.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Context Section */}
        <div className="mb-16">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                Por que Dados Abertos?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">São Luís</strong>, capital do Maranhão, é uma cidade histórica e patrimônio cultural da humanidade. Com mais de 1 milhão de habitantes, a cidade enfrenta desafios complexos em áreas como educação, saúde, mobilidade urbana e saneamento.
              </p>
              <p>
                O acesso à informação pública de qualidade é fundamental para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fortalecer a <strong className="text-foreground">transparência</strong> e o controle social</li>
                <li>Embasar <strong className="text-foreground">políticas públicas</strong> em evidências</li>
                <li>Promover a <strong className="text-foreground">participação cidadã</strong> informada</li>
                <li>Facilitar <strong className="text-foreground">pesquisas acadêmicas</strong> e jornalismo investigativo</li>
                <li>Impulsionar a <strong className="text-foreground">inovação</strong> e o desenvolvimento local</li>
              </ul>
              <p>
                A SLZ Aberta surge como resposta a essa necessidade, organizando dados dispersos em fontes variadas e apresentando-os de forma visual, compreensível e interativa.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Partners Section */}
        <div className="mb-16">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Fontes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Trabalhamos com dados oficiais de instituições reconhecidas:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partners.map((partner, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm text-foreground">{partner}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Open Source CTA */}
        <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
          <Github className="h-12 w-12 mx-auto mb-4" />
          <div className="inline-block bg-primary-foreground/20 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-2">
            Em breve
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Projeto Open Source
          </h2>
          <p className="text-lg mb-4 text-primary-foreground/90 max-w-2xl mx-auto">
            Este é um projeto de código aberto. Contribua, sugira melhorias ou adapte para sua cidade!
          </p>
          <p className="text-sm md:text-base mb-6 text-primary-foreground/80 max-w-2xl mx-auto">
            Acreditamos que a transparência deve ser completa, incluindo o código-fonte. Ser open source permite que qualquer pessoa verifique como os dados são processados, garante a continuidade do projeto independente de organizações específicas, facilita a replicação em outras cidades e promove a inovação colaborativa. É nossa forma de garantir que a tecnologia a serviço da cidadania seja verdadeiramente democrática e acessível.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              Acessar Repositório
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
