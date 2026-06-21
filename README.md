# IA Atendimento WhatsApp

Solução de automação com Inteligência Artificial integrada ao WhatsApp para empresas que desejam melhorar o atendimento, aumentar as vendas e reduzir custos operacionais.

## 🎯 Objetivos

- ✅ Atendimento automático 24 horas por dia
- ✅ Respostas instantâneas para dúvidas frequentes
- ✅ Qualificação automática de clientes
- ✅ Encaminhamento inteligente para atendentes humanos
- ✅ Agendamento de serviços e reuniões
- ✅ Redução do tempo de resposta
- ✅ Aumento da produtividade da equipe

## 🚀 Começando

### Pré-requisitos

- Node.js 16+
- npm ou yarn
- Conta WhatsApp Business
- Token de acesso WhatsApp API

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/ms2127664-bit/ia-atendimento-whatsapp.git
cd ia-atendimento-whatsapp
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas credenciais:

```env
WHATSAPP_BUSINESS_ACCOUNT_ID=seu_id_conta
WHATSAPP_PHONE_NUMBER_ID=seu_id_numero
WHATSAPP_ACCESS_TOKEN=seu_token_acesso
WHATSAPP_WEBHOOK_VERIFY_TOKEN=seu_token_webhook
PORT=3000
```

### Desenvolvimento

Para rodar em modo desenvolvimento com auto-reload:

```bash
npm run dev:watch
```

Ou para modo desenvolvimento simples:

```bash
npm run dev
```

### Build para Produção

```bash
npm run build
npm start
```

## 📋 Estrutura do Projeto

```
ia-atendimento-whatsapp/
├── src/
│   ├── index.ts              # Entrada principal da aplicação
│   ├── routes/
│   │   └── webhook.ts        # Rotas do webhook WhatsApp
│   ├── services/
│   │   └── whatsapp.ts       # Lógica de integração WhatsApp
│   ├── middleware/
│   │   └── auth.ts           # Middleware de autenticação
│   └── utils/
│       └── logger.ts         # Configuração de logs
├── dist/                     # Arquivos compilados (build)
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## 🔌 Integração WhatsApp

### Configurar Webhook

1. Acesse o painel de desenvolvedor do WhatsApp Business
2. Configure o webhook para apontar para:
   ```
   https://seu-dominio.com/webhook
   ```
3. Configure o token de verificação que você definiu em `WHATSAPP_WEBHOOK_VERIFY_TOKEN`
4. Inscreva-se nos eventos de mensagens

### Fluxo de Mensagens

```
┌─────────────┐
│   Usuário   │
│  WhatsApp   │
└──────┬──────┘
       │ Envia mensagem
       ↓
┌──────────────────┐
│   Webhook POST   │
│  /webhook        │
└──────┬───────────┘
       │
       ↓
┌────────────────────────┐
│ handleWebhookMessage() │
│ - Recebe mensagem      │
│ - Processa conteúdo    │
│ - Gera resposta        │
└──────┬─────────────────┘
       │
       ↓
┌──────────────────┐
│  sendMessage()   │
│  WhatsApp API    │
└──────┬───────────┘
       │
       ↓
┌─────────────┐
│   Usuário   │
│   Recebe    │
└─────────────┘
```

## 💬 Exemplos de Uso

### Enviar Mensagem

```typescript
import { sendMessage } from './services/whatsapp';

await sendMessage('5511999999999', 'Olá! Como posso ajudá-lo?', 'seu_phone_number_id');
```

### Responder Automaticamente

As respostas automáticas são geradas em `generateResponse()` no arquivo `src/services/whatsapp.ts`. Customize conforme necessário:

```typescript
function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase().trim();

  if (message.includes('oi')) {
    return 'Olá! Bem-vindo!';
  }

  return 'Resposta padrão';
}
```

## 📚 Próximos Passos

- [ ] Integrar com OpenAI/Claude para respostas mais inteligentes
- [ ] Adicionar persistência de dados (MongoDB/PostgreSQL)
- [ ] Implementar sistema de fila para encaminhamento a atendentes
- [ ] Criar painel administrativo
- [ ] Adicionar suporte a mídia (imagens, áudios)
- [ ] Implementar análise de sentimento
- [ ] Deploy em produção (AWS, GCP, Azure)

## 📝 Logs

Os logs são salvos em:
- `error.log` - Erros
- `combined.log` - Todos os logs
- Console - Saída em tempo real

## 🛠️ Troubleshooting

### Webhook não está recebendo mensagens

1. Verifique se o token de verificação está correto
2. Certifique-se de que o webhook está acessível (HTTPS)
3. Verifique os logs para erros

### Erro ao enviar mensagens

1. Valide o token de acesso
2. Verifique o ID do número de telefone
3. Certifique-se de que o número está registrado na conta WhatsApp Business

## 📄 Licença

MIT

## 👤 Autor

ms2127664-bit
