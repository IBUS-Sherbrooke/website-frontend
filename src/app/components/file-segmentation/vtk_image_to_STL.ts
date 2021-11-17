import vtkImageMarchingCubes from 'vtk.js/Sources/Filters/General/ImageMarchingCubes';
import vtkSTLWriter from 'vtk.js/Sources/IO/Geometry/STLWriter';

// This function converts an input vtkImage into a file-like blob
export function vtk_image(data){
    // Define params for marching_cube algorithm
    const blob = new Blob([data], { type: 'application/octet-steam' });
    return blob;
  }
