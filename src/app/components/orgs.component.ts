import { Component } from '@angular/core';
import { OrgsService} from '../services/orgs.service';
import {ProPublicaOrg} from '../components/propublica.model';
import {GuideStarOrg} from '../components/guidestar.model';
import { GuideStarSearchParams } from './params.model';

@Component({
  moduleId: module.id,
  selector: 'orgs',
  templateUrl: 'orgs.component.html',
  providers: [OrgsService]
})

export class OrgsComponent  {
  public currPage: number = 1;

  requestEIN: number = 954806856;
  requestID: number = 7831216;

  propublicOrg: ProPublicaOrg = {
    id: null,
    ein: null,
    name: "",
    address: "",
    city: "",
    state: "",
    zipcode: ""
  };

  guidestarOrg: GuideStarOrg = {
    organization_id: null,
    ein: null,
    organization_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip: "",
    mission: ""
  }

  searchParams: GuideStarSearchParams = {
    organization_id: null,
    ein: null,
    organization_name: "",
    city: "",
    state: "",
    zip: "",
    participation: ""
  }

  guideStarSearchResults:SearchResults;
  searched:boolean = false;

  constructor(private orgsService: OrgsService) {
  }

  getProPublicaOrg() {
    this.orgsService.getProPublicaAPI(this.requestEIN).subscribe(
      data => {
        this.propublicOrg = data["organization"];
      },
      err => {
        console.error(err);
      })
  }

  getGuideStarOrg() {
    this.orgsService.getGuideStarAPI(this.requestID).subscribe(
      data => {
        this.guidestarOrg = data;
      },
      err => {
        console.error(err);
      })
  }

  submitParams() {
    let stringParams = this.stringifyParams(this.searchParams);
    console.log("Calling Search API..." + stringParams);
    this.orgsService.getGuideStarSearchAPI(stringParams, this.currPage).subscribe(
      data => {
        this.guideStarSearchResults = data;
        this.searched = true;
      },
      err => {
        console.error(err);
      })
  }

  stringifyParams(params:GuideStarSearchParams) {
      let stringParam = "?q=";
      for (var key in params) {
          if (params.hasOwnProperty(key)) {
              if(params[key] !== "" && params[key] !== null) {
                  // console.log(key + " -> " + params[key]);
                  stringParam += (key + ":" + params[key] + "&");
              }
          }
      }
      if(stringParam === "?q=") stringParam = "";
      else stringParam = stringParam.slice(0, -1);

      return stringParam;
  }

  prevPage():void {
    if(this.currPage > 1) {
      this.currPage--;
      this.submitParams();
    }
  }
  nextPage(): void {
      this.currPage++;
      this.submitParams();
  }

  // public pageChanged(event: any): void {
  //   console.log('Page changed to: ' + event.page);
  //   console.log('Number items per page: ' + event.itemsPerPage);
  // }
}

interface SearchResults {
  total_hits: number,
  showing: string,
  hits: GuideStarOrg[]
}