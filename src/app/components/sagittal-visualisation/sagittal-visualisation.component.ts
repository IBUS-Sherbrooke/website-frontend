import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { VtkManagerService } from '../../services/vtk-manager/vtk-manager.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sagittal-visualisation',
  templateUrl: './sagittal-visualisation.component.html',
  styleUrls: ['./sagittal-visualisation.component.css']
})
export class SagittalVisualisationComponent implements OnInit {

  sagitallRenderWindow = null;
  sagitallRenderer = null;

  @ViewChild('sagittalDiv', {read: ElementRef}) sagittalDiv: ElementRef;

  // VTK attributes
  renderWindow: any;
  renderer: any;
  camera: any;
  interactor: any;
  actor: any;
  mapper: any;
  openglRenderWindow: any;

  subscription: Subscription;
  dataSource: any;
  sagittalRepresentation: any;
  viewProxy: any;
  representation: any;

  constructor(private vtkManagerService: VtkManagerService) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.initializeView();

    this.dataSource = this.vtkManagerService.proxySource;

    this.subscription = this.vtkManagerService.getSource().subscribe(source => {
      this.representation = this.vtkManagerService.proxyManager.getRepresentation(source, this.viewProxy);
      this.viewProxy.addRepresentation(this.representation);
      this.viewProxy.render();
    });
  }

  initializeView() {
    this.viewProxy = this.vtkManagerService.proxyManager.createProxy('Views', 'SagittalView');
    this.viewProxy.setContainer(this.sagittalDiv.nativeElement);
    this.viewProxy.setName("SagittalView");
    this.viewProxy.getCornerAnnotation().updateTemplates({
      nw() { return `Sagittal`; }
    });
    this.viewProxy.resize();
  }
}
