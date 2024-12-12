import { Component, OnDestroy, OnInit, TemplateRef, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ContainerComponent } from "./container/container.component";
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { RxjsExampleComponent } from "./rxjs-example/rxjs-example.component";

@Component({
  selector: 'app-root',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatTabsModule,
    MatCardModule,
    DatePipe,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    ContainerComponent,
    ContainerComponent,
    MatDialogModule,
    EllipsisPipe,
    SentenceCasePipe,
    StatusPipe,
    RxjsExampleComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'customDemo';
  hobbies = ['Cutting', 'Reading', 'Hiking', 'Larping', 'Sewing', 'Disc Golf', 'Yard Work', 'Sleeping'];
  name = signal('custom');  // can use signals
  name$ = toObservable(this.name);
  dateOfBirth = new Date(); // or primitives
  hobby = this.hobbies[0];
  dialogRef?: MatDialogRef<unknown>;

  flatJsonData: {[key: string]: string} = {
    name: 'custom',
    location: 'South Jordan',
    color: 'green',
    postalCode: '84006'
  }
  flatJsonDataKeys = Object.keys(this.flatJsonData);

  private subs: Subscription[] = [];

  get reactiveHobbies() {
    return this.hobbies.map(h => `Reactive ${h}`);
  }

  get formData() {
    return this.form.getRawValue();
  }

  form!: FormGroup;
  logInfo = (info: unknown) => console.info('value changed: ', info);

  // Reactive Forms and form control
  constructor(private fb: FormBuilder, private dialogService: MatDialog) { }

  ngOnInit() {
    this.initForm();
    this.listenToValueChanges();
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  protected openDialog(template: TemplateRef<unknown>) {
    this.dialogRef = this.dialogService.open(template);
  }

  protected closeDialog() {
    this.dialogRef?.close();
  }

  private initForm() {
    this.form = this.fb.group({
      name: 'Reactive custom',
      dateOfBirth: new Date(),
      hobby: this.reactiveHobbies[0]
    })
  }

  private listenToValueChanges() {
    this.subs.push(
      this.name$.subscribe(result => console.info(`name changed: ${result}`)),
      this.form.valueChanges.subscribe(result => console.info(`value changed: `, result)),
    );
  }
}
