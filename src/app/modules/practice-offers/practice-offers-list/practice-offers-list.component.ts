import { Component, OnInit } from '@angular/core';
import { PracticeOfferModel } from '../../../models/practice-offer.model';
import { ParacticeOfferService } from '../../../services/paractice-offer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { SecurityService } from '../../../services/security.service';
import { PracticePostulationService } from '../../../services/practice-postulation.service';
import { PracticePostulationModel } from '../../../models/practice-postulation.model';


@Component({
  selector: 'app-practice-offers-list',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './practice-offers-list.component.html',
  styleUrl: './practice-offers-list.component.css'
})
export class PracticeOffersListComponent implements OnInit {
  selectedIndex: number = 0;
  loading: boolean = false;
  practiceOfferList: PracticeOfferModel[] = [];
  practicePostulationList: PracticePostulationModel[] = [];
  practiceOffer: PracticeOfferModel = {
    id: 0,
    area: '',
    description: '',
    year: 0,
    semester: 0,
    isActive: false
  };

  constructor(
    private practiceOfferService: ParacticeOfferService,
    private securityService: SecurityService,
    private practicePostulationService: PracticePostulationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.LoadPracticePostulations();
    this.LoadPracticeOffers();
  }

  LoadPracticeOffers() {
    this.loading = true;
    this.practiceOfferService.GetPracticeOfferList().subscribe(
      data => {
        this.loading = false;
        console.log(data);
        this.practiceOfferList = data;
        if (data.length > 0) {
          this.practiceOffer = data[0];
        }
      },
      error => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Se presentó un problema al consultar las ofertas de práctica.'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']);
          }
        });
      }
    )
  }

  LoadPracticePostulations() {
    this.practicePostulationService.GetPracticePostulationsByUser().subscribe(
      data => {
        console.log(data);
        this.practicePostulationList = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  IsApplyPostulation(practiceOfferId: number | undefined) {
    let apply: boolean = false;

    if (practiceOfferId && this.activeSession()) {
      let practicePostulation = this.practicePostulationList.find(p => p.practiceOfferId == practiceOfferId);
      if (practicePostulation) {
        apply = true;
      }
    }

    return apply;
  }

  viewPracticeOffer(practiceOffer: PracticeOfferModel, index: number) {
    this.practiceOffer = practiceOffer;
    this.selectedIndex = index;
  }

  ApplyPostulation(practiceOfferId: number | undefined) {
    console.log(practiceOfferId);
    if (practiceOfferId && this.activeSession()) {
      let practicePostulation: PracticePostulationModel = {
        status: "Postulación Enviada",
        userId: parseInt(this.securityService.getUserId().toString()),
        practiceOfferId: practiceOfferId
      };

      this.practicePostulationService.SavePracticePostulation(practicePostulation).subscribe(
        data => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Postulación realizada correctamente.'
          });
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Se presentó un problema al realizar la postulación'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/']);
            }
          });
        }
      );
    } else {
      this.router.navigate(['security/login']);
    }
  }

  activeSession() {
    return this.securityService.sessionExists();
  }
}
