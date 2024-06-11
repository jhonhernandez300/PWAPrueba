import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { ChuckNorrisService } from '../app/data/chuck-norris.service';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Note the corrected plural
})
export class AppComponent implements OnInit {
  title = 'pwa.client v4';
  chiste: string = '';

  constructor(
    private _swUpdate: SwUpdate,
    private chuckNorrisService: ChuckNorrisService
  ) {}

  ngOnInit(): void {
    this.checkForUpdates();
  }

  checkForUpdates(): void {
    if (this._swUpdate.isEnabled) {
      this._swUpdate.versionUpdates.subscribe({
        next: (event: VersionEvent) => {
          if (event.type === 'VERSION_READY') {
            if (confirm('Hay una nueva versión de la aplicación. ¿Desea cargarla?')) {
              this._swUpdate.activateUpdate()
                .then(() => window.location.reload())
                .catch(error => console.error(`Error al activar la nueva versión: ${error}`))
                .finally(() => console.info('Nueva versión activada'));
            }
          }
        },
        error: error => console.error(`Error al verificar nueva versión: ${error}`),
        complete: () => console.info('Finalizada verificación de nueva versión')
      });
    }
  }

  obtenerNuevoChiste(): void {    
    this.chuckNorrisService.obtenerFraseAleatoria().subscribe({
      next: (respuesta: any) => this.chiste = respuesta.value,
      error: error => console.error(`Error al obtener un nuevo chiste: ${error}`),
      complete: () => console.info('Nuevo chiste obtenido')
    });
  }
}
