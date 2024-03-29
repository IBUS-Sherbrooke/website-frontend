import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toggleNav() {
    const sidenav = document.getElementById('mySidenav');
    const main = document.getElementById('main');
    sidenav.style.width = sidenav.style.width === '250px' ? '0' : '250px';
    main.style.paddingLeft = main.style.paddingLeft === '250px' ? '0' :  '250px';
  }

  clickController(clickedButton) {
    // Get the container element
    const btnContainer = document.getElementById('controllerGroup');

    // Get the active element in controllerGroup and remove active from the current active button
    // and add active class to the element targeted by the event.
    const current = btnContainer.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    clickedButton.className += ' active';
  }
}
