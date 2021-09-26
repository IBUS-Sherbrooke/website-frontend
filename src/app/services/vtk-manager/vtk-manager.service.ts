import { Injectable } from '@angular/core';

import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager';
import vtkProxySource from 'vtk.js/Sources/Proxy/Core/SourceProxy';
import vtkSliceRepresentationProxy from 'vtk.js/Sources/Proxy/Representations/SliceRepresentationProxy';
import vtkBaseView2DProxy from 'vtk.js/Sources/Proxy/Core/View2DProxy';

import { VisualisationDataService } from './../visualisation-Data/visualisation-data.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VtkManagerService {

  proxyManager;
  proxySource;
  constructor(private visualisationDataService: VisualisationDataService) {
    const proxyConfiguration = { 
      definitions: {
        Sources : {
          DataProducer: { class: vtkProxySource, activateOnCreate: true }
        },
        Representations: {
          SagittalSlice : {
            class: vtkSliceRepresentationProxy,
            options: {
              link: 'SliceX',
              property: 'slice',
              updateOnBind: true,
              type: 'application'
            },
          }
        },
        Views: {
          SagittalView: {
            class: vtkBaseView2DProxy,
            options: {
              axis: 0
            }
          }
        }
      },
      representations: {
        SagittalView: {
          vtkImageData: { name: 'SagittalSlice' }
        }
      },
    };
    this.proxyManager = vtkProxyManager.newInstance({proxyConfiguration});
    //console.log(this.proxyManager.get("proxyConfiguration"));
    this.proxySource = this.proxyManager.createProxy("Sources", "DataProducer");
    /* console.log(this.proxyManager.get("proxyConfiguration"));
    console.log(this.proxyManager.getSources());
    console.log(this.proxyManager.getRepresentations()); */

    const dataTest = this.visualisationDataService.getData().subscribe(imageData => {
      this.proxySource.setInputData(imageData);
      //this.proxySource.next(this.proxySource);
    });
    //console.log(dataTest);
    //this.proxySource.setInputData(this.visualisationDataService.getData());
    //console.log(this.proxySource.getDataset());
  }

  getSource(): any {
    return this.proxySource;
  }

}
