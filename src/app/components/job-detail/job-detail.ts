import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-job-detail',
  standalone: false,
  templateUrl: './job-detail.html',
  styleUrls: ['./job-detail.css'],
})
export class JobDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  job = signal<any | null>(null);
  safeDescription = signal<SafeHtml | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('jobPostingId'));
    this.http.get<{ jobPostings: any[] }>('data/gleason_job_openings.json').subscribe(resp => {
      const posting = (resp?.jobPostings ?? []).find(p => Number(p.jobPostingId) === id || Number(p.jobReqId) === id);
      this.job.set(posting ?? null);
      if (posting?.jobDescription) {
        this.safeDescription.set(this.sanitizer.bypassSecurityTrustHtml(posting.jobDescription));
      }
    });
  }
}
