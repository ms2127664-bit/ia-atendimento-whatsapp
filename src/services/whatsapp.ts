import axios from 'axios';
import logger from '../utils/logger';

const WHATSAPP_API_URL = 'https://graph.instagram.com/v18.0';
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

interface WhatsAppMessage {
  from: string;
  id: string;
  timestamp: string;
  text?: {
    body: string;
  };
  type: string;
}

/**
 * Handle incoming WhatsApp messages
 */
export async function handleWebhookMessage(
  message: WhatsAppMessage,
  phoneNumberId: string
): Promise<void> {
  try {
    const senderPhone = message.from;
    const messageText = message.text?.body || '';

    logger.info(`Processing message from ${senderPhone}: ${messageText}`);

    // Extract the actual phone number ID if not provided
    const actualPhoneNumberId = PHONE_NUMBER_ID || phoneNumberId;

    // Simple response logic
    const response = generateResponse(messageText);

    // Send response back
    await sendMessage(senderPhone, response, actualPhoneNumberId);
  } catch (error) {
    logger.error('Error handling webhook message:', error);
  }
}

/**
 * Send a message via WhatsApp
 */
export async function sendMessage(
  recipientPhone: string,
  message: string,
  phoneNumberId: string
): Promise<void> {
  try {
    const url = `${WHATSAPP_API_URL}/${phoneNumberId}/messages`;

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipientPhone,
      type: 'text',
      text: {
        body: message,
      },
    };

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    logger.info(`✅ Message sent to ${recipientPhone}:`, response.data);
  } catch (error) {
    logger.error(`❌ Error sending message to ${recipientPhone}:`, error);
    throw error;
  }
}

/**
 * Generate a response based on user input
 * This is a simple implementation - can be extended with AI/NLP
 */
function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase().trim();

  // Simple pattern matching
  if (
    message.includes('oi') ||
    message.includes('olá') ||
    message.includes('ola')
  ) {
    return '👋 Olá! Bem-vindo ao nosso atendimento automático. Como posso ajudá-lo?';
  }

  if (
    message.includes('horário') ||
    message.includes('funciona') ||
    message.includes('atendimento')
  ) {
    return '🕐 Nosso atendimento funciona 24 horas por dia. Qual é sua dúvida?';
  }

  if (
    message.includes('preço') ||
    message.includes('valor') ||
    message.includes('custo')
  ) {
    return '💰 Para informações sobre preços, por favor, entre em contato com nosso time de vendas.';
  }

  if (message.includes('obrigado') || message.includes('valeu')) {
    return '😊 De nada! Fico feliz em ajudar. Há algo mais que eu possa fazer?';
  }

  // Default response
  return '👨‍💼 Entendi sua mensagem! Deixe-me transferir você para um atendente que poderá ajudá-lo melhor. Um momento, por favor...';
}
