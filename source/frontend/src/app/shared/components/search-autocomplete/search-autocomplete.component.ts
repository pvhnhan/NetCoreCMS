import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable, of } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

export interface SearchOption {
  id: string | number;
  label: string;
  value: any;
  category?: string;
}

@Component({
  selector: 'app-search-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="search-container">
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>{{ placeholder }}</mat-label>
        <input
          matInput
          [formControl]="searchControl"
          [matAutocomplete]="auto"
          [placeholder]="placeholder"
          aria-label="Tìm kiếm"
          autocomplete="off">
        <mat-icon matSuffix>search</mat-icon>
        <button 
          *ngIf="searchControl.value" 
          matSuffix 
          mat-icon-button 
          (click)="clearSearch()"
          aria-label="Xóa tìm kiếm">
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>
      
      <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
        <mat-option *ngFor="let option of filteredOptions$ | async" [value]="option">
          <div class="option-content">
            <span class="option-label">{{ option.label }}</span>
            <span *ngIf="option.category" class="option-category">{{ option.category }}</span>
          </div>
        </mat-option>
        <mat-option *ngIf="(filteredOptions$ | async)?.length === 0 && searchControl.value" value="no-results">
          <em>Không tìm thấy kết quả</em>
        </mat-option>
      </mat-autocomplete>
    </div>
  `,
  styles: [`
    .search-container {
      width: 100%;
      max-width: 400px;
    }
    
    .search-field {
      width: 100%;
    }
    
    .option-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    
    .option-label {
      font-weight: 500;
    }
    
    .option-category {
      font-size: 12px;
      color: #666;
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 4px;
    }
    
    .mat-mdc-form-field {
      width: 100%;
    }
  `]
})
export class SearchAutocompleteComponent implements OnInit {
  @Input() options: SearchOption[] = [];
  @Input() placeholder: string = 'Tìm kiếm...';
  @Input() debounceTime: number = 300;
  @Input() minLength: number = 1;
  @Output() selectionChange = new EventEmitter<SearchOption>();
  @Output() searchChange = new EventEmitter<string>();
  
  searchControl = new FormControl('');
  filteredOptions$: Observable<SearchOption[]> = of([]);
  
  ngOnInit(): void {
    this.setupAutocomplete();
  }
  
  private setupAutocomplete(): void {
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      switchMap(value => {
        const searchTerm = typeof value === 'string' ? value : '';
        this.searchChange.emit(searchTerm);
        
        if (searchTerm.length < this.minLength) {
          return of([]);
        }
        
        return of(this.filterOptions(searchTerm));
      })
    );
  }
  
  private filterOptions(searchTerm: string): SearchOption[] {
    const term = searchTerm.toLowerCase();
    return this.options.filter(option => 
      option.label.toLowerCase().includes(term) ||
      option.category?.toLowerCase().includes(term)
    );
  }
  
  displayFn = (option: SearchOption): string => {
    return option?.label || '';
  }
  
  clearSearch(): void {
    this.searchControl.setValue('');
    this.selectionChange.emit(null as any);
  }
  
  onSelectionChange(option: SearchOption): void {
    if (option && option.id !== 'no-results') {
      this.selectionChange.emit(option);
    }
  }
} 