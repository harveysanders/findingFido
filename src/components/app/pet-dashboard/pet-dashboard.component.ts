import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { PageService } from '../services/page.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';



@Component({
  selector: 'pet-dashboard',
  templateUrl: 'pet-dashboard.component.html',
  //styleUrls: ['pet-dashboard.component.css']
})
export class PetDashboardComponent {
  name: string;
  pet: any;
  photos: any;
  activities: any;


  constructor(
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private pageService: PageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.pageService.getPet(+params.get('id')))
      .subscribe(pet => {
        this.pet = pet;
        console.log(pet);
      });
  }

  onPictures(): void {
    this.pageService.getPhotos(this.pet.email_user)
      .then(info => {
        this.photos = info.photos;
        this.activities = info.activities
        console.log(info)
      })
  }    

  goBack(): void {
    this.location.back();
  }

  onSelect(): void {
    this.router.navigate(['/chat']);
  }
}



