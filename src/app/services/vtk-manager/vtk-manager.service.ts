import { Injectable } from '@angular/core';

import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy';
import vtkPiecewiseFunctionProxy from 'vtk.js/Sources/Proxy/Core/PiecewiseFunctionProxy';
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
  dataSubject = new Subject<any>();
  constructor(private visualisationDataService: VisualisationDataService) {
    const proxyConfiguration = { 
      definitions: {
        Proxy: {
          LookupTable: {
            class: vtkLookupTableProxy
          },
          PiecewiseFunction: {
            class: vtkPiecewiseFunctionProxy
          }
        },
        Sources : {
          DataProducer: { class: vtkProxySource, activateOnCreate: true }
        },
        Representations: {
          SagittalSlice : {
            class: vtkSliceRepresentationProxy,
            options: {
              /* link: 'SagittalSlice',
              property: 'slice',
              updateOnBind: true,
              type: 'application' */
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
              axis: 0,
              viewUp: [0, 0, 1],
              orientation: -1,
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
    this.proxySource = this.proxyManager.createProxy("Sources", "DataProducer");

    const dataTest = this.visualisationDataService.getData().subscribe(imageData => {
      this.proxySource.setInputData(imageData);
      this.dataSubject.next(this.proxySource);
    });
  }

  getSource(): any {
    return this.dataSubject.asObservable();
  }

}
