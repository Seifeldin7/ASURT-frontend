import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from 'src/app/Services/adminpanel/events.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  editmode:boolean = false;
  updating_card_id:Number = null;
  submitted:boolean = false;

  /** Card Form */
  cropper_show = false;
  imageChangedEvent: any = null;
  croppedImage: any = null;
  onImgChange(event: any): void {
    this.imageChangedEvent = event;
    /** trigger cropper */
    this.cropper_show = true;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      this.card_form.patchValue({
      image:this.croppedImage
    })
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
    this.cropper_show = false;
    this.toastr.error('Select Valied Image','Error');
  }

  //id:Number,
  //name:string,
  //date:Date,
  //description:string,
  //status:boolean,
  //image:string,
  //type:string
  card_form:FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    description:[null,[Validators.required]],
    image:[null,[Validators.required]],
    event_type:[null,[Validators.required]],
    date:[null,[Validators.required]],
    status:[false,[Validators.required]]
  })

  constructor(private activatedRoute:ActivatedRoute,
              private eventsServices:EventsService,
              private formBuilder:FormBuilder,
              private toastr:ToastrService) {}

  ngOnInit() {
    if(this.activatedRoute.snapshot.params['id']){
      this.editmode = true;
      this.eventsServices.get_events_by_id(this.activatedRoute.snapshot.params['id']).subscribe(card=>{
        this.updating_card_id = card.id;
        this.card_form.patchValue({
          name: card.name,
          description: card.description,
          event_type: card.event_type,
          date: card.date,
          status: card.status,
          image: card.image,
        })
      })
    }
  }

  onSubmit(){
    this.submitted = true;

    if(this.editmode){
      this.eventsServices.update_event(this.updating_card_id,{
        name:this.card_form.value.name,
        description:this.card_form.value.description,
        image: (this.croppedImage) ? this.card_form.value.image : '',
        event_type:this.card_form.value.event_type,
        date:this.card_form.value.date,
        status:this.card_form.value.status
      }).subscribe(
        (res:any) => {
          if(res.status == true){
            this.toastr.success(res.msg,"Success");
          }else{
            this.toastr.error(res.msg,"Error");
          }
          this.submitted = false;
        },
        (err:any) => {
          if ('msg' in err.error) {
            this.toastr.error(err.error.msg, "Error")
          }
          else {
            this.toastr.error("Something went wrong", "Error")
          }
          this.submitted = false;
        }
      )
    }else{
      this.eventsServices.post_event({
        name:this.card_form.value.name,
        description:this.card_form.value.description,
        image:this.card_form.value.image,
        event_type:this.card_form.value.event_type,
        date:this.card_form.value.date,
        status:this.card_form.value.status
      }).subscribe((res:any) => {
        this.toastr.success(res.msg,"Success");
        this.submitted = false;
      }, err =>{
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
        this.submitted = false;
      });
    }


  }

}
