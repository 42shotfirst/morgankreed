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
    // In development, use the client-side fallback since PHP isn't available
    if (import.meta.env.DEV) {
      console.log('Development mode: Using client-side email fallback');
      sendEmailViaClient(data);
      return { success: true, method: 'client_dev' };
    }

    const response = await fetch('/api/send-email.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if response is HTML (server error) instead of JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Server returned HTML instead of JSON:', text.substring(0, 200));
      throw new Error('Server configuration error - PHP not executing properly');
    }

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

// EmailJS function removed to prevent errors

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
    
    // Fallback to client-side email (no EmailJS to avoid errors)
    try {
      sendEmailViaClient(data);
      return { success: true, method: 'client_fallback' };
    } catch (fallbackError) {
      console.error('All email methods failed:', fallbackError);
      throw new Error('Unable to send message. Please try contacting directly at morgan@morgankreed.com');
    }
  }
};
