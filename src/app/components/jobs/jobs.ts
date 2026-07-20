import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
export interface Job {
    id: number;
    title: string;
    department: string;
    location: string;
    salary: string;
    description: string;
    tags: string[];
}
@Component({
  selector: 'app-jobs',
  standalone: false,
  templateUrl: './jobs.html',
  styleUrls: ['./jobs.css'],
})
export class Jobs {
private http = inject(HttpClient);

    jobs: Job[] = [];

    ngOnInit(): void {
        this.http
            .get<Job[]>('data/jobs.json')
            .subscribe(data => this.jobs = data);
    }
}
