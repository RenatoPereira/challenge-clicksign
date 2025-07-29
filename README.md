# Projeto Clicksign Challenge

Este é um projeto desenvolvido como parte de um desafio da Clicksign, utilizando Next.js, TypeScript e Tailwind CSS para criar uma interface de gerenciamento de projetos.

## 🚀 Começando

Siga estas instruções para obter uma cópia do projeto em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Você precisa ter o [Node.js](https://nodejs.org/) (versão 20 ou superior) e um gerenciador de pacotes como npm, yarn ou pnpm instalados.

### Instalação

1. Clone o repositório:
   ```sh
   git clone <url-do-repositorio>
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd clicksign
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
   ou
   ```sh
   yarn install
   ```
   ou
   ```sh
   pnpm install
   ```

### Executando o Projeto

Esse projeto usa `JSON` para persistência de dados, para testa-lo corretamente trabalhe no modo de desenvolvimento. Para um build funcional precisa alterar a constante `API_BASE_URL` para apontar para um servidor de API (com upload de imagem).

Para agilizar o desenvolvimento eu salvo as imagens como base64.

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```sh
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver o resultado.

## 🛠️ Bibliotecas e Tecnologias

Este projeto utiliza diversas bibliotecas modernas para o desenvolvimento frontend. Abaixo estão as principais com links para suas respectivas documentações:

- **[Next.js](https://nextjs.org/docs)**: O framework React para produção. Usado para renderização no servidor, rotas e otimizações.
- **[React](https://react.dev/)**: Biblioteca para construir interfaces de usuário.
- **[TypeScript](https://www.typescriptlang.org/docs/)**: Superset de JavaScript que adiciona tipagem estática ao código.
- **[Tailwind CSS](https://tailwindcss.com/docs)**: Framework CSS utility-first para estilização rápida e customizável.
- **[shadcn/ui](https://ui.shadcn.com/docs)**: Coleção de componentes de UI reutilizáveis, construídos com Radix UI e Tailwind CSS.
- **[React Hook Form](https://react-hook-form.com/)**: Biblioteca para gerenciamento de formulários de forma performática e flexível.
- **[Zod](https://zod.dev/)**: Biblioteca para validação de schemas com foco em TypeScript.
- **[Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)**: Solução de gerenciamento de estado simples e escalável.
- **[Lucide React](https://lucide.dev/guide/react)**: Pacote de ícones SVG leves e customizáveis.
- **[Date-fns](https://date-fns.org/docs/Getting-Started)**: Biblioteca moderna para manipulação de datas em JavaScript.
- **[Sonner](https://sonner.emilkowal.ski/introduction)**: Componente de notificações (toast) para React.

## Linting

Para verificar a qualidade e o estilo do código, execute:

```sh
npm run lint
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tarefas futuras sugeridas

- [ ] Implementar virtualização na listagem de projetos
- [ ] Implementar cache na listagem de projetos
