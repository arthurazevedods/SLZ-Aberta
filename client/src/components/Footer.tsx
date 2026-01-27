import { Github, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SLZ Aberta
            </h3>
            <p className="text-sm text-muted-foreground">
              Democratizando o acesso às informações públicas de São Luís através de dados abertos e visualizações interativas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="/sobre" className="hover:text-primary transition-colors">
                  Sobre o Projeto
                </a>
              </li>
              <li>
                <a href="/dados" className="hover:text-primary transition-colors">
                  Explorar Dados
                </a>
              </li>
              <li>
                <a href="/equipe" className="hover:text-primary transition-colors">
                  Equipe
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:contato@opencityslz.com"
                className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Feito com <Heart className="h-4 w-4 text-destructive fill-destructive" /> para São Luís
          </p>
          <p className="mt-2">© 2026 SLZ Aberta.</p>
          <p className="mt-2">Projeto das alunas Eduane, Maria Luísa e Sofia Emily - IEMA Rio Anil. Orientado pelos professores Arthur Silva e Aline Mayara.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
