import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoronalVisualisationComponent } from '../components/coronal-visualisation/coronal-visualisation.component';
import { SagittalVisualisationComponent } from '../components/sagittal-visualisation/sagittal-visualisation.component';
import { TransverseVisualisationComponent } from '../components/transverse-visualisation/transverse-visualisation.component';
import { TridimensionalVisualisationComponent } from '../components/tridimensional-visualisation/tridimensional-visualisation.component';
import { ItkTestComponent } from '../components/itk-test/itk-test.component';
import { SampleGetRequestComponent } from '../components/sample-get-request/sample-get-request.component';
import { GeneralControllerComponent } from '../components/general-controller/general-controller.component';
import { DatasetControllerComponent } from '../components/dataset-controller/dataset-controller.component';
import { ToolsControllerComponent } from '../components/tools-controller/tools-controller.component';
import { FileConversionComponent } from '../components/file-conversion/file-conversion.component';
import { LoadingModuleComponent } from '../components/loading-module/loading-module.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CoronalVisualisationComponent,
    SagittalVisualisationComponent,
    TransverseVisualisationComponent,
    TridimensionalVisualisationComponent,
    ItkTestComponent,
    SampleGetRequestComponent,
    GeneralControllerComponent,
    DatasetControllerComponent,
    ToolsControllerComponent,
    FileConversionComponent,
    LoadingModuleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule, 
    AppRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
    MatSliderModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
