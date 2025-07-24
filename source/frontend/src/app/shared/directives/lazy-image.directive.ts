import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[lazyImage]',
  standalone: true
})
export class LazyImageDirective implements OnInit {
  @Input() src: string = '';
  @Input() placeholder: string = '/assets/images/placeholder.jpg';
  @Input() alt: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const img = this.el.nativeElement as HTMLImageElement;
    
    // Set placeholder initially
    img.src = this.placeholder;
    img.alt = this.alt;

    // Create intersection observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = this.src;
          observer.unobserve(img);
        }
      });
    });

    observer.observe(img);
  }
} 