import { Injectable } from '@angular/core';

import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager';
import vtkProxySource from 'vtk.js/Sources/Proxy/Core/SourceProxy';

import { VisualisationDataService } from './../visualisation-Data/visualisation-data.service';

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
      },
      representations: {

      },
    };
    this.proxyManager = vtkProxyManager.newInstance({proxyConfiguration});
    console.log(this.proxyManager.get("proxyConfiguration"));
    this.proxySource = this.proxyManager.createProxy("Sources", "DataProducer");
    console.log(this.proxyManager.get("proxyConfiguration"));
    console.log(this.proxyManager.getSources());
    console.log(this.proxyManager.getRepresentations());

    const dataTest = this.visualisationDataService.getData();
    console.log(dataTest);
    this.proxySource.setInputData(this.visualisationDataService.getData());

    console.log(this.proxySource.getDataset());
  }
}
