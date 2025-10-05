# Email Routing Guide

## 📧 Email Destination: `morgan@morgankreed.com`

All contact form submissions route to the same destination regardless of the method used.

## 🔄 Routing Paths

### **Development Mode** (localhost:5173)
```
User fills form → sendContactMessage() → sendEmailViaPHP() 
→ Detects DEV mode → sendEmailViaClient() → Opens email client
→ User's default email app → Sends to morgan@morgankreed.com
```

### **Production Mode** (morgankreed.com) - Current
```
User fills form → sendContactMessage() → sendEmailViaPHP() 
→ Fetches /api/send-email.php → Server error (405/HTML response)
→ Falls back to sendEmailViaClient() → Opens email client
→ User's default email app → Sends to morgan@morgankreed.com
```

### **Production Mode** (morgankreed.com) - After Server Fix
```
User fills form → sendContactMessage() → sendEmailViaPHP() 
→ Fetches /api/send-email.php → PHP mail() function
→ Server sends email directly → morgan@morgankreed.com
```

## 📍 Specific Code Locations

### PHP Email Handler (`api/send-email.php`):
```php
// Line 55
$to = 'morgan@morgankreed.com';
```

### Client-Side Fallback (`src/lib/emailer.ts`):
```typescript
// Line 64
const mailtoLink = `mailto:morgan@morgankreed.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
```

### From Email Address:
```php
// Line 58 in send-email.php
$from_email = 'noreply@' . ($_SERVER['HTTP_HOST'] ?? 'morgankreed.com');
```

## 📨 Email Content Examples

### Via PHP (Production - After Fix):
```
To: morgan@morgankreed.com
From: noreply@morgankreed.com
Subject: [Portfolio Contact] User's Subject

New message from your portfolio contact form:

Name: John Doe
Email: john@example.com
Subject: Project Inquiry

Message:
Hi Morgan, I'd like to discuss a potential project...

---
Sent from: morgankreed.com
IP Address: 123.456.789.0
Timestamp: 2024-01-15 14:30:25 PST
```

### Via Email Client (Development/Current Production):
```
To: morgan@morgankreed.com
From: User's actual email address
Subject: User's Subject

From: John Doe (john@example.com)
Subject: Project Inquiry

Message:
Hi Morgan, I'd like to discuss a potential project...

---
This message was sent from your portfolio contact form.
```

## 🔧 Server Configuration for Direct Email

### Required Server Setup:
1. **PHP mail() function** must be enabled
2. **SMTP server** configured (or sendmail)
3. **Domain DNS** properly configured for email

### Alternative SMTP Configuration:
If `mail()` doesn't work, you can configure SMTP in `send-email.php`:

```php
// Add PHPMailer or similar SMTP library
$mail->Host = 'smtp.gmail.com';  // or your SMTP server
$mail->Username = 'your-email@gmail.com';
$mail->Password = 'your-app-password';
$mail->setFrom('noreply@morgankreed.com', 'Portfolio Contact');
$mail->addAddress('morgan@morgankreed.com');
```

## 📊 Current Status

| Environment | Method | Status | Email Destination |
|-------------|--------|--------|-------------------|
| Development | Email Client | ✅ Working | morgan@morgankreed.com |
| Production (Current) | Email Client | ✅ Working | morgan@morgankreed.com |
| Production (After Fix) | PHP Direct | ⏳ Pending | morgan@morgankreed.com |

## 🎯 Summary

**All emails route to: `morgan@morgankreed.com`**

- **Currently**: Users' email clients send to you
- **After server fix**: Server sends directly to you
- **No change needed**: Email destination is correct
- **Better UX**: Direct sending eliminates email client popup
