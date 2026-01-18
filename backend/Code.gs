function doGet(e) {
  return handleRequest(e);
}

function doOptions(e) {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function handleRequest(e) {
  try {
    // Basic verification
    const validKey = '#@#@BIPIN@RCH#@#@'; // Replace with your actual key check logic or PropertyService
    if (e.parameter.key !== validKey) {
      return jsonResponse({ error: "Invalid API key" });
    }

    // Your main logic here...
    // Example:
    // const result = getData(); 
    // return jsonResponse(result);
    
    // Placeholder for actual data retrieval logic
    return jsonResponse({ message: "Success", data: "Your data here" });

  } catch (error) {
    return jsonResponse({ error: error.toString() });
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
