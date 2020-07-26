import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private image: any;
  private imageOriginal: any;
  userData: any;

  editProfilForm = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    imgProfile: new FormControl('')
  });

  private initValuesForm(){
    this.editProfilForm.patchValue({
      name: this.userData.name,
      phone: this.userData.phone,
      imgProfile: this.userData.imgProfile
    });
  }

  constructor(private companySvc: CompanyService) { }

  ngOnInit() {
    this.companySvc.companyData(this.companySvc.userId)
                   .subscribe(resp => {
                     this.userData = resp;
                     this.image = this.userData.imgProfile;
                     this.imageOriginal = this.userData.imgProfile;
                     this.initValuesForm();
                   });
  }
  editProfileUser(perfil: any){
    console.log('Nombre: ', perfil.name);
    console.log('Tel: ', perfil.phone);
    console.log('Imagen: ', perfil.imgProfile);

    if (this.image === this.imageOriginal) {
      perfil.imgProfile = this.imageOriginal;
      this.companySvc.simpleUpdateProfileUser(perfil.name, perfil.phone)
                     .then();
    } else {
      this.companySvc.uploadImageProfile(this.image, perfil.name, perfil.phone);
    }
  }

  handleImage(event: any){
    this.image = event.target.files[0];
    console.log('imagen: ', this.image );
  }

}
