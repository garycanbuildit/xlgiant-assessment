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
    let ss;

    // Automatically use the attached spreadsheet if the explicit ID was forgotten
    if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
      ss = SpreadsheetApp.getActiveSpreadsheet();
      if (!ss) throw new Error("Script is not bound to a Sheet and no SHEET_ID provided.");
    } else {
      ss = SpreadsheetApp.openById(SHEET_ID);
    }

    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Write headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'First Name',
        'Email',
        'Business Name',
        'Score (%)',
        'Tier',
        'Total Points',
      ];

      // Dynamically add question text to headers if available
      if (data.answers && Array.isArray(data.answers)) {
        data.answers.forEach((a, index) => {
          const qNum = index + 1;
          headers.push(`Q${qNum}: ${a.question || 'Answer'}`);
          headers.push(`Q${qNum} Points`);
        });
      }

      sheet.appendRow(headers);
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
      data.totalPoints || 0,
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
    console.error('doPost Error:', err); // Let it appear in the Execution log!
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - run this manually to verify sheet connection
function testConnection() {
  let ss;
  if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
    ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) throw new Error("Script is not bound to a Sheet and no SHEET_ID provided.");
  } else {
    ss = SpreadsheetApp.openById(SHEET_ID);
  }
  Logger.log('Connected to: ' + ss.getName());
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
