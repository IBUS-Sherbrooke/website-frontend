import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy';
import vtkPiecewiseFunctionProxy from 'vtk.js/Sources/Proxy/Core/PiecewiseFunctionProxy';

import vtkSourceProxy from 'vtk.js/Sources/Proxy/Core/SourceProxy';

import vtkVolumeRepresentationProxy from 'vtk.js/Sources/Proxy/Representations/VolumeRepresentationProxy';
import vtkGeometryRepresentationProxy from 'vtk.js/Sources/Proxy/Representations/GeometryRepresentationProxy';

import vtk3DView from '@/src/services/proxy/view3DProxy';
import vtk2DView from '@/src/services/proxy/view2DProxy';
import vtkTransformedSliceRepresentationProxy from '@/src/services/proxy/transformedSliceRepresentationProxy';
import vtkLabelMapSliceRepProxy from '@/src/services/proxy/labelMapSliceRepProxy';
import vtkCutGeometryRepresentationProxy from '@/src/services/proxy/cutGeometryRepresentationProxy';

function createProxyDefinition(
  classFactory,
  ui = [],
  links = [],
  definitionOptions = {},
  props = {}
) {
  return {
    class: classFactory,
    options: { links, ui, ...definitionOptions },
    props,
  };
}

function createDefaultView(classFactory, options, props) {
  return createProxyDefinition(classFactory, [], [], options, props);
}

function createSyncedSliceRepDefinition(proxyClass, axis, ui = [], links = []) {
  return createProxyDefinition(proxyClass, ui, [
    {
      link: `Slice${axis}`,
      property: 'slice',
      updateOnBind: false,
      type: 'application',
    },
    ...links,
  ]);
}

// ----------------------------------------------------------------------------

export default {
  definitions: {
    Proxy: {
      LookupTable: createProxyDefinition(vtkLookupTableProxy, [], [], {
        presetName: 'Default (Cool to Warm)',
      }),
      PiecewiseFunction: createProxyDefinition(vtkPiecewiseFunctionProxy),
    },
    Sources: {
      TrivialProducer: createProxyDefinition(vtkSourceProxy),
    },
    Representations: {
      Volume: createProxyDefinition(vtkVolumeRepresentationProxy),
      SliceX: createSyncedSliceRepDefinition(
        vtkTransformedSliceRepresentationProxy,
        'X',
        [],
        [
          { link: 'WW', property: 'windowWidth', updateOnBind: true },
          { link: 'WL', property: 'windowLevel', updateOnBind: true },
        ]
      ),
      SliceY: createSyncedSliceRepDefinition(
        vtkTransformedSliceRepresentationProxy,
        'Y',
        [],
        [
          { link: 'WW', property: 'windowWidth', updateOnBind: true },
          { link: 'WL', property: 'windowLevel', updateOnBind: true },
        ]
      ),
      SliceZ: createSyncedSliceRepDefinition(
        vtkTransformedSliceRepresentationProxy,
        'Z',
        [],
        [
          { link: 'WW', property: 'windowWidth', updateOnBind: true },
          { link: 'WL', property: 'windowLevel', updateOnBind: true },
        ]
      ),
      LabelMapSliceX: createSyncedSliceRepDefinition(
        vtkLabelMapSliceRepProxy,
        'X'
      ),
      LabelMapSliceY: createSyncedSliceRepDefinition(
        vtkLabelMapSliceRepProxy,
        'Y'
      ),
      LabelMapSliceZ: createSyncedSliceRepDefinition(
        vtkLabelMapSliceRepProxy,
        'Z'
      ),
      Geometry: createProxyDefinition(vtkGeometryRepresentationProxy),
      GeomSliceX: createSyncedSliceRepDefinition(
        vtkCutGeometryRepresentationProxy,
        'X'
      ),
      GeomSliceY: createSyncedSliceRepDefinition(
        vtkCutGeometryRepresentationProxy,
        'Y'
      ),
      GeomSliceZ: createSyncedSliceRepDefinition(
        vtkCutGeometryRepresentationProxy,
        'Z'
      ),
    },
    Views: {
      View3D: createDefaultView(vtk3DView),
      ViewX: createDefaultView(
        vtk2DView,
        [
          /* ui */
        ],
        { axis: 0 }
      ),
      ViewY: createDefaultView(
        vtk2DView,
        [
          /* ui */
        ],
        { axis: 1 }
      ),
      ViewZ: createDefaultView(
        vtk2DView,
        [
          /* ui */
        ],
        { axis: 2 }
      ),
    },
  },
  representations: {
    View3D: {
      vtkImageData: { name: 'Volume' },
      vtkPolyData: { name: 'Geometry' },
    },
    ViewX: {
      vtkImageData: { name: 'SliceX' },
      vtkPolyData: { name: 'GeomSliceX' },
      vtkLabelMap: { name: 'LabelMapSliceX' },
    },
    ViewY: {
      vtkImageData: { name: 'SliceY' },
      vtkPolyData: { name: 'GeomSliceY' },
      vtkLabelMap: { name: 'LabelMapSliceY' },
    },
    ViewZ: {
      vtkImageData: { name: 'SliceZ' },
      vtkPolyData: { name: 'GeomSliceZ' },
      vtkLabelMap: { name: 'LabelMapSliceZ' },
    },
  },
};
