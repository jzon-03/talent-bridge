import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
export interface Job {
    id: number;
    title: string;
    department: string;
    location: string;
    salary: string;
    description: string;
  shortDescription?: string;
    tags: string[];
}
@Component({
  selector: 'app-jobs',
  standalone: false,
  templateUrl: './jobs.html',
  styleUrls: ['./jobs.css'],
})
export class Jobs implements OnInit {
  private http = inject(HttpClient);

  /** jobs signal populated from the JSON data source */
  jobs = signal<Job[]>([]);

  ngOnInit(): void {
    this.http.get<{ jobPostings: any[] }>('data/gleason_job_openings.json').subscribe(resp => {
      const postings = resp?.jobPostings ?? [];
      const mapped = postings.map(p => {
        const raw = p.jobDescription ?? '';
        // basic strip HTML tags and decode a few common entities for preview
        const strip = (s: string) => s.replace(/<[^>]*>/g, '')
                                  .replace(/&nbsp;/g, ' ')
                                  .replace(/&amp;/g, '&')
                                  .replace(/&rsquo;/g, "'")
                                  .replace(/&lsquo;/g, "'")
                                  .replace(/&ldquo;/g, '"')
                                  .replace(/&rdquo;/g, '"')
                                  .trim();
        const preview = strip(raw).slice(0, 100);

        return ({
        id: p.jobPostingId ?? p.jobReqId ?? 0,
        title: p.jobTitle ?? 'Untitled',
        department: p.clientNamespace ? (p.clientNamespace.charAt(0).toUpperCase() + p.clientNamespace.slice(1)) : '',
        location: (p.postingLocations && p.postingLocations.length)
          ? (p.postingLocations[0].cityName ? `${p.postingLocations[0].cityName}, ${p.postingLocations[0].stateCode}` : p.postingLocations[0].formattedAddress)
          : '',
        salary: p.salary ?? '',
        description: p.jobDescription ?? '',
        shortDescription: preview + (preview.length >= 100 ? '…' : ''),
        tags: [p.clientNamespace, p.isEvergreen ? 'Evergreen' : null].filter(Boolean) as string[]
      } as Job);
      });

      this.jobs.set(mapped);
    });
  }
}
