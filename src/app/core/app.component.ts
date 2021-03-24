import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidenav:any;
  main:any;
  SideNavToggleButton:any;
  SideNavToggleText:any;
  print_status:any;
  ngOnInit(): void {
    this.sidenav = document.getElementById("mySidenav");
    this.main = document.getElementById("main");
    this.SideNavToggleButton = document.getElementById("SideNavToggleButton");
    this.SideNavToggleText = document.getElementById("menu-toggle");
    this.print_status = document.getElementById("print_status");
  }
  toggleNav() {
    this.sidenav.style.width = this.sidenav.style.width === "250px" ? '0' : '250px';
    this.main.style.paddingLeft = this.main.style.paddingLeft === "250px" ? '0' :  '250px';
    this.SideNavToggleButton.style.left = this.SideNavToggleButton.style.left === "250px" ? '0' :  '250px';
    this.SideNavToggleText.innerText = this.SideNavToggleText.innerText === ">" ? "<" : ">";
  }

  enable_Print_Status(){
    this.sidenav.style.display  = 'none';
    this.main.style.display  = 'none';
    this.SideNavToggleButton.style.display = 'none';
    this.print_status.style.display = "block";
  }
  enable_Visualisation(){
    this.sidenav.style.display  = 'block'
    this.main.style.display = 'block'
    this.SideNavToggleButton.style.display = 'block'
    this.print_status.style.display = "none";
  }


  clickController(clickedButton) {
    // Get the container element
    var btnContainer = document.getElementById("controllerGroup");

    // Get the active element in controllerGroup and remove active from the current active button
    // and add active class to the element targeted by the event.
    var current = btnContainer.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    clickedButton.className += " active";
  }
}
