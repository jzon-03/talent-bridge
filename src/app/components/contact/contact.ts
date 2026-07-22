
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  submitting = signal(false);
  status = signal<string | null>(null);

  onSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      job: String(fd.get('job') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
    };

    if (!payload.name || !payload.email || !payload.phone) {
      this.status.set('Please provide your name, email, and phone.');
      return;
    }

    this.submitting.set(true);
    this.status.set(null);

    // Simulate async submit
    setTimeout(() => {
      this.submitting.set(false);
      this.status.set('Your request has been received. I will review and follow up.');
      form.reset();
    }, 700);
  }
}
