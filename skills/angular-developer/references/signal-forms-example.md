---
name: signal-forms-example
description: Use when looking for a complete, concise Angular Signal Forms example covering nested groups, validators, conditional hidden fields, and async submit.
---

# Signal Forms — Full Example

## `src/app/app.ts`

```ts
import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import { form, FormField, submit, required, email, min, hidden } from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormField],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  model = signal({
    personalInfo: { firstName: '', email: '', age: 0 },
    tripDetails: { destination: 'Mars', launchDate: '' },
    package: { tier: 'economy', extras: [] as string[] },
  });

  bookingForm = form(this.model, (s) => {
    required(s.personalInfo.firstName, {message: 'First name is required'});
    required(s.personalInfo.email, {message: 'Email is required'});
    email(s.personalInfo.email, {message: 'Invalid email address'});
    required(s.personalInfo.age, {message: 'Age is required'});
    min(s.personalInfo.age, 18, {message: 'Must be at least 18'});

    required(s.tripDetails.destination);
    required(s.tripDetails.launchDate);

    hidden(s.package.extras, ({valueOf}) => valueOf(s.package.tier) === 'economy');
  });

  onSubmit() {
    submit(this.bookingForm, async () => {
      console.log('Booking Confirmed:', this.model());
    });
  }
}
```

## `src/app/app.html`

```html
<form (submit)="onSubmit(); $event.preventDefault()">
  <h1>Booking</h1>

  <section>
    <h2>Personal Info</h2>
    <label>First Name <input [formField]="bookingForm.personalInfo.firstName" /></label>
    <label>Email <input type="email" [formField]="bookingForm.personalInfo.email" /></label>
    <label>Age <input type="number" [formField]="bookingForm.personalInfo.age" /></label>
  </section>

  <section>
    <h2>Trip Details</h2>
    <label>
      Destination
      <select [formField]="bookingForm.tripDetails.destination">
        <option value="Mars">Mars</option>
        <option value="Moon">Moon</option>
      </select>
    </label>
    <label>Launch Date <input type="date" [formField]="bookingForm.tripDetails.launchDate" /></label>
  </section>

  <section>
    <h2>Package</h2>
    <label><input type="radio" value="economy" [formField]="bookingForm.package.tier" /> Economy</label>
    <label><input type="radio" value="business" [formField]="bookingForm.package.tier" /> Business</label>

    @if (!bookingForm.package.extras().hidden()) {
      <select multiple [formField]="bookingForm.package.extras">
        <option value="wifi">WiFi</option>
        <option value="gym">Gym</option>
      </select>
    }
  </section>

  <button [disabled]="bookingForm().invalid()">Submit</button>
</form>
```
