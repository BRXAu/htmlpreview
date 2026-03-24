#target photoshop

var inputFolder = Folder.selectDialog("Select folder with PNGs");
var outputFolder = Folder.selectDialog("Select output folder");

var bgColorHex = "00DFED"; // changeable

function hexToRGB(hex) {
    var r = parseInt(hex.substring(0,2),16);
    var g = parseInt(hex.substring(2,4),16);
    var b = parseInt(hex.substring(4,6),16);
    return [r,g,b];
}

var rgb = hexToRGB(bgColorHex);

var files = inputFolder.getFiles("*.png");

for (var i = 0; i < files.length; i++) {
    var doc = open(files[i]);

    var baseName = doc.name.replace(/\.[^\.]+$/, "");

    // --- Create background layer ---
    var bgLayer = doc.artLayers.add();
    bgLayer.move(doc, ElementPlacement.PLACEATEND);

    var color = new SolidColor();
    color.rgb.red = rgb[0];
    color.rgb.green = rgb[1];
    color.rgb.blue = rgb[2];

    doc.selection.selectAll();
    doc.selection.fill(color);
    doc.selection.deselect();

    // Move bg to bottom
    bgLayer.move(doc.artLayers[doc.artLayers.length-1], ElementPlacement.PLACEAFTER);

    // --- Save JPEG version ---
    var jpegFile = new File(outputFolder + "/" + baseName + "_jpeg.jpg");

    var jpegOptions = new ExportOptionsSaveForWeb();
    jpegOptions.format = SaveDocumentType.JPEG;
    jpegOptions.quality = 10;

    doc.exportDocument(jpegFile, ExportType.SAVEFORWEB, jpegOptions);

    // --- Mask version ---
    var topLayer = doc.artLayers[0];
    doc.activeLayer = topLayer;

    // Exposure -20 (approx via levels workaround)
    var idExp = stringIDToTypeID("exposure");
    var desc = new ActionDescriptor();
    desc.putDouble(stringIDToTypeID("exposure"), -20);
    desc.putDouble(stringIDToTypeID("offset"), 0);
    desc.putDouble(stringIDToTypeID("gammaCorrection"), 1);
    executeAction(idExp, desc, DialogModes.NO);

    // Invert
    doc.activeLayer.invert();

    // Select bottom layer
    doc.activeLayer = bgLayer;

    // Fill black
    var black = new SolidColor();
    black.rgb.red = 0;
    black.rgb.green = 0;
    black.rgb.blue = 0;

    doc.selection.selectAll();
    doc.selection.fill(black);
    doc.selection.deselect();

    // Save mask
    var maskFile = new File(outputFolder + "/" + baseName + "_mask.jpg");
    doc.exportDocument(maskFile, ExportType.SAVEFORWEB, jpegOptions);

    // Close without saving
    doc.close(SaveOptions.DONOTSAVECHANGES);
}

alert("Batch complete.");