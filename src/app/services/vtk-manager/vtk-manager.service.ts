import { Injectable } from '@angular/core';

import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager';
import vtkProxySource from 'vtk.js/Sources/Proxy/Core/SourceProxy';
import vtkSliceRepresentationProxy from 'vtk.js/Sources/Proxy/Representations/SliceRepresentationProxy';
import vtkView2DProxy from 'vtk.js/Sources/Proxy/Core/View2DProxy';
import vtkViewProxy from 'vtk.js/Sources/Proxy/Core/ViewProxy';
import vtkVolumeRepresentationProxy from 'vtk.js/Sources/Proxy/Representations/VolumeRepresentationProxy';

import { VisualisationDataService } from './../visualisation-Data/visualisation-data.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VtkManagerService {

  proxyManager;
  proxySource;
  dataSubject: Subject<any>;
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
              link: 'SagittalSlice',
              property: 'slice',
              updateOnBind: true,
              type: 'application'
            },
          },
          Volume: {
            class: vtkVolumeRepresentationProxy,
            options: {

            }
          }
        },
        Views: {
          SagittalView: {
            class: vtkView2DProxy,
            options: {
              
            }
          },
          View3D: {
            class: vtkViewProxy,
            options: {

            }
          }
        }
      },
      representations: {
        SagittalView: {
          vtkImageData: { name: 'SagittalSlice' }
        },
        View3D : {
          vtkImageData: { name: 'Volume' }
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
      this.dataSubject.next(this.proxySource);
    });
    //console.log(dataTest);
    //this.proxySource.setInputData(this.visualisationDataService.getData());
    //console.log(this.proxySource.getDataset());
  }

  getSource(): any {
    return this.proxySource;
  }

}
