import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { AddItemComponent, MY_FORMATS } from '../../add-item/add-item.component';
import { Company, Experience } from '../experience.component';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css'],
  providers:[
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    }],
})

export class AddExperienceComponent extends AddItemComponent{
  @Input() companies:Company[] = [];

  constructor(override formBuilder:FormBuilder, override modalService:NgbModal, override datepipe:DatePipe){
    super(formBuilder, modalService, datepipe);
    this.form = this.formBuilder.group({
      id:undefined,
      company:['', [Validators.required, Validators.minLength(2)]],
      employType:['', [Validators.required]],
      startDate:['', [Validators.required]],
      endDate:[{value:'', disabled:false}, []],
      current:[false||undefined, []],
      description:['', []]
    },
    {validator:this.finishedOrCurrent('endDate', 'current')});

    this.initialValue = this.form.value;
  }

  finishedOrCurrent(affectedControl: string, toggleRequire: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[affectedControl];
      const requireFactor = formGroup.controls[toggleRequire];
      if (control.errors && !control.errors['required']) {
        return;
      }
      if (!control.value && (requireFactor.value === false || !requireFactor.value)) {
        control.setErrors({ required: true });
      } else {
        control.setErrors(null);
      }
    }
  }

  get Company(){
    return this.form.get('company');
  }
  get EmployType(){
    return this.form.get('employType');
  }
  get StartDate(){
    return this.form.get('startDate');
  }
  get EndDate(){
    return this.form.get('endDate');
  }
  get Current(){
    return this.form.get('current');
  }
  get Description(){
    return this.form.get('description');
  }
  
  loadEditData(item:Experience){
    this.form.patchValue({
      id: item.id,
      company: item.company,
      employType: item.employType,
      startDate: moment(item.startDate),
      endDate: moment(item.endDate),
      current: item.current,
      description: item.description
    })
  }

  ngOnInit(): void {
    this.Current!.valueChanges.subscribe(value => {
       if (value) {
          this.EndDate!.disable();
       } else {
          this.EndDate!.enable();
       }
    }) 
  }
}