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
