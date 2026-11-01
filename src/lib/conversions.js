export const conversions = [
	{
		slug: 'json-to-csv',
		from: 'json',
		to: 'csv',
		fromName: 'JSON',
		toName: 'CSV',
		title: 'Convert JSON to CSV Online — Free & Fast | SAM Data Formatter',
		description: 'Convert JSON arrays or nested objects to CSV tables instantly in your browser. 100% free, private client-side conversion — no files uploaded. Download or copy CSV data.',
		h1: 'JSON to CSV Converter',
		summary: 'Transform JSON datasets into clean, tabular CSV format in real time. Runs 100% client-side for total privacy.',
		keywords: ['json to csv', 'convert json to csv', 'json to csv converter', 'json to csv online', 'free json to csv converter'],
		whyUse: [
			{ title: '100% Private & In-Browser', desc: 'Your JSON data never touches a remote server. All parsing, transformation, and CSV generation occur locally on your machine.' },
			{ title: 'Smart Object Flattening', desc: 'Handles arrays of objects, nested JSON properties, and heterogeneous keys cleanly by auto-detecting all column headers.' },
			{ title: 'Instant Export & Copy', desc: 'Download standard RFC 4180 compliant .csv files ready for Microsoft Excel, Google Sheets, or your database in one click.' }
		],
		steps: [
			{ step: '1', title: 'Paste or Upload JSON', desc: 'Paste your raw JSON array/object into the input area or upload a .json file.' },
			{ step: '2', title: 'Click Convert Data', desc: 'The parser validates the JSON and creates structured tabular rows instantly.' },
			{ step: '3', title: 'Copy or Download CSV', desc: 'Copy the CSV text directly to your clipboard or download a .csv file.' }
		],
		faqs: [
			{ q: 'Is my JSON data uploaded to any server?', a: 'No. SAM Data Formatter operates 100% inside your web browser using JavaScript. No network requests are made with your data.' },
			{ q: 'Can this tool handle nested JSON objects?', a: 'Yes. Nested objects and arrays are intelligently inspected and serialized into clean column representations.' },
			{ q: 'Can I open the resulting CSV in Microsoft Excel or Google Sheets?', a: 'Yes. The output is formatted according to standard CSV specifications and opens seamlessly in Excel, Google Sheets, LibreOffice, and SQL databases.' },
			{ q: 'Is there a limit on how much JSON I can convert?', a: 'There are no artificial limits. Because it runs locally on your computer, you can process thousands of records in seconds.' }
		]
	},
	{
		slug: 'csv-to-json',
		from: 'csv',
		to: 'json',
		fromName: 'CSV',
		toName: 'JSON',
		title: 'Convert CSV to JSON Online — Free & Fast | SAM Data Formatter',
		description: 'Convert CSV files or text to structured JSON online. Smart type detection for numbers, booleans, and strings. 100% private, browser-based, and free.',
		h1: 'CSV to JSON Converter',
		summary: 'Convert Comma-Separated Values (CSV) into clean, formatted JSON arrays and objects with automatic type parsing.',
		keywords: ['csv to json', 'convert csv to json', 'csv to json converter', 'csv to json online', 'free csv to json converter'],
		whyUse: [
			{ title: 'Intelligent Type Inference', desc: 'Automatically recognizes numbers, booleans ("true"/"false"), and nested JSON strings so your JSON has proper data types instead of plain strings.' },
			{ title: 'Robust Delimiter & Quote Handling', desc: 'Supports multiline values, escaped double quotes, and commas inside cells according to CSV standards.' },
			{ title: 'Zero Server Uploads', desc: 'Process sensitive spreadsheets, user lists, and financial datasets safely on your local device.' }
		],
		steps: [
			{ step: '1', title: 'Paste or Upload CSV', desc: 'Paste your CSV rows (with headers on the first line) or drop a .csv file.' },
			{ step: '2', title: 'Click Convert Data', desc: 'The engine parses headers and rows into an array of structured JSON objects.' },
			{ step: '3', title: 'Copy or Download JSON', desc: 'Copy the beautified JSON with 2-space indentation or download the .json file.' }
		],
		faqs: [
			{ q: 'Does this converter preserve numbers and boolean types?', a: 'Yes. Numeric values and boolean strings (true/false) are automatically cast to native JSON numbers and booleans.' },
			{ q: 'What happens if a CSV field has commas or line breaks?', a: 'Properly quoted fields with commas or internal line breaks are fully parsed according to RFC 4180 rules.' },
			{ q: 'Is my CSV data kept private?', a: 'Yes, 100%. Nothing is sent across the internet; your browser handles all computation.' }
		]
	},
	{
		slug: 'json-to-xml',
		from: 'json',
		to: 'xml',
		fromName: 'JSON',
		toName: 'XML',
		title: 'Convert JSON to XML Online — Free & Fast | SAM Data Formatter',
		description: 'Convert JSON data to clean, well-formed XML in your browser. Automatic tag sanitization and XML encoding. Free, instant, and private converter.',
		h1: 'JSON to XML Converter',
		summary: 'Transform JSON data structures into standard, valid XML documents with proper tag escaping and root hierarchies.',
		keywords: ['json to xml', 'convert json to xml', 'json to xml converter', 'json to xml online', 'free json to xml converter'],
		whyUse: [
			{ title: 'Standards-Compliant XML', desc: 'Generates valid XML with UTF-8 declaration and safe XML tag names matching XML 1.0 recommendations.' },
			{ title: 'Proper Entity Escaping', desc: 'Special characters (&, <, >, ", \') are automatically converted to corresponding XML entities to prevent parser errors.' },
			{ title: 'Private & Secure', desc: 'Ideal for API payloads and enterprise feeds without risking data leakage to third-party servers.' }
		],
		steps: [
			{ step: '1', title: 'Input JSON', desc: 'Paste your JSON object or array, or upload a .json file.' },
			{ step: '2', title: 'Convert', desc: 'Click "Convert data" to generate formatted XML with proper hierarchy.' },
			{ step: '3', title: 'Save XML', desc: 'Download your .xml file or copy it straight to your clipboard.' }
		],
		faqs: [
			{ q: 'How are special characters handled in tag names?', a: 'Any characters invalid in XML tag names are safely replaced with underscores to guarantee valid XML.' },
			{ q: 'Is the generated XML well-formed?', a: 'Yes. It includes standard XML declarations and properly matched opening and closing tags.' }
		]
	},
	{
		slug: 'xml-to-json',
		from: 'xml',
		to: 'json',
		fromName: 'XML',
		toName: 'JSON',
		title: 'Convert XML to JSON Online — Free & Fast | SAM Data Formatter',
		description: 'Convert XML files or code to clean JSON in real-time. Parses elements and attributes into structured JSON objects. Free, private, and secure.',
		h1: 'XML to JSON Converter',
		summary: 'Convert hierarchical XML feeds, SOAP payloads, and XML files into clean, readable JSON format.',
		keywords: ['xml to json', 'convert xml to json', 'xml to json converter', 'xml to json online', 'free xml to json converter'],
		whyUse: [
			{ title: 'DOM-Based Precision', desc: 'Uses browser-native XML DOM parsing for 100% accurate node, element, and text content extraction.' },
			{ title: 'Handles Repeating Nodes', desc: 'Repeating elements with matching tag names are converted into clean JSON arrays.' },
			{ title: 'Instant Type Refinement', desc: 'Numeric and boolean values within XML text nodes are intelligently typed in the resulting JSON.' }
		],
		steps: [
			{ step: '1', title: 'Paste XML Code', desc: 'Paste raw XML or upload an .xml file into the converter.' },
			{ step: '2', title: 'Transform to JSON', desc: 'Click "Convert data" to parse the XML tree into structured JSON.' },
			{ step: '3', title: 'Copy or Download', desc: 'Easily copy the indented JSON or download it as a .json file.' }
		],
		faqs: [
			{ q: 'What happens if my XML has syntax errors?', a: 'The built-in parser will notify you with a clear error message pointing out the syntax issue.' },
			{ q: 'Can I convert large XML files?', a: 'Yes, modern browser engines can easily parse multi-megabyte XML files in milliseconds.' }
		]
	},
	{
		slug: 'json-to-excel',
		from: 'json',
		to: 'excel',
		fromName: 'JSON',
		toName: 'Excel (.xlsx)',
		title: 'Convert JSON to Excel (.xlsx) Online — Free & Fast | SAM Data Formatter',
		description: 'Convert JSON to real Microsoft Excel (.xlsx) spreadsheets instantly in your browser. Generates native Excel workbooks with columns and rows. Zero uploads.',
		h1: 'JSON to Excel Converter',
		summary: 'Convert JSON arrays into real Microsoft Excel (.xlsx) workbooks directly in your browser without software installations.',
		keywords: ['json to excel', 'convert json to excel', 'json to xlsx', 'json to excel converter', 'json to xlsx online'],
		whyUse: [
			{ title: 'Native .xlsx Workbook Generation', desc: 'Generates real OpenXML (.xlsx) files with worksheets and shared strings that open smoothly in Excel 2007 through Microsoft 365.' },
			{ title: 'Copy Table directly to Excel', desc: 'Copy formatted tabular data to clipboard to paste directly into an open spreadsheet, or download the workbook.' },
			{ title: 'Private & Secure for Sensitive Data', desc: 'Confidential business JSON data stays completely on your computer.' }
		],
		steps: [
			{ step: '1', title: 'Provide JSON Data', desc: 'Paste your JSON data or upload a .json file.' },
			{ step: '2', title: 'Generate Excel Workbook', desc: 'Hit "Convert data" to compile the JSON structure into an .xlsx spreadsheet.' },
			{ step: '3', title: 'Download .xlsx', desc: 'Download the generated Excel workbook or copy the tabular rows to paste into Excel.' }
		],
		faqs: [
			{ q: 'Is the downloaded file a real .xlsx file or just CSV renamed?', a: 'It is a genuine Microsoft OpenXML (.xlsx) zip-compressed workbook package, not a renamed CSV.' },
			{ q: 'Does it work with Google Sheets and LibreOffice Calc?', a: 'Yes. Any modern spreadsheet program that supports .xlsx can open the generated file.' }
		]
	},
	{
		slug: 'excel-to-json',
		from: 'excel',
		to: 'json',
		fromName: 'Excel (.xlsx)',
		toName: 'JSON',
		title: 'Convert Excel (.xlsx) to JSON Online — Free & Fast | SAM Data Formatter',
		description: 'Convert Excel (.xlsx) files or pasted sheets to JSON online. Fast client-side parsing with type inference for numbers, booleans, and text. Completely free.',
		h1: 'Excel to JSON Converter',
		summary: 'Extract structured JSON from Excel (.xlsx) spreadsheets or pasted tables in seconds.',
		keywords: ['excel to json', 'convert excel to json', 'xlsx to json', 'excel to json converter', 'xlsx to json online'],
		whyUse: [
			{ title: 'Reads Native .xlsx Files', desc: 'Upload your .xlsx spreadsheet directly or paste copied cells from Excel or Google Sheets.' },
			{ title: 'Automatic Column Header Mapping', desc: 'The first row of your sheet is automatically mapped as object keys in the resulting JSON.' },
			{ title: 'Smart Type Detection', desc: 'Preserves numbers, booleans, and serialized JSON values inside spreadsheet cells.' }
		],
		steps: [
			{ step: '1', title: 'Upload .xlsx or Paste Cells', desc: 'Upload an .xlsx file or paste tabular copied cells into the input area.' },
			{ step: '2', title: 'Convert to JSON', desc: 'Click "Convert data" to process sheet records into JSON.' },
			{ step: '3', title: 'Export JSON', desc: 'Copy the formatted JSON or save it to your disk.' }
		],
		faqs: [
			{ q: 'Can I upload password-protected Excel files?', a: 'Password-protected workbooks cannot be decrypted in-browser; please remove password protection before uploading.' },
			{ q: 'Which Excel worksheet is parsed?', a: 'The converter extracts data from the primary worksheet in your workbook.' }
		]
	},
	{
		slug: 'csv-to-xml',
		from: 'csv',
		to: 'xml',
		fromName: 'CSV',
		toName: 'XML',
		title: 'Convert CSV to XML Online — Free & Fast | SAM Data Formatter',
		description: 'Convert CSV spreadsheets to structured XML records instantly. Free, secure client-side CSV to XML conversion without uploading any data.',
		h1: 'CSV to XML Converter',
		summary: 'Convert flat CSV files and tabular spreadsheets into clean, structured XML documents for systems integration.',
		keywords: ['csv to xml', 'convert csv to xml', 'csv to xml converter', 'csv to xml online', 'free csv to xml converter'],
		whyUse: [
			{ title: 'Clean Tag Generation', desc: 'CSV headers are sanitized into valid XML tags, wrapping each row in standardized record elements.' },
			{ title: 'Safe Character Escaping', desc: 'Guarantees valid XML output even when CSV cells contain ampersands, quotes, or angle brackets.' },
			{ title: 'Fast Client-Side Processing', desc: 'Convert large CSV files without server timeouts or bandwidth limitations.' }
		],
		steps: [
			{ step: '1', title: 'Enter CSV Data', desc: 'Paste your CSV records or upload a .csv file.' },
			{ step: '2', title: 'Transform to XML', desc: 'Click "Convert data" to generate the XML document.' },
			{ step: '3', title: 'Export XML', desc: 'Download the .xml file or copy the XML code.' }
		],
		faqs: [
			{ q: 'What does the XML structure look like?', a: 'Data is wrapped in a root <data> tag with individual <row> entries containing tags named after your CSV column headers.' },
			{ q: 'Is there any fee or account required?', a: 'No, SAM Data Formatter is completely free to use with no login required.' }
		]
	},
	{
		slug: 'xml-to-csv',
		from: 'xml',
		to: 'csv',
		fromName: 'XML',
		toName: 'CSV',
		title: 'Convert XML to CSV Online — Free & Fast | SAM Data Formatter',
		description: 'Convert XML data to CSV format online. Flattens XML tree structures into tabular rows and columns for Excel and Google Sheets. Free and private.',
		h1: 'XML to CSV Converter',
		summary: 'Extract tabular CSV files from hierarchical XML records. Open your XML data easily in Microsoft Excel or Google Sheets.',
		keywords: ['xml to csv', 'convert xml to csv', 'xml to csv converter', 'xml to csv online', 'free xml to csv converter'],
		whyUse: [
			{ title: 'Flattens XML Trees into Rows', desc: 'Extracts repeated elements into structured tabular rows with standardized column headers.' },
			{ title: 'RFC 4180 Compliant', desc: 'Properly escapes quotes, commas, and multiline text in CSV fields.' },
			{ title: 'Completely Client-Side', desc: 'Your confidential XML feeds and datasets remain strictly on your computer.' }
		],
		steps: [
			{ step: '1', title: 'Supply XML Data', desc: 'Paste your XML text or upload an .xml file.' },
			{ step: '2', title: 'Convert', desc: 'Click "Convert data" to compile the XML nodes into CSV format.' },
			{ step: '3', title: 'Save CSV', desc: 'Copy the CSV or download it to open in Excel or your analytics tools.' }
		],
		faqs: [
			{ q: 'How does it decide which XML tags become column headers?', a: 'It inspects the child nodes of your XML records and compiles a unified list of unique column headers.' },
			{ q: 'Is my data private?', a: 'Yes. All parsing happens locally in your browser.' }
		]
	},
	{
		slug: 'csv-to-excel',
		from: 'csv',
		to: 'excel',
		fromName: 'CSV',
		toName: 'Excel (.xlsx)',
		title: 'Convert CSV to Excel (.xlsx) Online — Free & Fast | SAM Data Formatter',
		description: 'Convert CSV files to native Excel (.xlsx) workbooks online. Creates formatted Excel spreadsheets directly in your browser. Free & no upload needed.',
		h1: 'CSV to Excel Converter',
		summary: 'Convert Comma-Separated Values into genuine Microsoft Excel (.xlsx) workbooks in your browser.',
		keywords: ['csv to excel', 'convert csv to excel', 'csv to xlsx', 'csv to excel converter', 'csv to xlsx online'],
		whyUse: [
			{ title: 'Real .xlsx Workbook Format', desc: 'Generates proper OpenXML (.xlsx) files without Microsoft Excel installed.' },
			{ title: 'Clipboard & File Support', desc: 'Copy formatted HTML table data straight to your clipboard or download the .xlsx file.' },
			{ title: 'Zero File Size Wait', desc: 'Instant local conversion without slow cloud uploads.' }
		],
		steps: [
			{ step: '1', title: 'Paste or Upload CSV', desc: 'Input your CSV text or upload a .csv file.' },
			{ step: '2', title: 'Convert to Excel', desc: 'Click "Convert data" to create the Excel workbook.' },
			{ step: '3', title: 'Download .xlsx', desc: 'Save the .xlsx file to your computer or copy the formatted table.' }
		],
		faqs: [
			{ q: 'Why convert CSV to Excel (.xlsx)?', a: '.xlsx files avoid delimiter ambiguity, preserve formatting, and open cleanly in Excel without regional delimiter issues.' },
			{ q: 'Can I copy directly into an existing Excel spreadsheet?', a: 'Yes! The copy button puts formatted HTML table data onto your clipboard for seamless paste into Excel.' }
		]
	},
	{
		slug: 'excel-to-csv',
		from: 'excel',
		to: 'csv',
		fromName: 'Excel (.xlsx)',
		toName: 'CSV',
		title: 'Convert Excel (.xlsx) to CSV Online — Free & Fast | SAM Data Formatter',
		description: 'Convert Microsoft Excel (.xlsx) workbooks to CSV format in your browser. Clean comma-separated exports ready for databases and spreadsheets.',
		h1: 'Excel to CSV Converter',
		summary: 'Quickly export clean, standardized CSV files from Excel (.xlsx) spreadsheets and pasted tables.',
		keywords: ['excel to csv', 'convert excel to csv', 'xlsx to csv', 'excel to csv converter', 'xlsx to csv online'],
		whyUse: [
			{ title: 'Browser-Based XLSX Parser', desc: 'Upload your .xlsx file directly without needing Excel or any desktop software installed.' },
			{ title: 'Clean RFC 4180 CSV Output', desc: 'Produces standardized CSV formatted for smooth database imports (PostgreSQL, MySQL, SQLite, Snowflake).' },
			{ title: 'Safe for Confidential Spreadsheets', desc: 'Financial data and customer records never leave your browser.' }
		],
		steps: [
			{ step: '1', title: 'Upload Excel File', desc: 'Upload an .xlsx workbook or paste a copied sheet table.' },
			{ step: '2', title: 'Convert', desc: 'Click "Convert data" to generate clean CSV lines.' },
			{ step: '3', title: 'Download CSV', desc: 'Copy or download your new .csv file.' }
		],
		faqs: [
			{ q: 'Does it support large Excel spreadsheets?', a: 'Yes, thousands of rows can be processed in seconds directly on your device.' },
			{ q: 'Are special characters and commas handled properly?', a: 'Yes, cells with commas or line breaks are properly quoted.' }
		]
	},
	{
		slug: 'xml-to-excel',
		from: 'xml',
		to: 'excel',
		fromName: 'XML',
		toName: 'Excel (.xlsx)',
		title: 'Convert XML to Excel (.xlsx) Online — Free & Fast | SAM Data Formatter',
		description: 'Convert XML data to Excel (.xlsx) spreadsheets instantly. Transforms XML hierarchy into organized spreadsheet rows. 100% private in-browser.',
		h1: 'XML to Excel Converter',
		summary: 'Transform XML data files directly into downloadable Microsoft Excel (.xlsx) workbooks in seconds.',
		keywords: ['xml to excel', 'convert xml to excel', 'xml to xlsx', 'xml to excel converter', 'xml to xlsx online'],
		whyUse: [
			{ title: 'Direct XML to XLSX', desc: 'Skip intermediary steps: convert XML feeds directly into native Microsoft Excel spreadsheets.' },
			{ title: 'Automated Header Detection', desc: 'Detects XML tag names and organizes them into neat spreadsheet column headers.' },
			{ title: '100% In-Browser Privacy', desc: 'Enterprise data, invoices, and XML records are kept safe on your computer.' }
		],
		steps: [
			{ step: '1', title: 'Add XML Data', desc: 'Paste your XML text or drop an .xml file.' },
			{ step: '2', title: 'Convert to Excel', desc: 'Click "Convert data" to generate the .xlsx workbook.' },
			{ step: '3', title: 'Download Workbook', desc: 'Download the .xlsx file or copy the table to your clipboard.' }
		],
		faqs: [
			{ q: 'Does it produce a real .xlsx file?', a: 'Yes, it compiles a true Microsoft OpenXML spreadsheet file.' },
			{ q: 'Will it work with Google Sheets?', a: 'Yes, you can upload the .xlsx file straight into Google Sheets.' }
		]
	},
	{
		slug: 'excel-to-xml',
		from: 'excel',
		to: 'xml',
		fromName: 'Excel (.xlsx)',
		toName: 'XML',
		title: 'Convert Excel (.xlsx) to XML Online — Free & Fast | SAM Data Formatter',
		description: 'Convert Excel (.xlsx) workbooks or pasted tables to XML online. Generates clean, well-formed XML nodes from spreadsheet rows. Free & private.',
		h1: 'Excel to XML Converter',
		summary: 'Transform Excel (.xlsx) rows and columns into clean, well-formed XML records ready for data interchange.',
		keywords: ['excel to xml', 'convert excel to xml', 'xlsx to xml', 'excel to xml converter', 'xlsx to xml online'],
		whyUse: [
			{ title: 'Generates Valid XML Tags', desc: 'Excel headers are converted into safe, valid XML tag names automatically.' },
			{ title: 'XML Entity Escaping', desc: 'Text cells containing special characters are safely escaped for XML 1.0 compliance.' },
			{ title: 'Fast & Private', desc: 'Convert confidential workbooks without uploading files to remote web servers.' }
		],
		steps: [
			{ step: '1', title: 'Input Excel Data', desc: 'Upload an .xlsx file or paste spreadsheet cells into the input area.' },
			{ step: '2', title: 'Convert to XML', desc: 'Click "Convert data" to produce the XML hierarchy.' },
			{ step: '3', title: 'Export XML', desc: 'Download the generated .xml file or copy it to your clipboard.' }
		],
		faqs: [
			{ q: 'What does the XML structure look like?', a: 'Each row is converted into a <row> element with child elements named after the spreadsheet columns.' },
			{ q: 'Is my data secure?', a: 'Yes. Conversion takes place entirely within your browser.' }
		]
	}
];

export function getConversionBySlug(slug) {
	return conversions.find(c => c.slug === slug);
}

export function getRelatedConversions(currentSlug, limit = 6) {
	return conversions.filter(c => c.slug !== currentSlug).slice(0, limit);
}

