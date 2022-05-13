import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTitleH1]'
})
export class TitleH1Directive implements OnInit{
  //dışarıdan parametre alımı
  @Input() appTitleH1 = ''

  constructor(private el:ElementRef) { }

  ngOnInit(): void {
    console.log(this.el.nativeElement)
    this.el.nativeElement.outerHTML = '<h1 class="text-2xl mb-5"> '+this.appTitleH1+' </h1>'


  }
 
}
