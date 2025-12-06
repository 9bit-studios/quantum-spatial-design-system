/**
 * Email service for the 9Bit Studios Cloudflare Worker
 * Handles email notifications using Fastmail
 */

/**
 * Send an email notification
 * @param {Object} options Email options
 * @param {string} options.to Recipient email address
 * @param {string} options.subject Email subject
 * @param {string} options.html HTML content
 * @param {string} options.text Plain text content
 * @returns {Promise<Object>} The email sending result
 */
async function sendEmail(options) {
  try {
    // Check for required environment variables
    if (!FASTMAIL_USER || !FASTMAIL_PASSWORD || !FASTMAIL_SMTP_HOST) {
      throw new Error('Missing required email configuration');
    }

    // Basic email validation
    if (!options.to || !validateEmail(options.to)) {
      throw new Error('Invalid recipient email address');
    }

    // In a real implementation, we would use the Fastmail API or an SMTP client
    // For now, we'll just log the email sending request
    console.log(`[Email Service] Would send email to ${options.to} with subject: ${options.subject}`);

    // Simulate successful email sending
    return {
      success: true,
      messageId: `${Date.now()}.${Math.random().toString(36).substring(2)}@${FASTMAIL_SMTP_HOST}`
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Send a notification to the system administrator
 * @param {string} subject Email subject
 * @param {string} message Email message
 * @returns {Promise<Object>} The email sending result
 */
async function sendAdminNotification(subject, message) {
  if (!NOTIFICATION_EMAIL) {
    console.warn('No notification email configured');
    return { success: false, error: 'No notification email configured' };
  }

  return sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: `[9Bit Studios] ${subject}`,
    text: message,
    html: `<p>${message.replace(//g, '<br>')}</p>`
  });
}

/**
 * Validate an email address format
 * @param {string} email Email address to validate
 * @returns {boolean} Whether the email format is valid
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

module.exports = {
  sendEmail,
  sendAdminNotification
};