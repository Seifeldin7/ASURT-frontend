import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReadVarExpr } from '@angular/compiler';
import { TeamsService } from 'src/app/Services/adminpanel/teams.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {

  editmode:boolean = false;
  
  submitted:boolean = false;
  
  
  updating_team_id:Number = null;
  updated_images = {
    /**
     * {
     *    achievement: {
     *      0: string 
     *      1: string 
     *    },
     *    team :{
     *      0: {image:string},
     *      1: {image:string}
     *    }
     * }
     */
    achievement: {},
    team: []
  };
  team_form:FormGroup = this.formBuilder.group({
    team_name: [null,[Validators.required]],
    team_type: ['Technical',[Validators.required]],
    team_description: [null,[Validators.required]],
    image: this.formBuilder.array([]),
    achievements: this.formBuilder.array([
      this.formBuilder.group({
        title:[null,[Validators.required]],
        position:[null,[Validators.required]],
        description:[null,[Validators.required]],
        year:[null,[Validators.required]],
        image:[null,[Validators.required]]
      })
    ])
  });

  get achievements(){
    return this.team_form.get('achievements') as FormArray;
  }

  get team_images(){
    return this.team_form.get('image') as FormArray;
  }

  add_team_image(value:string=null){
    this.team_images.push(
      this.formBuilder.group({
        image: value,
      })
    );
  }

  add_one_more_achievement(achievement:any=null){
    this.achievements.push(
      this.formBuilder.group({
        title:      [(achievement != null ? achievement.title       : null),[Validators.required]],
        position:   [(achievement != null ? achievement.position    : null),[Validators.required]],
        description:[(achievement != null ? achievement.description : null),[Validators.required]],
        year:       [(achievement != null ? achievement.year        : null),[Validators.required]],
        image:      [(achievement != null ? achievement.image       : null),[Validators.required]]
      })
    );
  }


  constructor(private formBuilder: FormBuilder,
              private toastr:ToastrService,
              private teamService:TeamsService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {

    if(this.activatedRoute.snapshot.params['id']){
      /**
       * If id exists in URL
       *  -trigger edit mode
       *  -get Team and update form with old data
       */
      this.editmode = true;
      this.teamService.get_team_by_id(this.activatedRoute.snapshot.params['id']).subscribe(
        team =>{
          this.updating_team_id = team.id;

          this.team_form.patchValue({
            team_name: team.name,
            team_description: team.description,
            team_type: team.team_type,
          });

          for(let img of team.image){
            this.add_team_image(img.image);
          }

          this.achievements.removeAt(0);
          for(let achievement of team.achievement){
            this.add_one_more_achievement(achievement);
          }

        }
      );
    }

  }


  achievement_image_change($event,index){
    /**
     * Read Achievement image field anf bind value to form
     */
    let image = $event.target.files[0];
    let reader = new FileReader();
    if (!image.type.match(/image-*/)) {
      alert('Select valid Image');
      return;
    }
    reader.onload = ((e:any)=>{
      let base64 = 'data:image/png;base64,' + btoa(e.target.result);
      if(this.editmode){
        this.updated_images.achievement[index] = base64;
      }
      this.achievements.at(index).patchValue({
        image: (base64)
      });
    })
    reader.readAsBinaryString(image);
  }

  team_images_change($event:any){
    /**
     * Read all files and push to team image array
     */
    let images:any = $event.target.files;

    if(images){
      for(let img of images){
        if (!img.type.match(/image-*/)) {
          alert('Select valid Images');
          return;
        }
      }
      for(let img of images){
        let reader = new FileReader();
        reader.onload = (e:any) => {
          let base64 = 'data:image/png;base64,' + btoa(e.target.result);
          if(this.editmode){
            this.updated_images.team.push({image:base64})
          }
          this.add_team_image(base64);
        }
        reader.readAsBinaryString(img);
      }
    }else{
      alert('Select Images');
      return;
    }
  }

  delete_image(type:string,index:number){
    if(confirm("Are you sure to delete this")){
      // TODO: delete from backend
      if(type == 'achievement'){
        this.achievements.at(index).patchValue({
          image:null
        })
      }else if(type == 'team'){
        this.team_images.removeAt(index);
      }
    }
  }

  delete_team(){
    if(confirm("Are you sure to delete this")){
      this.teamService.delete_team(this.updating_team_id);
    }
  }

  onSubmit(){
    this.submitted = true;

    if(this.editmode){
      /**
       * add updated image to achievement request and delete old images
       */
      let updated_achievement = this.achievements.value.slice();
      updated_achievement.forEach((element,index) => {
        if(index in this.updated_images.achievement){
          element.image = this.updated_images.achievement[index];
        }else{
          element.image = '';
        }
      });
      let team_data = {
        name:this.team_form.value.team_name,
        description:this.team_form.value.team_description,
        team_type:this.team_form.value.team_type,
        images: (this.updated_images.team.length > 0) ? this.updated_images.team : '',
        achievement:updated_achievement,
      };
      this.teamService.update_team(this.updating_team_id,team_data).subscribe(
        (res:any) => {
          this.toastr.success(res.msg,"Success");
          this.teamService.update_fetched_data();
          // TODO: Resirect
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
      let team_data = {
        name:this.team_form.value.team_name,
        description:this.team_form.value.team_description,
        team_type:this.team_form.value.team_type,
        images:this.team_images.value,
        achievement:this.achievements.value,
      }
      /** Post new team */
      this.teamService.post_team(team_data).subscribe(
        (res:any) => {
          this.toastr.success(res.msg,"Success");
          this.teamService.update_fetched_data();
          // TODO redirect
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
      );
    }
  }

}
