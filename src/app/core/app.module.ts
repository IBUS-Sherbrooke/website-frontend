import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { CoronalVisualisationComponent } from '../components/coronal-visualisation/coronal-visualisation.component';
import { SagittalVisualisationComponent } from '../components/sagittal-visualisation/sagittal-visualisation.component';
import { TransverseVisualisationComponent } from '../components/transverse-visualisation/transverse-visualisation.component';
import { TridimensionalVisualisationComponent } from '../components/tridimensional-visualisation/tridimensional-visualisation.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent
    CoronalVisualisationComponent,
    SagittalVisualisationComponent,
    TransverseVisualisationComponent,
    TridimensionalVisualisationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
