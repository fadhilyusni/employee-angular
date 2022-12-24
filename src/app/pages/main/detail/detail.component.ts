import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Employee } from '../../model/employee.model';
import { EmployeeServiceService } from '../../service/employee-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  employee!: Employee;

  constructor(
    private empService: EmployeeServiceService,
    private readonly route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: Params) => {
        const { id } = params;
        this.empService.get(+id).subscribe({
          next: (employee: Employee) => {
            this.employee = employee;
          },
        });
      },
    });
  }
}
