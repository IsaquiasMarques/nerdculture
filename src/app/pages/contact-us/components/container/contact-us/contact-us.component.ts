import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactFacade } from '@contact-us/facades/contact.facade';
import { Contact } from '@core/models/contact.model';
import { Theme, ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ ReactiveFormsModule, NgClass ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {
  private themeService = inject(ThemeService).changeTheme(Theme.HOME);
  private contactFacade = inject(ContactFacade);

  constructor( private changeDetectorRef: ChangeDetectorRef ) {}

  contacts: Signal<Contact[]> = signal([]);

  contactFormGroup!: FormGroup;
  gettingInTouch: WritableSignal<boolean> = signal(false);
  getInTouchResponseStatus: WritableSignal<ResposeStatus> = signal(null);

  ngOnInit(): void {
    this.getContacts();

    this.contactFormGroup = new FormGroup({
      'fullname': new FormControl('', [ Validators.required ]),
      'email': new FormControl('', [ Validators.required, Validators.email ]),
      'subject': new FormControl('', [ Validators.required ]),
      'message': new FormControl('', [ Validators.required ])
    });

  }

  private getContacts(): void{
    this.contacts = this.contactFacade.contacts;
  }

  submitForm(): void{
    if(this.contactFormGroup.invalid) return;

    const formdata = new FormData();
    formdata.append('name', this.contactFormGroup.get('fullname')?.value);
    formdata.append('email', this.contactFormGroup.get('email')?.value),
    formdata.append('subject', this.contactFormGroup.get('subject')?.value);
    formdata.append('message', this.contactFormGroup.get('message')?.value);

    this.isGettingInTouch(true);
    this.contactFacade.getInTouch(formdata).subscribe({
      next: (response) => {
        this.changeGetInTouchStatus(response.code);
        this.isGettingInTouch(false);
        this.contactFormGroup.reset();
        this.resetGetInTouchResponseStatusAfter()
      },
      error: (error) => {
        this.changeGetInTouchStatus(error.code);
        this.isGettingInTouch(false);
        this.resetGetInTouchResponseStatusAfter()
      }
    });

  }

  isGettingInTouch(status: boolean): void{
    this.gettingInTouch.update(value => value = status);
  }

  changeGetInTouchStatus(code: ResposeStatus): void{
    this.getInTouchResponseStatus.update(val => val = code);
  }

  resetGetInTouchResponseStatusAfter(seconds: number = 3): void{
    let timeout = setTimeout(() => {
      this.getInTouchResponseStatus.update(val => val = null);
      clearTimeout(timeout);
    }, seconds * 1000);
  }

}

type ResposeStatus = null | 200 | 400 | 500 | 401 | 405;