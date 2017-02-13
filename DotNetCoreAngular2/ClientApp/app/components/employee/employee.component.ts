import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { EmployeeService } from './employee.service';
import { Employee } from './Employee';
import { Subscription } from 'rxjs/Subscription';
import { Observable, Subject } from 'rxjs/Rx';


@Component({
    selector: 'employee',
    template: require('./employee.component.html'),
    providers: [EmployeeService]
})

export class EmployeeComponent extends OnInit{
    //Private variable
    subscription: Subscription;
    employee: Employee[];
    errorMessage: string;
    
    //Constructor
    constructor(private _service: EmployeeService, private router: Router) {
        super();
        //this.Refresh();
        ////this.subscription = _service.RegenerateData$.subscribe(
        ////    mission => {
        ////        console.log("Good !! ", mission);
        ////        this.Refresh();
        ////    });
    }

    //Methods
    Refresh() {
        this._service.getList().subscribe(
            data => { console.log(data); this.employee = data; },
            error => this.errorMessage = <any>error
        );
    }

    onSelect(model: Employee)
    {
        this.router.navigate(['/employee', model.id]);
    }

    onDelete(id) {
        if (confirm('Are you sure to delete this record!')) {
            if (id > 0) {
                this._service.Delete(id)
                    .then(data => { this.Refresh(); })
                    .catch(data => { console.log(data); });

            }
        }
    }

    ngOnInit() {
        this.Refresh();
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}

