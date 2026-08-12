# Event Manager — Front-end Web

Interface web desenvolvida em **React** para o gerenciamento de eventos, integrada à [[Event Manager AP](https://github.com/KevinProgramador2/Gerenciador_de_eventos)].

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4)
![React Router](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter)

## Funcionalidades

- Login e cadastro de administrador
- Rotas protegidas — acesso à Home exige autenticação
- Listagem de eventos do administrador autenticado
- Criar, editar e excluir eventos
- Modal para cadastro de novos eventos
- Feedback visual com sistema de Toast
- Sessão persistida via `localStorage`
- Logout automático ao detectar token expirado (401)

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React 19 | Interface |
| Vite 8 | Bundler e servidor de desenvolvimento |
| React Router DOM 7 | Navegação e rotas protegidas |
| Axios | Comunicação com a API |
| Context API | Gerenciamento de estado de autenticação |
| CSS Modules | Estilização por componente |

## Estrutura do Projeto

| Pasta | Conteúdo |
|---|---|
| `pages/` | Login, Cadastro, Home |
| `components/` | CampoInput, Modal, Toast, CardEvento, Button |
| `contexts/` | AuthContext — estado global de autenticação |
| `routes/` | AppRoutes e ProtectedRoute |
| `services/` | api.js (axios + interceptors) e auth.js (sessão) |
| `hooks/` | useForm |
| `utils/` | helpers |

## Como executar

**Pré-requisitos:** Node.js instalado e a API rodando localmente.

1. Instale as dependências:
```bash
npm install
```

2. Configure o `.env` na raiz do projeto:
```env
VITE_API_URL=http://localhost:8080
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O app estará disponível em `http://localhost:5173`.

## Arquitetura de autenticação

O token JWT é salvo no `localStorage` após o login e injetado automaticamente em todas as requisições via interceptor do Axios. Ao receber um `401`, o sistema encerra a sessão e redireciona para o login automaticamente.
