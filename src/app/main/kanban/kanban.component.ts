import { Component, OnInit } from '@angular/core';
import { transferArrayItem, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MainService } from 'src/app/shared/main.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  aloha =" string string";
  onDescription = false;
  isVisible = false;
  selectedStatus = null;

  backlog = [];
  selected = [];
  inprogress = [];
  done = [];

  title = "";
  description = "";
  type = "";
  reporterName = "";
  priority = "";

  constructor(private mainS:MainService) { }

  ngOnInit(): void {
    this.mainS.getIssues().subscribe(data => {
      let selected = data.filter(ele => ele.issueStatus==="selected");
      selected.forEach(ele => this.selected.push(ele.title))
      let backlog = data.filter(ele => ele.issueStatus==="backlog");
      backlog.forEach(ele => this.backlog.push(ele.title))
      let inprogress = data.filter(ele => ele.issueStatus==="inprogress");
      inprogress.forEach(ele => this.inprogress.push(ele.title))
      let done = data.filter(ele => ele.issueStatus==="done");
      done.forEach(ele => this.done.push(ele.title))
    })
  }

  editorStyle = {
    height: '200px'
  };



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }


  showModal(i: number, array: string[] ): void {
    this.mainS.getIssues().subscribe(data => {
      let temp = data.filter(ele => ele.title===array[i]);
      this.type = temp[0].issueType.toUpperCase() + "-" + temp[0].id;
      this.title = temp[0].title;
      this.description = temp[0].description;
      this.isVisible = true;
      this.selectedStatus = temp[0].issueStatus;
      this.priority = temp[0].issuePriority.charAt(0).toUpperCase() + temp[0].issuePriority.substring(1, temp[0].issuePriority.length);
      this.mainS.getUser(temp[0].reporterid).subscribe(user => {
        this.reporterName = user.name;
      })

    });

  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  priorityColor(priorityType: string): string {
    if(priorityType === 'Medium') return "orange";
    else if(priorityType === 'Highest') return "red";
    else if(priorityType === 'High') return "#F06666";

    else if(priorityType === 'Low') return "green";
    else if(priorityType === 'Lowest') return "lightgreen";

  }

  onDescriptionChanged() {
    this.onDescription = !this.onDescription;
  }

}
