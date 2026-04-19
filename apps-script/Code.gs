// Travel Planner - Google Apps Script Backend

// ===== 自动创建试算表 (Run this FIRST!) =====
function setup() {
  var ss = SpreadsheetApp.create('Travel Planner Data');
  
  // Members sheet
  var sh = ss.insertSheet('Members');
  sh.getRange('A1:E1').setValues([['id', 'name', 'avatarUrl', 'color', 'email']]);
  sh.getRange('A1:1').setFontWeight('bold');
  sh.setFrozenRows(1);
  
  // Schedule sheet
  sh = ss.insertSheet('Schedule');
  sh.getRange('A1:K1').setValues([['id', 'date', 'time', 'location', 'category', 'title', 'notes', 'mapUrl', 'photos', 'weather', 'temperature']]);
  sh.getRange('A1:1').setFontWeight('bold');
  sh.setFrozenRows(1);
  
  // Bookings sheet
  sh = ss.insertSheet('Bookings');
  sh.getRange('A1:O1').setValues([['id', 'type', 'title', 'details', 'imageUrl', 'pdfUrl', 'cost', 'currency', 'sharedBy', 'checkIn', 'checkOut', 'pickUpTime', 'dropOffTime', 'pickUpLocation', 'pinProtected']]);
  sh.getRange('A1:1').setFontWeight('bold');
  sh.setFrozenRows(1);
  
  // Expenses sheet
  sh = ss.insertSheet('Expenses');
  sh.getRange('A1:I1').setValues([['id', 'date', 'amount', 'currency', 'category', 'payer', 'splitAmong', 'notes']]);
  sh.getRange('A1:1').setFontWeight('bold');
  sh.setFrozenRows(1);
  
  // Journal sheet
  sh = ss.insertSheet('Journal');
  sh.getRange('A1:G1').setValues([['id', 'date', 'author', 'title', 'content', 'photos', 'location']]);
  sh.getRange('A1:1').setFontWeight('bold');
  sh.setFrozenRows(1);
  
  // Todos sheet
  sh = ss.insertSheet('Todos');
  sh.getRange('A1:F1').setValues([['id', 'title', 'assignedTo', 'isCompleted', 'category', 'dueDate']]);
  sh.getRange('A1:1').setFontWeight('bold');
  sh.setFrozenRows(1);
  
  // Delete default Sheet1
  try { ss.deleteSheet(ss.getSheetByName('Sheet1')); } catch(e) {}
  
  Logger.log('=== Travel Planner Data Created ===');
  Logger.log('Spreadsheet URL: ' + ss.getUrl());
  Logger.log('Spreadsheet ID: ' + ss.getSpreadsheetId());
  Logger.log('');
  Logger.log('NEXT STEPS:');
  Logger.log('1. Copy the Spreadsheet ID above');
  Logger.log('2. Replace "YOUR_SPREADSHEET_ID" in this file');
  Logger.log('3. Deploy as Web App (Deploy > New deployment > Web app)');
  Logger.log('4. Copy the Web App URL to src/hooks/useGoogleSheets.ts');
}

// ===== 替换为你的试算表 ID =====
var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

// ===== API Endpoints =====
function doGet(e) {
  try {
    if (e.parameter.action === 'get') {
      var data = getSheetData(e.parameter.sheet);
      return ContentService.createTextOutput(JSON.stringify({ values: data }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var postData = JSON.parse(e.postData.contents);
    if (e.parameter.action === 'update') {
      var result = updateSheetData(postData.sheet, postData.data);
      return ContentService.createTextOutput(JSON.stringify({ success: result }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    if (e.parameter.action === 'append') {
      var result = appendRow(postData.sheet, postData.row);
      return ContentService.createTextOutput(JSON.stringify({ success: result }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== Data Functions =====
function getSheetData(sheetName) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sh = ss.getSheetByName(sheetName);
  if (!sh) return [];
  
  var data = sh.getDataRange().getValues();
  var headers = data[0];
  
  return data.slice(1).map(function(row) {
    var obj = {};
    headers.forEach(function(h, i) { obj[h] = String(row[i] || ''); });
    return obj;
  });
}

function updateSheetData(sheetName, rows) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sh = ss.getSheetByName(sheetName);
  if (!sh) return false;
  
  var headers = sh.getRange('1:1').getValues()[0];
  var idIdx = headers.indexOf('id');
  if (idIdx === -1) return false;
  
  rows.forEach(function(row) {
    var id = row.id;
    var allRows = sh.getDataRange().getValues();
    
    for (var i = 1; i < allRows.length; i++) {
      if (allRows[i][idIdx] === id) {
        var newRow = headers.map(function(h) { return row[h] || ''; });
        sh.getRange(i + 1, 1, 1, headers.length).setValues([newRow]);
        return true;
      }
    }
    
    var newRow = headers.map(function(h) { return row[h] || ''; });
    sh.appendRow(newRow);
  });
  
  return true;
}

function appendRow(sheetName, row) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sh = ss.getSheetByName(sheetName);
  if (!sh) return false;
  
  sh.appendRow(Object.values(row));
  return true;
}

// ===== Test Function =====
function testConnection() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Logger.log('Connected to: ' + ss.getName());
  Logger.log('Sheets: ' + ss.getSheets().map(function(s) { return s.getName(); }).join(', '));
}