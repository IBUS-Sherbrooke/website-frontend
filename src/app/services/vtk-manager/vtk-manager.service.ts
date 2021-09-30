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
  piecewiseFunctionProxy;
  dataSubject = new Subject<any>();
  constructor(private visualisationDataService: VisualisationDataService) {
    const proxyConfiguration = {
      definitions: {
        Proxy: {
          LookupTable: {
            class: vtkLookupTableProxy,
            options: [
              [-1000, 0.3, 0.3, 1],
              [-488, 0.3, 1, 0.3],
              [463.28, 1, 0, 0],
              [659.15, 1, 0.912535, 0.0374849],
              [953, 1, 0.3, 0.3],
            ],
          },
          PiecewiseFunction: {
            class: vtkPiecewiseFunctionProxy,
            options: {
              Points: [
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
              edgeGradient: 0.2,

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
              // sliceRepresentationSubscriptions: ['SagittalSlice', 'TransverseSlice'],
            }
          },
          SagittalView: {
            class: vtkView2DProxy,
            options: {
              axis: 0,
              viewUp: [0, 0, 1],
              orientation: -1,
              // sliceRepresentationSubscriptions: ['CoronalSlice', 'TransverseSlice'],
            }
          },
          TransverseView: {
            class: vtkView2DProxy,
            options: {
              axis: 2,
              viewUp: [0, 1, 0],
              orientation: -1,
              // sliceRepresentationSubscriptions: ['CoronalSlice', 'SagittalSlice'],
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

  // if (hooks.onActiveSourceChange) {
  //   pxmSubs.push(
  //     this.$proxyManager.onActiveSourceChange((s) =>
  //       hooks.onActiveSourceChange.call(this, s)
  //     )
  //   );
  // }

  // if (hooks.onActiveViewChange) {
  //   pxmSubs.push(
  //     this.$proxyManager.onActiveViewChange((v) =>
  //       hooks.onActiveViewChange.call(this, v)
  //     )
  //   );
  // }

  const animate = () => {
    console.log("ANIMATIINGGGG");
    this.proxyManager.autoAnimateViews();
  }

    const dataTest = this.visualisationDataService.getData().subscribe(imageData => {
      this.proxySource.setInputData(imageData);
      this.dataSubject.next(this.proxySource);

      const groups = this.proxyManager.getProxyGroups();
      console.log("Groups: ", groups);
    let proxies = [];
    for (let i = 0; i < groups.length; i += 1) {
      const name = groups[i];
      proxies = proxies.concat(
        this.proxyManager.getProxyInGroup(name)
      );
    }

    console.log("Proxies: ", proxies);
    for (let i = 0; i < proxies.length; i += 1) {
      const proxy = proxies[i];
      proxy.onModified((p) =>
        animate()
      );
    }

    const pxmSubs = [];
    const proxySubs = {};

    pxmSubs.push(
      this.proxyManager.onProxyRegistrationChange((info) => {
        const { action, proxyId, proxy } = info;
        if (action === 'register') {
          proxySubs[proxyId] = proxy.onModified((p) =>
            animate()
          );
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

  getSource(): any {
    return this.dataSubject.asObservable();
  }

}