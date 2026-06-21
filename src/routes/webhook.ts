import { Router, Request, Response } from 'express';
import logger from '../utils/logger';
import { handleWebhookMessage } from '../services/whatsapp';
import { verifyWebhookToken } from '../middleware/auth';

const router = Router();

// Webhook verification (GET)
router.get('/', verifyWebhookToken, (req: Request, res: Response) => {
  logger.info('Webhook verified successfully');
  res.status(200).send(req.query['hub.challenge']);
});

// Receive messages (POST)
router.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body;

    if (body.object) {
      if (
        body.entry &&
        body.entry[0].changes &&
        body.entry[0].changes[0].value.messages &&
        body.entry[0].changes[0].value.messages[0]
      ) {
        const message = body.entry[0].changes[0].value.messages[0];
        const phoneNumberId = body.entry[0].changes[0].value.metadata.phone_number_id;

        logger.info(`📨 Received message from ${message.from}:`, message);

        // Handle the message
        await handleWebhookMessage(message, phoneNumberId);

        res.status(200).send('EVENT_RECEIVED');
      } else {
        res.status(200).send('EVENT_RECEIVED');
      }
    } else {
      res.status(404).send('Invalid request');
    }
  } catch (error) {
    logger.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
