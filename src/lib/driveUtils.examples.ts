/**
 * Google Drive URL Conversion Examples
 * 
 * This file demonstrates how to convert Google Drive sharing URLs
 * to different formats for use in your application.
 */

import {
  convertToDirectViewUrl,
  convertToThumbnailUrl,
  convertToPreviewUrl,
  convertToDownloadUrl,
  convertDriveUrlByType,
  extractDriveFileId
} from './driveUtils';

// Example Google Drive sharing URL
const exampleSharingUrl = 'https://drive.google.com/file/d/1p9M9wJfldyHdx00ImMoPxTZAb94rHSbI/view?usp=sharing';

console.log('=== Google Drive URL Conversion Examples ===\n');

// 1. Extract File ID
console.log('1. Extract File ID:');
console.log(`   Input:  ${exampleSharingUrl}`);
console.log(`   FileID: ${extractDriveFileId(exampleSharingUrl)}`);
console.log('');

// 2. Convert to Direct View URL (Best for images in <img> tags)
console.log('2. Direct View URL (Recommended for images):');
console.log(`   ${convertToDirectViewUrl(exampleSharingUrl)}`);
console.log('   Use: <img src="..."/>\n');

// 3. Convert to Thumbnail URL (For optimized image loading)
console.log('3. Thumbnail URL (For thumbnails/previews):');
console.log(`   ${convertToThumbnailUrl(exampleSharingUrl, 500)}`);
console.log('   Use: Small previews, gallery thumbnails\n');

// 4. Convert to Preview URL (For videos and PDFs in iframe)
console.log('4. Preview/Embed URL (For videos/PDFs):');
console.log(`   ${convertToPreviewUrl(exampleSharingUrl)}`);
console.log('   Use: <iframe src="..."></iframe>\n');

// 5. Convert to Download URL (For downloadable files)
console.log('5. Download URL:');
console.log(`   ${convertToDownloadUrl(exampleSharingUrl)}`);
console.log('   Use: Download links, PDFs\n');

// 6. Smart conversion based on type
console.log('6. Smart Conversion by Type:');
console.log(`   Image: ${convertDriveUrlByType(exampleSharingUrl, 'image')}`);
console.log(`   Video: ${convertDriveUrlByType(exampleSharingUrl, 'video')}`);
console.log(`   PDF:   ${convertDriveUrlByType(exampleSharingUrl, 'pdf')}`);
console.log('');

console.log('=== Usage in Your Apps Script ===\n');
console.log(`
// In your Google Apps Script, you can convert URLs before sending to frontend:

function convertDriveUrl(sharingUrl) {
  const match = sharingUrl.match(/\\/d\\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const fileId = match[1];
    return \`https://drive.google.com/uc?export=view&id=\${fileId}\`;
  }
  return sharingUrl;
}

// Use in your doGet function:
function doGet(e) {
  const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  const processedData = data.map(row => {
    return row.map(cell => {
      if (typeof cell === 'string' && cell.includes('drive.google.com')) {
        return convertDriveUrl(cell);
      }
      return cell;
    });
  });
  
  return ContentService
    .createTextOutput(JSON.stringify({ assets: processedData }))
    .setMimeType(ContentService.MimeType.JSON);
}
`);

console.log('\n=== Troubleshooting 403 Errors ===\n');
console.log(`
1. ✓ URL Format: Use uc?export=view&id=FILE_ID
2. ✓ File Permissions: Set to "Anyone with the link can view"
3. ✓ File Sharing Settings:
   - Open file in Google Drive
   - Click "Share"
   - Click "Change to anyone with the link"
   - Set to "Viewer"
   
4. × Avoid: Plain sharing URLs (/file/d/ID/view?usp=sharing)
5. × Avoid: URLs that require authentication

If still getting 403:
- Check if file is still in Drive (not deleted)
- Verify file isn't in a restricted folder
- Try the thumbnail format: drive.google.com/thumbnail?id=FILE_ID&sz=w2000
- Consider using Apps Script proxy (see driveUtils.ts comments)
`);

export {}; // Make it a module
