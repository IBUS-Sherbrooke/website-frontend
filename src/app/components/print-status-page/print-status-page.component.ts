import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let template = {'<>':'div','html':'${name} ${description}'};
@Component({
  selector: 'app-print-status-page',
  templateUrl: './print-status-page.component.html',
  styleUrls: ['./print-status-page.component.css']
})
export class PrintStatusPageComponent implements OnInit {
  print_status;
  errorMessage: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  async request_print_status(text){
    this.get_print_status(text)
  }
  
  get_print_status(text){
    
  this.http.get('http://localhost:2000/api/printRequests?user_id='+text).subscribe({
    next: data => {
        this.print_status = data;
        console.log(this.print_status)
        console.log(this.print_status.data)
        this.createcollapsibleinfo(text)
    },
    error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
    }
  })
  }

  createcollapsibleinfo(text){
    var prev_btn=null
    var print_data = this.print_status.data.printrequests
    var i;
    console.log(print_data.length)
    removeElementsByClass("demo-half-spacer2")// lift search bar up
    removeElementsByClass("Generated_Btn")
    removeElementsByClass("btntxt") 
  for (i = 0; i < print_data.length; i++) {
    var index=print_data.length-i-1 //Inverser l'index pour generer les boutons dans le bonne ordre
    //Creation d'un bouton pour chaque projet 
    var btn = document.createElement("button");
    btn.style.width = '80%'
    btn.style.height = '75px'
    btn.style.left ='10%';
    btn.style.position = 'relative'
    btn.className = "Generated_Btn";
    btn.textContent = print_data[index].name;
    btn.style.fontSize = "xx-large";
    btn.addEventListener("click", function() {
      removeElementsByClass("btntxt") //delete any previously created project info
      if (this==prev_btn){
        prev_btn=null
        return; //close if same button pressed twice
        
      }
      prev_btn=this
      var box = document.createElement('div');
      box.className = "btntxt";
      box.style.position = 'relative';
      box.style.left = '10%';
      box.style.width = '80%';
      box.style.height = '100px';
      box.style.color = 'black';
      box.style.background = 'lightblue';
      box.style.padding = '20px';
      
      var status =document.createTextNode("Current Status: " + print_data[index].status)
      var status_extra_message =document.createTextNode(print_data[index].status_message)
      var timestamp =document.createTextNode("Last updated: " +print_data[index].updated_at)
      var filepath_name =document.createTextNode("File: " +print_data[index].filepath)

      var textTopLeft =  document.createElement("div");
      textTopLeft.style.position ="absolute"
      textTopLeft.style.left = '0%';
      textTopLeft.appendChild(status)
      textTopLeft.style.fontSize = "large";

      var textTopRight =  document.createElement("div");
      textTopRight.style.position ="absolute"
      textTopRight.style.left = '50%';
      textTopRight.appendChild(filepath_name)
      textTopRight.style.textAlign = "Right"
      textTopRight.style.fontSize = "large";

      var textBottomLeft =  document.createElement("div");
      textBottomLeft.style.top ="60%"
      textBottomLeft.style.position ="absolute"
      textBottomLeft.style.left = '0';
      textBottomLeft.style.fontSize = "large";
      textBottomLeft.appendChild(status_extra_message)

      var textBottomRight =  document.createElement("div");
      textBottomRight.style.top ="60%"
      textBottomRight.style.position ="absolute"
      textBottomRight.style.left = '50%';
      textBottomRight.appendChild(timestamp)
      textBottomRight.style.textAlign = "Right"
      textBottomRight.style.fontSize = "large";  

      box.appendChild(textTopLeft)
      box.appendChild(textTopRight)
      box.appendChild(textBottomLeft)
      box.appendChild(textBottomRight)
      this.parentNode.insertBefore(box, this.nextSibling);
    });
    //creation des boutons
    var parent=document.getElementById("request_output")
    parent.parentNode.insertBefore(btn, parent.nextSibling);
  }
}
}

function removeElementsByClass(className){
  var elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}
