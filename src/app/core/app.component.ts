import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toggleNav() {
    var sidenav = document.getElementById("mySidenav");
    var main = document.getElementById("main");
    var SideNavToggleButton = document.getElementById("SideNavToggleButton");
    var SideNavToggleText = document.getElementById("menu-toggle");
    sidenav.style.width = sidenav.style.width === "250px" ? '0' : '250px';
    main.style.paddingLeft = main.style.paddingLeft === "250px" ? '0' :  '250px';
    SideNavToggleButton.style.left = SideNavToggleButton.style.left === "250px" ? '0' :  '250px';
    SideNavToggleText.innerText = SideNavToggleText.innerText === ">" ? "<" : ">";
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
