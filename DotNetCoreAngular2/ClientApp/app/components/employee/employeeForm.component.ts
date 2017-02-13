import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { EmployeeService } from './employee.service'
import { Employee } from './Employee'


@Component({
    moduleId: __filename,
    selector: 'employeeForm',
    template: require('./employeeForm.component.html'),
    providers: [EmployeeService]
})

export class EmployeeFormComponent {
    constructor(private _service: EmployeeService, private router: Router, private activatedroute: ActivatedRoute ) {
    }

    model = new Employee(0, '', '');
    id: number;
    submitted = false;
    onSubmit() {
        this.submitted = true;
        if (this.model.id > 0) {
            this._service.Update(this.model)
                .then(data => {
                    this.router.navigate(['employee'])
                        .catch(data => { console.log(data); })
                });
        }
        else{
            this._service.Add(this.model)
                .then(data => {
                    this.router.navigate(['employee'])
                        .catch(data => { console.log(data); })
                });
        }
    }

    ngOnInit() {
        this.activatedroute.params.subscribe(params => this.id = params['id']);
        if (this.id != undefined || this.id > 0)
        {
            this._service.getEmployeeById(this.id)
                .then(data => {
                    console.log(data);
                    this.model = data;
                })
        }
    }

   
    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }
}