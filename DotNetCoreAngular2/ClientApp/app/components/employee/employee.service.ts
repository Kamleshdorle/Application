import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Employee } from './Employee'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class EmployeeService {
    constructor(private http: Http) { }
   

    getList(): Observable<Employee[]> {
        return this.http.get('/api/Employee/EmployeeList')
            .map((response: Response) => <Employee[]>response.json())
            .do(data => console.log("All = " + JSON.stringify(data)))
            .catch(this.handleErrorObservable)
    }

    getEmployeeList(): Promise<Employee[]> {
        return this.http.get('/api/Employee/EmployeeList')
            .toPromise()
            .then(response => this.extractArray(response))
            .catch(this.handleErrorPromise)
    }

    getEmployeeById(id): Promise<Employee> {
        return this.http.get('/api/Employee/EmployeeById/?id=' + id)
            .toPromise()
            .then(response => this.extractArray(response))
            .catch(this.handleErrorPromise)
    }

    Add(model) {
        let headers = new Headers({ 'Content-Type': 'application/json; charste=utf-8' });
        let options = new RequestOptions({ headers: headers });
        delete model["id"];
        let body = JSON.stringify(model);
        return this.http.post('/api/Employee/', body, options)
            .toPromise()
            .catch(this.handleErrorPromise);
    }

    Update(model) {
        let headers = new Headers({ 'Content-Type': 'application/json; charste=utf-8' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(model);
        return this.http.put('/api/Employee/', body, options)
            .toPromise()
            .catch(this.handleErrorPromise);
    }

    Delete(id)
    {
        return this.http.delete('/api/Employee/?id=' + id)
            .toPromise()
            .catch(this.handleErrorPromise);
    }


    protected extractArray(res: Response, showprogress: boolean = true) {
        let data = res.json();
        return data || [];
    }

    protected handleErrorPromise(error: any): Promise<void> {
        try {
            error = JSON.parse(error._body);
        } catch (e) {
        }

        let errMsg = error.errorMessage
            ? error.errorMessage
            : error.message
                ? error.message
                : error._body
                    ? error._body
                    : error.status
                        ? `${error.status} - ${error.statusText}`
                        : 'unknown server error';

        console.error(errMsg);
        return Promise.reject(errMsg);
    }

    protected handleErrorObservable(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}


