import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const WEBHOOK_VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

/**
 * Middleware to verify webhook token from WhatsApp
 */
export function verifyWebhookToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (!token || !challenge) {
    logger.warn('Missing webhook verification parameters');
    res.status(403).json({ error: 'Missing verification parameters' });
    return;
  }

  if (token !== WEBHOOK_VERIFY_TOKEN) {
    logger.warn('Invalid webhook verification token');
    res.status(403).json({ error: 'Invalid verification token' });
    return;
  }

  next();
}
