import { Injectable } from '@angular/core';

import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy';
import vtkPiecewiseFunctionProxy from 'vtk.js/Sources/Proxy/Core/PiecewiseFunctionProxy';
import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager';
import vtkProxySource from 'vtk.js/Sources/Proxy/Core/SourceProxy';
import vtkSliceRepresentationProxy from 'vtk.js/Sources/Proxy/Representations/SliceRepresentationProxy';
import vtkView2DProxy from 'vtk.js/Sources/Proxy/Core/View2DProxy';
import vtkViewProxy from 'vtk.js/Sources/Proxy/Core/ViewProxy';
import vtkVolumeRepresentationProxy from 'vtk.js/Sources/Proxy/Representations/VolumeRepresentationProxy';
import vtkPointPicker from 'vtk.js/Sources/Rendering/Core/PointPicker'
import vtkPlane from 'vtk.js/Sources/Common/DataModel/Plane';
import vtkCircleSource from 'vtk.js/Sources/Filters/Sources/CircleSource';
import vtkSphereSource from 'vtk.js/Sources/Filters/Sources/SphereSource';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';

import { mat4, quat, vec3 } from 'gl-matrix';


import { VisualisationDataService } from './../visualisation-Data/visualisation-data.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VtkManagerService {

  nextScale = -1;
  isPickerInitialized = false;
  isPickerEnabled: boolean = false;
  proxyManager: any;
  proxySource: any;
  piecewiseFunctionProxy: any;
  lastWindowLevel: number;
  lastWindowWidth: number;
  window = new Subject<any>();
  dataSubject = new Subject<any>();
  extent: any;
  x_segment_coord : number;
  y_segment_coord :  number;
  z_segment_coord : number;
  imgData= new Subject<any>();
  img_Data_Transformed=new Subject<any>();
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
      if (!p || p.getWindowLevel === undefined || p.getWindowWidth === undefined){
        return false;
      }

      if (this.lastWindowLevel && this.lastWindowLevel === p.getWindowLevel() &&
          this.lastWindowWidth && this.lastWindowWidth === p.getWindowWidth()) {
        return false;
      }

      this.lastWindowLevel = p.getWindowLevel();
      this.lastWindowWidth = p.getWindowWidth();

      this.proxyManager.getRepresentations().forEach((rep: any) => {
          rep.setWindowLevel(p.getWindowLevel());
          rep.setWindowWidth(p.getWindowWidth());
      });

      this.proxyManager.autoAnimateViews();
      this.window.next(p);

      return true;
    };
    const subscription = this.visualisationDataService.getFile().subscribe(imageData => {
      console.log("subscribed:",imageData)
      this.imgData = imageData;
      //this.imgData=JSON.parse(JSON.stringify(imageData))

    })

    const dataTest = this.visualisationDataService.getData().subscribe(imageData => {
      this.img_Data_Transformed=imageData
      this.proxySource.setInputData(imageData);
      this.dataSubject.next(this.proxySource);

      const groups = this.proxyManager.getProxyGroups();
      let proxies = [];

      for (const name in groups) {
        if (groups.hasOwnProperty(name)) {
          proxies = proxies.concat(
              this.proxyManager.getProxyInGroup(name)
            );
        }
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

  update3D(): void {
    this.proxyManager.getRepresentations().forEach(a => {
      if (a.getProxyName() === 'Volume') {
        const cropFilter = a.getCropFilter();
        this.extent = a.getCropFilter().getOutputData().getExtent();
        cropFilter.setCroppingPlanes(...this.extent);
      }
    });
  }

  flipViewsProxy(): any {
    const views = this.proxyManager.getViews();
    let representation: any;
    let axis: any;
    let volume: any;
    let wasFlipMade = true;

    views.forEach(view => {
      representation = view.getRepresentations()[0];

      if (representation !== undefined && !representation.getVolumes().length) {
        axis = view.getAxis();
        representation.getActors()[0].setScale(axis ? this.nextScale : 1, axis ? 1 : this.nextScale, 1);
      }
      else if (representation !== undefined) {
        volume = representation.getVolumes()[0].setScale(this.nextScale, 1, 1);
      } else {
        wasFlipMade = false;
      }
    });

    if (wasFlipMade) {
      this.nextScale = -1 * this.nextScale;
      this.proxyManager.autoAnimateViews();
    }
    
  }


  togglePicker(): void {
    const reps = this.proxyManager.getRepresentations();

    if (reps.length) {
      this.isPickerEnabled = !this.isPickerEnabled;
    }
    else {
      this.isPickerEnabled = false;
    }


    if (!this.isPickerInitialized) {
      const wasSuccessful = this.initializePicker();

      if (!wasSuccessful) {
        this.isPickerEnabled = false;
      }
      else {
        this.isPickerInitialized = true;
      }
    }
  }

  computePixelAt(plane, probeVec, imageData): any {
    const intersection = vtkPlane.intersectWithLine(
      probeVec.near,
      probeVec.far,
      plane.origin,
      plane.normal
    );
    if (intersection.intersection) {
      const point = intersection.x;
      const [i, j, k] = imageData.worldToIndex(point).map((c) =>
        // this is a hack to work around the first slice sometimes being
        // very close to zero, but not quite, resulting in being unable to
        // see pixel values for 0th slice.
        Math.abs(c) < 1e-4 ? Math.round(c) : c
      );
      const extent = imageData.getExtent();
      if (
        i >= extent[0] &&
        i <= extent[1] &&
        j >= extent[2] &&
        j <= extent[3] &&
        k >= extent[4] &&
        k <= extent[5]
      ) {
        const offsetIndex = imageData.computeOffsetIndex([i, j, k]);
        const pixel = imageData.getPointData().getScalars().getTuple(offsetIndex);
  
        return {
          location: [Math.round(i), Math.round(j), Math.round(k)],
          value: pixel,
          numberOfComponents: pixel.length,
        };
      }
    }
    return null;
  }


  indexToWorldRotation(imageData, vec): any {
    const i2wMat = imageData.getIndexToWorld();
    const rotation = quat.create();
    mat4.getRotation(rotation, i2wMat);
  
    const out = vec3.create();
    vec3.transformQuat(out, vec, rotation);
    return out;
  }


  computeIntersectionPlane(rep, image): any {
    let plane = {
      normal: [0, 0, 1],
      origin: [0, 0, 0],
    };

    if (image && rep?.getSlice && rep?.getSlicingMode) {
      const mode = rep.getSlicingMode();
      const slice = rep.getSlice();

      const axis = 'XYZIJK'.indexOf(mode);
      if (axis > -1) {
        let origin = [0, 0, 0];
        let normal = [0, 0, 0];
        origin[axis % 3] = slice;
        normal[axis % 3] = 1;

        // transform from index to world if required
        if (axis >= 3) {
          origin = image.indexToWorld(origin);
          normal = this.indexToWorldRotation(image, normal);
        }

        plane = { normal, origin };
      }
    }

    return plane;
  }

  initializePicker(): boolean {
    let foundRep = false;
    const views = this.proxyManager.getViews();

    views.forEach((view: any) => {
      const renderer = view.getRenderer();

      const rep = view.getRepresentations()[0];

      if (rep && !rep.getVolumes().length) {
        foundRep = true;
        const image = rep.getMapper().getInputData();
        const gl = view.getOpenglRenderWindow();

        view.getInteractor().onLeftButtonPress((callData: any) => {
          const pos = callData.position;
          
          if (gl) {
            if (this.isPickerEnabled) {
              const probeVec = {
                near: gl.displayToWorld(pos.x, pos.y, 0, renderer),
                far: gl.displayToWorld(pos.x, pos.y, 1, renderer),
              };

              const plane = this.computeIntersectionPlane(rep, image);

              const pixelValue = this.computePixelAt(plane, probeVec, image)

              if (pixelValue) {
                const circle = vtkSphereSource.newInstance();
                const picker = vtkPointPicker.newInstance();
                picker.pick([pos.x, pos.y, 0], renderer);
                const pickedPoint = picker.getPickPosition();
                circle.setCenter(pickedPoint);
                circle.setRadius(2);
                const circleMapper = vtkMapper.newInstance();
                circleMapper.setInputData(circle.getOutputData());
                const circleActor = vtkActor.newInstance();
                circleActor.setMapper(circleMapper);
                circleActor.getProperty().setColor(1.0, 0.0, 0.0);
                renderer.addActor(circleActor);
                this.proxyManager.autoAnimateViews();
              }
              this.x_segment_coord=pixelValue.location[0]
              this.y_segment_coord=pixelValue.location[1]
              this.z_segment_coord=pixelValue.location[2]
              console.log("x:",this.x_segment_coord);
              console.log("y:",this.y_segment_coord);
              console.log("z:",this.z_segment_coord);
              console.log("Picked point: ", pixelValue);
            }
          }          
        });
      }
      
    });

    return foundRep;
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

  setCropping(axis, bound, value): void {
    this.proxyManager.getRepresentations().forEach(a => {
      if (a.getProxyName() === 'Volume') {
        const cropFilter = a.getCropFilter();
        const planes = cropFilter.getCroppingPlanes().slice();
        planes[axis * 2 + bound] = Number((value * (this.extent[axis * 2 + 1] - this.extent[axis * 2])) + this.extent[axis * 2]);
        cropFilter.setCroppingPlanes(...planes);
      }
    });
    this.proxyManager.autoAnimateViews();
  }

  getSource(): any {
    return this.dataSubject.asObservable();
  }

  getWindow(): any {
    return this.window.asObservable();
  }

  get_x_coord(): any {
    return this.x_segment_coord;
  }
  get_y_coord(): any {
    return this.y_segment_coord;
  }
  get_z_coord(): any {
    return this.z_segment_coord;
  }
  getFile(): any {
    return this.imgData;
  }
  
  getData(): any {
    // console.log("Proxy")
    // console.log(this.proxySource)
    // console.log("Proxy Mangaer")
    // console.log(this.proxyManager)
    // console.log("GetDataset")
    // console.log(this.proxySource.getDataset())
    // console.log("Type")
    // console.log(typeof(this.proxySource.getDataset()))
    // let val_data;
    // this.proxyManager.getRepresentations().forEach((rep: any) => {
    //   if (!rep.getVolumes().length) {
    //     val_data=rep.getActors()[0].getImages()
    //   }
    // });
    
    // console.log("ValData")
    // console.log(val_data)
    return this.img_Data_Transformed
    //return val_data
  }

}
