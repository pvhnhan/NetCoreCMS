import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export interface ExportOptions {
  filename?: string;
  sheetName?: string;
  headers?: string[];
  dateFormat?: string;
}

export interface ImportOptions {
  sheetName?: string;
  headers?: string[];
  skipRows?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExportImportService {
  
  /**
   * Export data to Excel file
   */
  exportToExcel(data: any[], options: ExportOptions = {}): void {
    const {
      filename = 'export.xlsx',
      sheetName = 'Sheet1',
      headers = [],
      dateFormat = 'DD/MM/YYYY'
    } = options;
    
    try {
      // Prepare data for export
      const exportData = this.prepareDataForExport(data, headers);
      
      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      
      // Set column widths
      const columnWidths = this.calculateColumnWidths(exportData);
      worksheet['!cols'] = columnWidths;
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      
      // Generate and download file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, filename);
      
    } catch (error) {
      console.error('Export to Excel failed:', error);
      throw new Error('Không thể xuất file Excel');
    }
  }
  
  /**
   * Export data to CSV file
   */
  exportToCSV(data: any[], options: ExportOptions = {}): void {
    const {
      filename = 'export.csv',
      headers = []
    } = options;
    
    try {
      // Prepare data for export
      const exportData = this.prepareDataForExport(data, headers);
      
      // Convert to CSV
      const csvContent = this.convertToCSV(exportData);
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, filename);
      
    } catch (error) {
      console.error('Export to CSV failed:', error);
      throw new Error('Không thể xuất file CSV');
    }
  }
  
  /**
   * Import data from Excel file
   */
  async importFromExcel(file: File, options: ImportOptions = {}): Promise<any[]> {
    const {
      sheetName = 'Sheet1',
      headers = [],
      skipRows = 0
    } = options;
    
    try {
      const arrayBuffer = await this.readFileAsArrayBuffer(file);
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      // Get worksheet
      const worksheet = workbook.Sheets[sheetName] || workbook.Sheets[workbook.SheetNames[0]];
      if (!worksheet) {
        throw new Error('Không tìm thấy worksheet');
      }
      
      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Process data
      return this.processImportedData(jsonData, headers, skipRows);
      
    } catch (error) {
      console.error('Import from Excel failed:', error);
      throw new Error('Không thể đọc file Excel');
    }
  }
  
  /**
   * Import data from CSV file
   */
  async importFromCSV(file: File, options: ImportOptions = {}): Promise<any[]> {
    const {
      headers = [],
      skipRows = 0
    } = options;
    
    try {
      const text = await this.readFileAsText(file);
      const csvData = this.parseCSV(text);
      
      // Process data
      return this.processImportedData(csvData, headers, skipRows);
      
    } catch (error) {
      console.error('Import from CSV failed:', error);
      throw new Error('Không thể đọc file CSV');
    }
  }
  
  /**
   * Prepare data for export
   */
  private prepareDataForExport(data: any[], headers: string[]): any[] {
    if (headers.length > 0) {
      // Use provided headers
      return data.map(item => {
        const exportItem: any = {};
        headers.forEach(header => {
          exportItem[header] = item[header] || '';
        });
        return exportItem;
      });
    } else {
      // Use all properties
      return data;
    }
  }
  
  /**
   * Calculate column widths for Excel
   */
  private calculateColumnWidths(data: any[]): any[] {
    if (data.length === 0) return [];
    
    const headers = Object.keys(data[0]);
    return headers.map(header => ({
      wch: Math.max(header.length, 15)
    }));
  }
  
  /**
   * Convert data to CSV format
   */
  private convertToCSV(data: any[]): string {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','), // Header row
      ...data.map(row => 
        headers.map(header => 
          this.escapeCSVValue(row[header])
        ).join(',')
      )
    ];
    
    return csvRows.join('\n');
  }
  
  /**
   * Escape CSV value
   */
  private escapeCSVValue(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    
    return stringValue;
  }
  
  /**
   * Parse CSV text
   */
  private parseCSV(text: string): string[][] {
    const lines = text.split('\n');
    return lines.map(line => {
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      
      values.push(current.trim());
      return values;
    });
  }
  
  /**
   * Process imported data
   */
  private processImportedData(data: any[], headers: string[], skipRows: number): any[] {
    const processedData = data.slice(skipRows);
    
    if (headers.length > 0) {
      return processedData.map(row => {
        const item: any = {};
        headers.forEach((header, index) => {
          item[header] = row[index] || '';
        });
        return item;
      });
    } else {
      // Use first row as headers
      const headerRow = processedData[0] || [];
      const dataRows = processedData.slice(1);
      
      return dataRows.map(row => {
        const item: any = {};
        headerRow.forEach((header: string, index: number) => {
          item[header] = row[index] || '';
        });
        return item;
      });
    }
  }
  
  /**
   * Read file as ArrayBuffer
   */
  private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
  
  /**
   * Read file as text
   */
  private readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
} 