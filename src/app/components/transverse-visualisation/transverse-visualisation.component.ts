import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { VtkManagerService } from '../../services/vtk-manager/vtk-manager.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transverse-visualisation',
  templateUrl: './transverse-visualisation.component.html',
  styleUrls: ['./transverse-visualisation.component.css']
})
export class TransverseVisualisationComponent implements OnInit {

  // VTK attributes
  renderWindow: any;
  renderer: any;
  camera: any;
  interactor: any;
  actor: any;
  mapper: any;
  openglRenderWindow: any;

  subscription: Subscription;

  @ViewChild('transverseDiv', {read: ElementRef}) transverseDiv: ElementRef;

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
    this.viewProxy = this.vtkManagerService.proxyManager.createProxy('Views', 'TransverseView');
    this.viewProxy.setContainer(this.transverseDiv.nativeElement);
    this.viewProxy.setName("TransverseView");
    this.viewProxy.getCornerAnnotation().updateTemplates({
      nw() { return `Transverse`; }
    });
    this.viewProxy.resize();
  }
}
