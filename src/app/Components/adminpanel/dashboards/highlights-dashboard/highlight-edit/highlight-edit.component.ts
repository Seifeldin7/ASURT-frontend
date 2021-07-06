import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Highlight } from 'src/app/Models/highlight.interface';
import { HighlightsService } from 'src/app/Services/adminpanel/highlights.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-highlight-edit',
  templateUrl: './highlight-edit.component.html',
  styleUrls: ['./highlight-edit.component.css']
})
export class HighlightEditComponent implements OnInit {

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
  card_form:FormGroup = this.formBuilder.group({
    title: [null, [Validators.required]],
    description:[null,[Validators.required]],
    image:[null,[Validators.required]],
    url:[null,[Validators.required]],
    active:[false,[Validators.required]]
  })

  constructor(private activatedRoute:ActivatedRoute,
              private highlightsServices:HighlightsService,
              private formBuilder:FormBuilder,
              private toastr:ToastrService) {}

  ngOnInit() {
    if(this.activatedRoute.snapshot.params['id']){
      this.editmode = true;
      this.highlightsServices.get_highlights_by_id(this.activatedRoute.snapshot.params['id']).subscribe(card=>{
        this.updating_card_id = card.id;
        this.card_form.patchValue({
          title: card.title,
          description: card.description,
          url: card.url,
          active: card.active,
          image: card.image[card.image.length -1].image,
        })
      })
    }
  }

  onSubmit(){
    this.submitted = true;

    if(this.editmode){
      this.highlightsServices.update_highlight(this.updating_card_id,{
        title:this.card_form.value.title,
        description:this.card_form.value.description,
        image: (this.croppedImage) ? this.card_form.value.image : '',
        url:this.card_form.value.url,
        active:this.card_form.value.active
      }).subscribe(
        (res:any) => {
          this.toastr.success(res.msg,"Success");
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
      this.highlightsServices.post_highlight({
        title:this.card_form.value.title,
        description:this.card_form.value.description,
        image:this.card_form.value.image,
        url:this.card_form.value.url,
        active:this.card_form.value.active
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
