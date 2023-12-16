import React from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

interface FileParserProps {
  onFileContentAvailable: (content: string) => void;
}

const FileParser: React.FC<FileParserProps> = ({ onFileContentAvailable }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const fileExt = file.name.split('.').pop();

    if (fileExt === 'csv') {
      parseCSV(file);
    } else if (fileExt === 'xlsx' || fileExt === 'xls') {
      parseExcel(file);
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      complete: (results) => {
        const data = results.data as string[][];
        const csvContent = data.map(row => row.join(',')).join('\n');
        onFileContentAvailable(csvContent);
      },
      header: false
    });
  };

  const parseExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const excelContent = (json as any[][]).map((row) => row.join(',')).join('\n');
      onFileContentAvailable(excelContent);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="file-parser">
      <label htmlFor="file-upload" className="file-upload-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-md">
        <path fillRule="evenodd" clipRule="evenodd" d="M11.2929 2.29289C11.6834 1.90237 12.3166 1.90237 12.7071 2.29289L16.7071 6.29289C17.0976 6.68342 17.0976 7.31658 16.7071 7.70711C16.3166 8.09763 15.6834 8.09763 15.2929 7.70711L13 5.41421V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V5.41421L8.70711 7.70711C8.31658 8.09763 7.68342 8.09763 7.29289 7.70711C6.90237 7.31658 6.90237 6.68342 7.29289 6.29289L11.2929 2.29289ZM4 13C4.55228 13 5 13.4477 5 14V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V14C3 13.4477 3.44772 13 4 13Z" fill="currentColor"></path>
        </svg>
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".csv, .xlsx, .xls"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileParser;
