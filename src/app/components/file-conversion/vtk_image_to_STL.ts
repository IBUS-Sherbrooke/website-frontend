import vtkImageMarchingCubes from 'vtk.js/Sources/Filters/General/ImageMarchingCubes';
import vtkSTLWriter from 'vtk.js/Sources/IO/Geometry/STLWriter';

// This function converts an input vtkImage into a file-like blob
export function vtk_image_to_STL(data){
    //Define params for marching_cube algorithm
    const mCubes = vtkImageMarchingCubes.newInstance(
    {computeNormals: true,
    mergePoints: true, });
    const dataRange = data.getPointData().getScalars().getRange();
    const firstIsoValue = (dataRange[0] + dataRange[1]) / 3;
    mCubes.setContourValue(firstIsoValue);
    let isocontour=[];
    //Convert vtkimage into a isocontour via marching_cubes and store output in isocontour
    mCubes.requestData([data],isocontour) 

    //Write output in STL-like blob and return the blob
    const writer= vtkSTLWriter.newInstance();
    writer.setInputData(isocontour[0]);
    const fileContents = writer.getOutputData();
    const blob = new Blob([fileContents], { type: 'application/octet-steam' });
    return blob
  }