import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  imports: [CommonModule],
  templateUrl: './carrusel.html',
  styleUrl: './carrusel.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Carrusel implements AfterViewInit {

  @ViewChild('swiper') swiperRef!: ElementRef;
  productos = [
    {
      url: "#",
      imagen: 'assets/img/img1.webp'
    },
    {
      url: "#",
      imagen: 'assets/img/img2.webp'
    },
    {
      url: "#",
      imagen: 'assets/img/img3.jpg'
    }
  ];
  ngAfterViewInit() {

    const swiperEl = this.swiperRef.nativeElement;

    Object.assign(swiperEl, {
      loop: true,
      navigation: true,
      pagination: {
        clickable: true,
        dynamicBullets: true
      },
      autoplay: {
        delay: 3000
      }
    });

    swiperEl.initialize();
  }
}
