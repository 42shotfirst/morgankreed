// Simple form emailer utility functions

export interface EmailData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

// Option 1: PHP endpoint handler (recommended for GCP VM)
export const sendEmailViaPHP = async (data: EmailData) => {
  try {
    const response = await fetch('/api/send-email.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send message');
    }

    return result;
  } catch (error) {
    console.error('PHP email error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to send message via PHP');
  }
};

// Option 2: Simple client-side email handler (fallback)
export const sendEmailViaClient = (data: EmailData) => {
  const { name, email, message, subject = "Contact Form Message" } = data;
  
  const emailBody = `
From: ${name} (${email})
Subject: ${subject}

Message:
${message}

---
This message was sent from your portfolio contact form.
  `.trim();

  const mailtoLink = `mailto:morgan@morgankreed.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  
  window.open(mailtoLink, '_blank');
};

// Option 2: EmailJS integration (requires environment variables)
export const sendEmailViaEmailJS = async (data: EmailData) => {
  try {
    // Dynamically import EmailJS to avoid issues if not configured
    const emailjs = await import('@emailjs/browser');
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS environment variables not configured');
    }
    
    // Initialize EmailJS if not already done
    emailjs.init(publicKey);
    
    const result = await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: data.name,
        reply_to: data.email,
        subject: data.subject || 'Contact Form Message',
        message: data.message,
      },
      publicKey
    );
    
    return { success: true, result };
  } catch (error) {
    console.error('EmailJS error:', error);
    throw new Error('Failed to send email via EmailJS');
  }
};

// Option 3: Supabase integration (if you want to store messages in database)
export const saveMessageToSupabase = async (data: EmailData) => {
  try {
    const { supabase } = await import('./supabase');
    
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: data.name,
          email: data.email,
          subject: data.subject || 'Contact Form Message',
          message: data.message,
          created_at: new Date().toISOString(),
        }
      ]);
    
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Supabase error:', error);
    throw new Error('Failed to save message to database');
  }
};

// Main emailer function that tries different methods
export const sendContactMessage = async (data: EmailData) => {
  try {
    // Try PHP endpoint first (recommended for GCP VM)
    return await sendEmailViaPHP(data);
    
  } catch (phpError) {
    console.error('PHP email method failed:', phpError);
    
    // Fallback to EmailJS if configured
    try {
      if (import.meta.env.VITE_EMAILJS_SERVICE_ID) {
        return await sendEmailViaEmailJS(data);
      }
    } catch (emailjsError) {
      console.error('EmailJS fallback failed:', emailjsError);
    }
    
    // Final fallback to client-side email
    try {
      sendEmailViaClient(data);
      return { success: true, method: 'client_fallback' };
    } catch (fallbackError) {
      console.error('All email methods failed:', fallbackError);
      throw new Error('Unable to send message. Please try contacting directly at morgan@morgankreed.com');
    }
  }
};
