import { Component, OnInit } from '@angular/core';
import { ParacticeOfferService } from '../../../services/paractice-offer.service';
import { PracticePostulationService } from '../../../services/practice-postulation.service';
import { Router } from '@angular/router';
import { PracticeOfferModel } from '../../../models/practice-offer.model';
import { PracticePostulationModel } from '../../../models/practice-postulation.model';
import { PracticePostulationUserModel } from '../../../models/practice-postulation-user.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-practice-postulation-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './practice-postulation-list.component.html',
  styleUrl: './practice-postulation-list.component.css'
})
export class PracticePostulationListComponent implements OnInit {
  loading: boolean = false;
  practiceOfferList: PracticeOfferModel[] = [];
  practicePostulationList: PracticePostulationModel[] = [];
  practiceOfferListUser: PracticePostulationUserModel[] = [];

  constructor(
    private practiceOfferService: ParacticeOfferService,
    private practicePostulationService: PracticePostulationService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.LoadPracticePostulations();
  }

  LoadPracticeOffers() {
    this.practiceOfferService.GetPracticeOfferList().subscribe(
      data => {
        this.practiceOfferList = data;
        this.FilterPracticePostulations();
      },
      error => {
      }
    )
  }

  LoadPracticePostulations() {
    this.loading = true;
    this.practicePostulationService.GetPracticePostulationsByUser().subscribe(
      data => {
        this.practicePostulationList = data;
        this.LoadPracticeOffers();
      },
      error => {
      }
    )
  }

  FilterPracticePostulations() {
    this.practicePostulationList.forEach(p => {
      let practiceOffer = this.practiceOfferList.find(o => o.id == p.practiceOfferId);
      if (practiceOffer) {
        let practiceOfferUser: PracticePostulationUserModel = {
          faculty: practiceOffer.faculty,
          description: practiceOffer.description,
          semester: practiceOffer.semester,
          userId: p.userId,
          practiceOfferId: p.practiceOfferId,
          status: p.status,
          createdAt: this.datePipe.transform(p.createdAt, 'dd-MM-yyyy')?.toString()
        };

        this.practiceOfferListUser.push(practiceOfferUser);
      }
    });

    this.loading = false;
  }

}
