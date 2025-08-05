import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButtonHoverAnimation]',
  standalone: true,
})
export class ButtonHoverAnimationDirective {
  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}
  @HostListener('mouseenter', ['$event'])
  @HostListener('mouseout', ['$event'])
  handleHover(event: MouseEvent): void {
    const button = this.el.nativeElement;
    const parentOffset = button.getBoundingClientRect();
    const relX = event.clientX - parentOffset.left;
    const relY = event.clientY - parentOffset.top;
    const span = button.querySelector('span');

    if (!span) {
      return;
    }

    this.renderer.setStyle(span, 'top', `${relY}px`);
    this.renderer.setStyle(span, 'left', `${relX}px`);
  }
}
