import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DataCard from "@/components/DataCard";
import { 
  GraduationCap, 
  Heart, 
  Bus, 
  Leaf, 
  Building2, 
  TrendingUp,
  ArrowRight,
  BarChart3,
  Users,
  Database
} from "lucide-react";

const Home = () => {
  const dataCategories = [
    {
      title: "Educação",
      description: "Escolas, matrículas, IDEB e indicadores educacionais por bairro",
      icon: GraduationCap,
      gradient: "bg-gradient-to-br from-primary to-blue-600"
    },
    {
      title: "Saúde",
      description: "Cobertura do SUS, vacinação e unidades de saúde por região",
      icon: Heart,
      gradient: "bg-gradient-to-br from-destructive to-pink-600"
    },
    {
      title: "Mobilidade",
      description: "Transporte público, tempo de deslocamento e frota urbana",
      icon: Bus,
      gradient: "bg-gradient-to-br from-secondary to-emerald-600"
    },
    {
      title: "Meio Ambiente",
      description: "Áreas verdes, qualidade do ar e saneamento ambiental",
      icon: Leaf,
      gradient: "bg-gradient-to-br from-secondary to-green-700"
    },
    {
      title: "Infraestrutura",
      description: "Obras públicas, saneamento e serviços urbanos",
      icon: Building2,
      gradient: "bg-gradient-to-br from-accent to-orange-600"
    },
    {
      title: "Economia",
      description: "PIB, emprego, renda e indicadores econômicos da cidade",
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-primary to-indigo-600"
    }
  ];

  const stats = [
    { number: "6", label: "Eixos Temáticos", icon: Database },
    { number: "50+", label: "Fontes de Dados", icon: BarChart3 },
    { number: "1M+", label: "Habitantes", icon: Users },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 -z-10" />
        <div className="container mx-auto text-center">
          <div className="inline-block px-4 py-2 mb-6 bg-primary/10 rounded-full text-primary font-medium text-sm animate-in fade-in slide-in-from-bottom-3 duration-700">
            Dados Abertos • Transparência • Cidadania
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            OpenCity SLZ
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-100">
            Dados abertos para uma cidade mais inteligente
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Explore informações sobre educação, saúde, mobilidade, infraestrutura e meio ambiente de São Luís em um só lugar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-300">
            <Link to="/dados">
              <Button size="lg" className="group">
                Explorar Dados
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/sobre">
              <Button size="lg" variant="outline">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-in fade-in zoom-in duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore os Dados da Cidade
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dados organizados e visualizados de diversas fontes oficiais: IBGE, Prefeitura de São Luís, DataSUS, INEP, SNIS e IPEA
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataCategories.map((category, index) => (
              <div key={index} className="animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                <DataCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transforme Dados em Conhecimento
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Acesse painéis interativos, visualizações dinâmicas e baixe dados para suas próprias análises
          </p>
          <Link to="/dados">
            <Button size="lg" variant="secondary" className="group">
              Acessar Painel Completo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
