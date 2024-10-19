import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  // Define the columns to be displayed
  displayedColumns: string[] = ['imageUrl','id', 'firstName', 'lastName', 'email', 'age', 'dob', 'salary', 'address', 'contactNumber'];
  // Data source for the table
  employees = new MatTableDataSource<any>([]);

  // Total salary
  totalSalary: number = 0;

  // ViewChild to handle pagination and sorting
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees.data = data.map(employee => this.mapEmployee(employee));
      this.calculateTotalSalary(); // Call the total salary calculation
    });
  }

  ngAfterViewInit(): void {
    this.employees.paginator = this.paginator;
    this.employees.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employees.filter = filterValue.trim().toLowerCase();
  }

  // Calculate the total salary and update the totalSalary property
  calculateTotalSalary(): void {
    this.totalSalary = this.employees.data.reduce((sum, employee) => sum + (employee.salary || 0), 0);
  }

  // Map employee data for handling missing fields
  private mapEmployee(employee: any): Employee {
    return {
      id: employee.id || 'N/A',
      age: employee.age || 'Unknown',
      dob: employee.dob && employee.dob !== 'Invalid date' ? employee.dob : 'Invalid DOB',
      email: employee.email || 'No email',
      salary: employee.salary !== null && employee.salary !== undefined ? +employee.salary : 0, // Convert salary to number using +
      address: employee.address || 'No address',
      imageUrl: employee.imageUrl || 'No image',
      lastName: employee.lastName || 'No last name',
      firstName: employee.firstName || 'No first name',
      contactNumber: employee.contactNumber || 'No contact'
    };
  }
  
}
