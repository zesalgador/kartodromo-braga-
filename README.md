# Kartódromo Internacional de Braga

Site moderno e responsivo para o Kartódromo Internacional de Braga, desenvolvido com Next.js e Tailwind CSS.

## Tecnologias

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript**
- **Lucide React** (ícones)

## Requisitos

- Node.js 18.18 ou superior
- npm

## Instalação e execução local

```bash
cd Projects/kartodromo-braga
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) no browser.

## Build de produção

```bash
npm run build
npm start
```

## Publicar na Vercel

1. Cria uma conta em [vercel.com](https://vercel.com) (se ainda não tiveres).
2. Instala a CLI: `npm i -g vercel`
3. Na pasta do projeto, executa: `vercel`
4. Segue as instruções — a Vercel deteta automaticamente o Next.js.

Alternativa: liga o repositório GitHub à Vercel e faz deploy automático a cada push.

## Estrutura do projeto

```
src/
├── app/
│   ├── globals.css      # Estilos globais e tema
│   ├── layout.tsx       # Layout e metadata SEO
│   └── page.tsx         # Homepage
├── components/
│   ├── ui/              # Componentes reutilizáveis
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Pricing.tsx
│   ├── Hours.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── data/
    └── content.ts       # Conteúdos editáveis (preços, horários, contactos)
```

## Editar conteúdos

Os preços, horários e contactos estão centralizados em `src/data/content.ts` para facilitar atualizações futuras.

## Cores

| Cor     | Valor   | Uso                    |
|---------|---------|------------------------|
| Preto   | #0a0a0a | Fundo principal        |
| Amarelo | #facc15 | Destaques e botões     |
| Branco  | #fafafa | Texto principal        |
