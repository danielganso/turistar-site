# Turistar Viagens - Site Estático

## 📋 Visão Geral

Site estático de uma única página para a **Turistar Viagens**, uma agência de turismo localizada em Feira de Santana, BA. O site apresenta informações da empresa, formas de contato e localização em um design moderno e responsivo.

## 🏢 Informações da Empresa

- **Nome:** Turistar Viagens
- **CNPJ:** 38.461.835/0001-11
- **Endereço:** Av. Nóide Cerqueira, 5544 - LOJA 14, Sim, Feira de Santana – BA, 44085-052
- **Telefone:** +55 75 98182-3998
- **WhatsApp:** +55 75 98182-3998
- **Instagram:** [@turistar](https://instagram.com/turistar)

## 🎯 Características do Site

### Seções Principais
1. **Sobre a Turistar** - Apresentação da empresa e valores
2. **Contato** - Links para WhatsApp, telefone, email e redes sociais
3. **Localização** - Mapa incorporado e informações de endereço

### Funcionalidades
- ✅ Design responsivo (mobile-first)
- ✅ Navegação suave entre seções
- ✅ Menu hamburger para dispositivos móveis
- ✅ Links diretos para WhatsApp
- ✅ Mapa do Google Maps incorporado
- ✅ Modal para Política de Privacidade
- ✅ Animações suaves e modernas
- ✅ Otimizado para SEO
- ✅ Acessibilidade (WCAG)

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com Flexbox e Grid
- **JavaScript** - Interatividade e funcionalidades
- **Google Maps** - Integração de mapa
- **Font Awesome** - Ícones (via emojis para leveza)

## 📁 Estrutura do Projeto

```
Turistarviagens/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
├── icon.png           # Ícone da empresa
└── README.md          # Documentação
```

## 🚀 Como Usar

### Visualização Local
1. Baixe todos os arquivos para uma pasta
2. Abra o arquivo `index.html` em um navegador
3. Ou use um servidor local:
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js (http-server)
   npx http-server
   
   # Com PHP
   php -S localhost:8000
   ```

### Deploy
O site pode ser hospedado em qualquer serviço de hospedagem estática:

- **Netlify** (Recomendado)
- **Vercel**
- **GitHub Pages**
- **Firebase Hosting**
- **Surge.sh**

#### Deploy no Netlify
1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta do projeto para a área de deploy
3. O site estará online em poucos segundos

#### Deploy no GitHub Pages
1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings > Pages
4. Selecione a branch main como source

## 📱 Responsividade

O site foi desenvolvido com abordagem **mobile-first** e é totalmente responsivo:

- **Mobile:** 320px - 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px+

## 🎨 Personalização

### Cores Principais
```css
:root {
  --primary-blue: #2563eb;
  --secondary-purple: #667eea;
  --accent-red: #ff6b6b;
  --whatsapp-green: #25d366;
  --text-dark: #333;
  --text-light: #64748b;
}
```

### Modificar Informações
1. **Contatos:** Edite as seções no `index.html`
2. **Cores:** Modifique as variáveis CSS no `styles.css`
3. **Textos:** Altere o conteúdo diretamente no HTML

## 📞 Links de Contato

### WhatsApp
```html
<a href="https://wa.me/5575981823998" target="_blank">
```

### Telefone
```html
<a href="tel:+5575981823998">
```

### Email
```html
<a href="mailto:contato@turistarviagens.com.br">
```

### Google Maps
```html
<a href="https://maps.app.goo.gl/pyDaJs9RkhBDpwXZ9" target="_blank">
```

## 🔧 Funcionalidades JavaScript

- **Navegação suave** entre seções
- **Menu mobile** responsivo
- **Modal** para política de privacidade
- **Animações** ao rolar a página
- **Highlight** da seção ativa
- **Copy to clipboard** (duplo clique em telefone/email)

## 📈 SEO e Performance

### Meta Tags Incluídas
- Title otimizado
- Description
- Viewport para responsividade
- Charset UTF-8

### Otimizações
- Imagens otimizadas
- CSS e JS minificados (em produção)
- Lazy loading para iframe
- Preload de recursos críticos

## ♿ Acessibilidade

- Contraste adequado de cores
- Navegação por teclado
- Alt text em imagens
- Estrutura semântica HTML5
- ARIA labels onde necessário

## 🔒 Política de Privacidade

O site inclui uma política de privacidade básica acessível via modal. Para uso comercial, recomenda-se:

1. Revisar e personalizar o conteúdo
2. Consultar um advogado especializado
3. Adequar à LGPD (Lei Geral de Proteção de Dados)

## 📊 Analytics (Opcional)

O código está preparado para integração com:
- Google Analytics
- Facebook Pixel
- Hotjar
- Outras ferramentas de tracking

## 🐛 Suporte e Manutenção

### Problemas Comuns
1. **Menu não abre no mobile:** Verificar se o JavaScript está carregando
2. **Mapa não aparece:** Verificar conexão com internet
3. **WhatsApp não abre:** Verificar se o número está correto

### Atualizações Futuras
- [ ] Integração com CMS
- [ ] Sistema de reservas
- [ ] Blog de viagens
- [ ] Galeria de fotos
- [ ] Depoimentos de clientes

## 📝 Licença

Este projeto foi desenvolvido especificamente para a Turistar Viagens. Todos os direitos reservados.

## 📞 Contato para Suporte Técnico

Para suporte técnico ou modificações no site, entre em contato através dos canais oficiais da Turistar Viagens.

---

**Desenvolvido com ❤️ para Turistar Viagens**

*Última atualização: Janeiro 2024*