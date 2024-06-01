import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  // imports: [],
  template: `
<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
  `,
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

}
