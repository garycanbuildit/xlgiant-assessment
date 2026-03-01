/**
 * xlGIANT - Business Automation Assessment
 * Google Apps Script Web App
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com and create a new project
 * 2. Paste this entire file into the editor
 * 3. Update SHEET_ID below with your Google Sheet ID
 *    (found in the sheet URL: docs.google.com/spreadsheets/d/SHEET_ID/edit)
 * 4. Click Deploy > New Deployment > Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL and paste it into index.html as GOOGLE_SHEET_URL
 */

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Responses';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME)
      || SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);

    // Write headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Email',
        'Business Name',
        'Score (%)',
        'Tier',
        'Total Points',
        'Q1 Answer', 'Q1 Points',
        'Q2 Answer', 'Q2 Points',
        'Q3 Answer', 'Q3 Points',
        'Q4 Answer', 'Q4 Points',
        'Q5 Answer', 'Q5 Points',
        'Q6 Answer', 'Q6 Points',
        'Q7 Answer', 'Q7 Points',
        'Q8 Answer', 'Q8 Points',
        'Q9 Answer', 'Q9 Points',
        'Q10 Answer', 'Q10 Points',
        'Q11 Answer', 'Q11 Points',
        'Q12 Answer', 'Q12 Points',
      ]);
      // Bold the header row
      sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight('bold');
    }

    // Build row
    const row = [
      data.timestamp || new Date().toISOString(),
      data.firstName || '',
      data.email || '',
      data.businessName || '',
      data.scorePercent || 0,
      data.tier || '',
    ];

    // Add each answer
    if (data.answers && Array.isArray(data.answers)) {
      data.answers.forEach(a => {
        row.push(a.answer || '', a.points || 0);
      });
    }

    sheet.appendRow(row);

    // Send personalized results email
    if (data.email) {
      let tierName = '';
      let videoUrl = '';
      let messageBody = '';

      if (data.tier === 'systemized') {
        tierName = 'Systemized';
        videoUrl = 'https://youtu.be/VqDMZLR30x4?si=K0Xbxvtt3n8IqRwF';
        messageBody = `You're Already Ahead — Let's Build on Your Strong Foundation.\n\nWith a score of ${data.totalPoints} out of 60, your business shows few operational leaks. You're running lean and systemized — now it's time to layer in advanced automation to compound your edge.`;
      } else if (data.tier === 'hidden') {
        tierName = 'Hidden Leaks';
        videoUrl = 'https://youtu.be/AURRyVY_XX8?si=1eCFd-je6MR6YefC';
        messageBody = `You Have Hidden Leaks — Here's How to Plug Them.\n\nWith a score of ${data.totalPoints} out of 60, your business has real leaks hiding in plain sight. You're losing time, revenue, and energy to manual processes that can be fixed with the right systems.`;
      } else {
        tierName = 'Scaling Ceiling';
        videoUrl = 'https://youtu.be/7JJBs4thC3s?si=qFklrq6q_vszzb2O';
        messageBody = `Your Business Has a Scaling Ceiling — Let's Break Through It.\n\nWith a score of ${data.totalPoints} out of 60, your business is heavily dependent on you and manual effort. The good news: every leak we identified is fixable.`;
      }

      const subject = `Your Automation Assessment Results: ${tierName}`;
      const body = `Hi ${data.firstName || 'there'},\n\nThank you for taking the Business Automation Assessment!\n\nHere are your results:\nScore: ${data.totalPoints} out of 60\nTier: ${tierName}\n\n${messageBody}\n\nWatch Gary break down your personalized next steps here: ${videoUrl}\n\nBest,\nThe xlGIANT Team`;

      try {
        MailApp.sendEmail({
          to: data.email,
          subject: subject,
          body: body
        });
      } catch (e) {
        Logger.log('Failed to send email to ' + data.email + ': ' + e.toString());
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - run this manually to verify sheet connection
function testConnection() {
  const sheet = SpreadsheetApp.openById(SHEET_ID);
  Logger.log('Connected to: ' + sheet.getName());
}

// Test function - run this manually to FORCE Google to ask for Email permissions!
function testEmail() {
  const testAddress = Session.getActiveUser().getEmail(); // Sends to your own Google account email
  if (!testAddress) {
    Logger.log('Could not determine your email. Please type it directly in the sendEmail call below.');
    // MailApp.sendEmail('your@email.com', 'Test Subject', 'Test Body');
    return;
  }

  MailApp.sendEmail({
    to: testAddress,
    subject: "xlGIANT - Email Authorization Test",
    body: "If you are reading this, your Google Apps Script is now officially authorized to send emails on your behalf!"
  });

  Logger.log('Test email sent to: ' + testAddress);
}
