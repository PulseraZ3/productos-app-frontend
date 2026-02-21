import { Component, inject } from '@angular/core';
import { ProductoService } from '../../../Service/producto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-imagen',
  standalone: true,
  imports: [],
  templateUrl: './producto-imagen.html',
  styleUrl: './producto-imagen.css'
})
export class ProductoImagen {
  private productoService = inject(ProductoService);
  private route = inject(ActivatedRoute);

  selectedFiles: File[] = [];
  idProducto!: number;
  ngOnInit() {
    this.idProducto = Number(
      this.route.snapshot.paramMap.get('id')
    );
  }
  onFilesSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }
  // subir imágenes
  subirImagenes() {

    if (!this.selectedFiles.length) {
      alert('Selecciona al menos una imagen');
      return;
    }

    this.productoService
      .subirImagenesProducto(this.idProducto, this.selectedFiles)
      .subscribe({
        next: () => {
          alert('Imágenes subidas correctamente');
          this.selectedFiles = [];
        },
        error: (err) => {
          console.error(err);
          alert('Error al subir imágenes');
        }
      });
  }
}
