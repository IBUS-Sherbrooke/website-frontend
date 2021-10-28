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

  nextScale: number = -1;
  proxyManager;
  proxySource;
  piecewiseFunctionProxy;
  window = new Subject<any>();
  dataSubject = new Subject<any>();
  constructor(private visualisationDataService: VisualisationDataService) {
    const proxyConfiguration = {
      definitions: {
        Proxy: {
          LookupTable: {
            class: vtkLookupTableProxy,
            options: {
              mode: 1,
              rgbPoints: [
                [-1000, 0.3, 0.3, 1],
                [-488, 0.3, 1, 0.3],
                [463.28, 1, 0, 0],
                [659.15, 1, 0.912535, 0.0374849],
                [953, 1, 0.3, 0.3],
              ],
            },
          },
          PiecewiseFunction: {
            class: vtkPiecewiseFunctionProxy,
            options: {
              mode: 1,
              points: [
                [-1000, 0],
                [152.19, 0],
                [278.93, 0.190476],
                [952, 0.2],
              ],
            }
          }
        },
        Sources : {
          DataProducer: { class: vtkProxySource, activateOnCreate: true }
        },
        Representations: {
          CoronalSlice : {
            class: vtkSliceRepresentationProxy,
            options: {
              links: [
                {
                  link: 'CoronalSlice',
                  property: 'windowLevel',
                  updateOnBind: true,
                },
                {
                  link: 'CoronalSlice',
                  property: 'windowWidth',
                  updateOnBind: true,
                }
              ],
              ui: [],
              definitionOptions: {},
            },
          },
          SagittalSlice : {
            class: vtkSliceRepresentationProxy,
            options: {
              links: [
                {
                  link: 'SagittalSlice',
                  property: 'windowLevel',
                  updateOnBind: true,
                },
                {
                  link: 'SagittalSlice',
                  property: 'windowWidth',
                  updateOnBind: true,
                }
              ],
              ui: [],
              definitionOptions: {},
            },
          },
          TransverseSlice : {
            class: vtkSliceRepresentationProxy,
            options: {
              links: [
                {
                  link: 'TransverseSlice',
                  property: 'windowLevel',
                  updateOnBind: true,
                },
                {
                  link: 'TransverseSlice',
                  property: 'windowWidth',
                  updateOnBind: true,
                }
              ],
              ui: [],
              definitionOptions: {},
            },
          },
          Volume: {
            class: vtkVolumeRepresentationProxy,
            options: {
              sampleDistance: 1,
            }
          }
        },
        Views: {
          CoronalView: {
            class: vtkView2DProxy,
            options: {
              axis: 1,
              viewUp: [0, 1, 0],
              orientation: -1,
              useParallelRendering: true,
              // sliceRepresentationSubscriptions: ['SagittalSlice', 'TransverseSlice'],
            }
          },
          SagittalView: {
            class: vtkView2DProxy,
            options: {
              axis: 0,
              viewUp: [0, 0, 1],
              orientation: -1,
              useParallelRendering: true,
              // sliceRepresentationSubscriptions: ['CoronalSlice', 'TransverseSlice'],
            }
          },
          TransverseView: {
            class: vtkView2DProxy,
            options: {
              axis: 2,
              viewUp: [0, 1, 0],
              orientation: 1,
              useParallelRendering: true,
              // sliceRepresentationSubscriptions: ['CoronalSlice', 'SagittalSlice'],
            }
          },
          View3D: {
            class: vtkViewProxy,
            options: {
              axis: 1,
              viewUp: [0, 1, 0],
              orientation: -1,
            }
          }
        }
      },
      representations: {
        CoronalView: {
          vtkImageData: { name: 'CoronalSlice' }
        },
        SagittalView: {
          vtkImageData: { name: 'SagittalSlice' }
        },
        TransverseView: {
          vtkImageData: { name: 'TransverseSlice' }
        },
        View3D : {
          vtkImageData: { name: 'Volume' }
        }
      },
    };
    this.proxyManager = vtkProxyManager.newInstance({proxyConfiguration});
    this.proxySource = this.proxyManager.createProxy('Sources', 'DataProducer');


    const animate = (p: any) => {
      let isWindowEvent = false;

      this.proxyManager.getRepresentations().forEach((rep: any) => {
        if (p && p.getWindowLevel !== undefined && p.getWindowWidth !== undefined) {
          isWindowEvent = true;

          rep.setWindowLevel(p.getWindowLevel());
          rep.setWindowWidth(p.getWindowWidth());
        }
      });

      if (isWindowEvent) {
        this.proxyManager.autoAnimateViews();
        this.window.next(p);
      }      
    };

    const dataTest = this.visualisationDataService.getData().subscribe(imageData => {
      this.proxySource.setInputData(imageData);
      this.dataSubject.next(this.proxySource);

      const groups = this.proxyManager.getProxyGroups();
      let proxies = [];

      for (let i = 0; i < groups.length; i += 1) {
        const name = groups[i];

        proxies = proxies.concat(
            this.proxyManager.getProxyInGroup(name)
          );
      }

      const pxmSubs = [];
      const proxySubs = {};

      pxmSubs.push(
        this.proxyManager.onProxyRegistrationChange((info: any) => {
          const { action, proxyId, proxy } = info;
          if (action === 'register') {
            proxySubs[proxyId] = proxy.onModified((p: any) => {
              animate(p);
            });
          } else if (action === 'unregister') {
            if (proxyId in proxySubs) {
              proxySubs[proxyId].unsubscribe();
              delete proxySubs[proxyId];
            }
          }
        })
      );
    });
  }

  flipViewsProxy(): any {
    const views = this.proxyManager.getViews();
    let representation;
    let axis;
    let volume;

    views.forEach(view => {
      representation = view.getRepresentations()[0];
      
      if (!representation.getVolumes().length) {
        axis = view.getAxis();
        representation.getActors()[0].setScale(axis ? this.nextScale : 1, axis ? 1 : this.nextScale, 1);
      }
      else {
        volume = representation.getVolumes()[0].setScale(this.nextScale, 1, 1);
      }
    });

    this.nextScale = -1 * this.nextScale;
  }
  
  setWindowLevel(percent): void {
    const rep = this.proxyManager.getRepresentations()[0];
    if (rep) {
      const domain = rep.getPropertyDomainByName('windowLevel');
      rep.setWindowLevel((percent * (domain.max - domain.min)) + domain.min);
    }
  }

  setWindowWidth(percent): void {
    const rep = this.proxyManager.getRepresentations()[0];
    if (rep) {
      const domain = rep.getPropertyDomainByName('windowWidth');
      rep.setWindowWidth((percent * (domain.max - domain.min)) + domain.min);
    }
  }

  getSource(): any {
    return this.dataSubject.asObservable();
  }

  getWindow(): any {
    return this.window.asObservable();
  }
}
