// Travel Planner - Google Apps Script Backend
// 部署為 Web App 後，前端可透過 URL 存取

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // TODO: 替換為你的試算表 ID
const SHEET_NAMES = ['Members', 'Schedule', 'Bookings', 'Expenses', 'Journal', 'Todos'];

function doGet(e) {
  const action = e.parameter.action;
  const sheetName = e.parameter.sheet;
  
  try {
    if (action === 'get') {
      const data = getSheetData(sheetName);
      return ContentService.createTextOutput(JSON.stringify({ values: data }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  const action = e.parameter.action;
  const postData = JSON.parse(e.postData.contents);
  
  try {
    if (action === 'update') {
      const result = updateSheetData(postData.sheet, postData.data);
      return ContentService.createTextOutput(JSON.stringify({ success: result }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (action === 'append') {
      const result = appendRow(postData.sheet, postData.row);
      return ContentService.createTextOutput(JSON.stringify({ success: result }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheetData(sheetName) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    return [];
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = String(row[i] || '');
    });
    return obj;
  });
}

function updateSheetData(sheetName, data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    return false;
  }
  
  const headers = sheet.getRange('1:1').getValues()[0];
  const idIndex = headers.indexOf('id');
  
  if (idIndex === -1) {
    return false;
  }
  
  data.forEach(row => {
    const id = row.id;
    const existingRows = sheet.getDataRange().getValues();
    
    for (let i = 1; i < existingRows.length; i++) {
      if (existingRows[i][idIndex] === id) {
        const newRow = headers.map(h => row[h] || '');
        sheet.getRange(i + 1, 1, 1, headers.length).setValues([newRow]);
        return true;
      }
    }
    
    const newRow = headers.map(h => row[h] || '');
    sheet.appendRow(newRow);
  });
  
  return true;
}

function appendRow(sheetName, row) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    return false;
  }
  
  sheet.appendRow(Object.values(row));
  return true;
}

function createSheets() {
  const ss = SpreadsheetApp.create('Travel Planner Data');
  
  SHEET_NAMES.forEach(name => {
    ss.insertSheet(name);
    const sheet = ss.getSheetByName(name);
    
    switch (name) {
      case 'Members':
        sheet.getRange('A1:E1').setValues([['id', 'name', 'avatarUrl', 'color', 'email']]);
        break;
      case 'Schedule':
        sheet.getRange('A1:K1').setValues([['id', 'date', 'time', 'location', 'category', 'title', 'notes', 'mapUrl', 'photos', 'weather', 'temperature']]);
        break;
      case 'Bookings':
        sheet.getRange('A1:O').setValues([['id', 'type', 'title', 'details', 'imageUrl', 'pdfUrl', 'cost', 'currency', 'sharedBy', 'checkIn', 'checkOut', 'pickUpTime', 'dropOffTime', 'pickUpLocation', 'pinProtected']]);
        break;
      case 'Expenses':
        sheet.getRange('A1:I').setValues([['id', 'date', 'amount', 'currency', 'category', 'payer', 'splitAmong', 'notes']]);
        break;
      case 'Journal':
        sheet.getRange('A1:G').setValues([['id', 'date', 'author', 'title', 'content', 'photos', 'location']]);
        break;
      case 'Todos':
        sheet.getRange('A1:F').setValues([['id', 'title', 'assignedTo', 'isCompleted', 'category', 'dueDate']]);
        break;
    }
  });
  
  Logger.log('試算表已建立: ' + ss.getUrl());
}

function testApi() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Logger.log('試算表名稱: ' + ss.getName());
  Logger.log('工作表: ' + ss.getSheets().map(s => s.getName()).join(', '));
}