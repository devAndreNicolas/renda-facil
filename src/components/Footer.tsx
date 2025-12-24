import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">RendeCerto</h3>
            <p className="text-sm">
              Simulador de rendimentos de investimentos para ajudar você a tomar decisões mais informadas.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/simulador" className="hover:text-primary-400 transition-colors">
                  Simulador
                </Link>
              </li>
              <li>
                <Link href="/comparativo" className="hover:text-primary-400 transition-colors">
                  Comparativo
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-primary-400 transition-colors">
                  Glossário
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="hover:text-primary-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-primary-400 transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-400 transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Aviso</h4>
            <p className="text-sm">
              Este simulador é apenas para fins educacionais. Os resultados são estimativas e não garantem
              rentabilidade futura. Consulte um profissional antes de investir.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} RendeCerto. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

