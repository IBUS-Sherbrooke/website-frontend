import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
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
import { CallCxxScriptComponent } from '../components/call-cxx-script/call-cxx-script.component';

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
    CallCxxScriptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    AppRoutingModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
