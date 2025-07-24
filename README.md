# 🏭 Inspetor Industrial App

Uma aplicação web moderna e robusta para gerenciamento de inspeções industriais, construída com as mais recentes tecnologias web para proporcionar uma experiência excepcional ao usuário.

![Next.js](https://img.shields.io/badge/Next.js-15.4.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.12.0-2D3748?style=for-the-badge&logo=prisma)

## ✨ Funcionalidades

### 🔐 Autenticação & Autorização
- **Sistema de autenticação completo** com Better Auth
- **Login seguro** com validação de email e senha
- **Gerenciamento de sessões** com tokens seguros
- **Proteção de rotas** automática

### 👥 Sistema Multi-Organizações
- **Criação e gerenciamento de organizações**
- **Sistema de convites** para membros
- **Controle de permissões** baseado em funções
- **Troca dinâmica** entre organizações

### 🎨 Interface Moderna
- **Design system** baseado em shadcn/ui
- **Tema escuro/claro** com next-themes
- **Componentes reutilizáveis** e acessíveis
- **Animações suaves** e microinterações
- **Layout responsivo** para todos os dispositivos

### 📱 Dashboard Intuitivo
- **Sidebar navegacional** com collapse
- **Header contextual** com breadcrumbs
- **Cards informativos** com estatísticas
- **Interface limpa** inspirada nas melhores práticas

### 👤 Perfil de Usuário Avançado
- **Página de perfil moderna** inspirada em plataformas como GitHub e Vercel
- **Upload de avatar** com preview
- **Formulário de edição** com validação em tempo real
- **Seções organizadas** (informações pessoais, segurança, preferências)
- **Zona de perigo** para ações críticas
- **Estatísticas do usuário** com métricas visuais
- **Atividades recentes** com timeline

### 🔧 Funcionalidades Técnicas
- **Validação de formulários** com Zod e React Hook Form
- **Notificações toast** com Sonner
- **Modais dinâmicos** com gerenciamento de estado
- **Progress bar** para navegação
- **Otimização de performance** com Next.js 15

## 🚀 Stack Tecnológica

### Frontend
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca de interface
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[TailwindCSS v4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Biblioteca de componentes

### Autenticação
- **[Better Auth](https://www.better-auth.com/)** - Sistema de autenticação moderno
- **[Zod](https://zod.dev/)** - Validação de schemas

### Banco de Dados
- **[Prisma](https://www.prisma.io/)** - ORM moderno
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional

### Bibliotecas Auxiliares
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Sonner](https://sonner.emilkowal.ski/)** - Sistema de notificações
- **[date-fns](https://date-fns.org/)** - Manipulação de datas

## 🗄️ Estrutura do Banco de Dados

```mermaid
erDiagram
    User ||--o{ Session : has
    User ||--o{ Account : has
    User ||--o{ Member : belongs_to
    User ||--o{ Invitation : sends
    Organization ||--o{ Member : has
    Organization ||--o{ Invitation : for
    
    User {
        string id PK
        string name
        string email UK
        boolean emailVerified
        string image
        datetime createdAt
        datetime updatedAt
    }
    
    Organization {
        string id PK
        string name
        string slug UK
        string logo
        datetime createdAt
        string metadata
    }
    
    Member {
        string id PK
        string organizationId FK
        string userId FK
        string role
        datetime createdAt
    }
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- pnpm (recomendado) ou npm/yarn
- PostgreSQL 14+

### 1. Clone o repositório
```bash
git clone https://github.com/pedroaba/inspetor-industrial-app.git
cd inspetor-industrial-app
```

### 2. Instale as dependências
```bash
pnpm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/inspetor_industrial"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Configure o banco de dados
```bash
# Execute as migrações
pnpm prisma migrate dev

# (Opcional) Visualize o banco
pnpm prisma studio
```

### 5. Execute a aplicação
```bash
# Desenvolvimento
pnpm dev

# Produção
pnpm build
pnpm start
```

A aplicação estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
inspetor-industrial-app/
├── prisma/
│   ├── migrations/           # Migrações do banco
│   └── schema.prisma        # Schema do Prisma
├── public/                  # Arquivos estáticos
├── src/
│   ├── app/                 # App Router (Next.js 15)
│   │   ├── (dashboard)/     # Grupo de rotas protegidas
│   │   │   ├── profile/     # Página de perfil
│   │   │   └── layout.tsx   # Layout do dashboard
│   │   ├── auth/            # Páginas de autenticação
│   │   ├── api/             # API Routes
│   │   └── globals.css      # Estilos globais
│   ├── assets/              # Componentes de ícones/imagens
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ui/              # Componentes base (shadcn/ui)
│   │   └── modals/          # Componentes de modal
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilitários e configurações
│   └── utils/               # Funções auxiliares
├── components.json          # Configuração shadcn/ui
├── tailwind.config.ts       # Configuração TailwindCSS
└── tsconfig.json           # Configuração TypeScript
```

## 🎨 Design System

### Cores Primárias
- **Inspetor Primary**: `oklch(0.327 0.049 247.54)` - Azul profissional
- **Inspetor Secondary**: `oklch(0.261 0.042 246.88)` - Azul secundário

### Componentes Principais
- **Botões**: Variantes primary, secondary, outline, destructive
- **Cards**: Com shadow suave e hover effects
- **Modais**: Fullscreen responsivos com backdrop blur
- **Formulários**: Validação em tempo real com feedback visual
- **Avatars**: Com fallback gradiente e upload interativo

### Animações
- **Entrada**: fade-in e slide-in escalonados
- **Hover**: scale, shadow e color transitions
- **Loading**: skeleton states e spinners

## 🤝 Como Contribuir

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### Padrões de Código
- Use **TypeScript** para tipagem
- Siga os padrões do **ESLint** e **Prettier**
- Escreva **componentes reutilizáveis**
- Documente **funções complexas**
- Mantenha **responsividade** em todos os componentes

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento com Turbopack

# Build e Deploy
pnpm build            # Build de produção
pnpm start            # Inicia servidor de produção

# Linting e Formatação
pnpm lint             # Executa ESLint

# Banco de Dados
pnpm prisma:migrate   # Executa migrações
pnpm prisma:studio    # Abre Prisma Studio
pnpm prisma:generate  # Gera client do Prisma
```

## 🔒 Segurança

- **Autenticação** com tokens seguros e rotação automática
- **Validação** de dados no frontend e backend
- **Sanitização** de inputs do usuário
- **Proteção CSRF** nativa do Next.js
- **Headers de segurança** configurados
- **Variáveis de ambiente** para dados sensíveis

## 📈 Performance

- **Next.js 15** com App Router para otimização automática
- **Turbopack** para builds rápidas em desenvolvimento
- **Code splitting** automático
- **Image optimization** com next/image
- **Static generation** onde possível
- **Bundle analysis** para monitoramento

## 🌐 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outros Provedores
- **Netlify**: Configure build command como `pnpm build`
- **Railway**: Conecte PostgreSQL e configure env vars
- **Docker**: Use o Dockerfile incluído

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Pedro Augusto Barbosa Aparecido**
- GitHub: [@pedroaba](https://github.com/pedroaba)
- LinkedIn: [Pedro Augusto](https://linkedin.com/in/pedroaba)

---

<div align="center">
  <p>Desenvolvido com ❤️ e ☕ para revolucionar a inspeção industrial</p>
  <p>Se este projeto foi útil, considere dar uma ⭐!</p>
</div>
