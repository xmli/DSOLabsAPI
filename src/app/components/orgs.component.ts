import { Component } from '@angular/core';
import { OrgsService} from '../services/orgs.service';
import {ProPublicaOrg} from '../components/propublica.model';
import {GuideStarOrg} from '../components/guidestar.model';
import { GuideStarSearchParams } from './params.model';

@Component({
  moduleId: module.id,
  selector: 'orgs',
  templateUrl: 'orgs.component.html',
  styleUrls: ['orgs.component.css'],
  providers: [OrgsService]
})

export class OrgsComponent  {
  /****************************/
  /*  ProPublica API          */
  /****************************/
  requestEIN: number = 954806856;
  propublicOrg: ProPublicaOrg = {
    id: null,
    ein: null,
    name: "",
    address: "",
    city: "",
    state: "",
    zipcode: ""
  };

  /****************************/
  /*  GuideStar Detail API    */
  /****************************/
  requestID: number = 7831216;
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

  /****************************/
  /*  GuideStar Search API    */
  /****************************/  
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
  gsSearched:boolean = false;
  currPage: number = 1;

  /****************************/
  /*  Foundation Center API   */
  /****************************/
  foundationCenterAPIs = [
    {
      listName: 'Top 50 Foundations',
      api: 'foundations/top50/rankings.json'
    }
    // {
    //   listName: 'Top 50 Total',
    //   api: 'foundations/top50/total.json'
    // },
    // {
    //   listName: 'Organization Types',
    //   api: 'foundations/organization_types/list.json?'
    // },
    // {
    //   listName: 'Organization Type Summary',
    //   api: 'foundations/organization_types/summary.json?'
    // }
  ];
  FCQueryList: string = 'foundations/top50/rankings.json';
  states = [
    {
        name: "Alabama",
        abbreviation: "AL"
    },
    {
        name: "Alaska",
        abbreviation: "AK"
    },
    {
        name: "Arizona",
        abbreviation: "AZ"
    },
    {
        name: "Arkansas",
        abbreviation: "AR"
    },
    {
        name: "California",
        abbreviation: "CA"
    },
    {
        name: "Colorado",
        abbreviation: "CO"
    },
    {
        name: "Connecticut",
        abbreviation: "CT"
    },
    {
        name: "Delaware",
        abbreviation: "DE"
    },
    {
        name: "District Of Columbia",
        abbreviation: "DC"
    },
    {
        name: "Florida",
        abbreviation: "FL"
    },
    {
        name: "Georgia",
        abbreviation: "GA"
    },
    {
        name: "Hawaii",
        abbreviation: "HI"
    },
    {
        name: "Idaho",
        abbreviation: "ID"
    },
    {
        name: "Illinois",
        abbreviation: "IL"
    },
    {
        name: "Indiana",
        abbreviation: "IN"
    },
    {
        name: "Iowa",
        abbreviation: "IA"
    },
    {
        name: "Kansas",
        abbreviation: "KS"
    },
    {
        name: "Kentucky",
        abbreviation: "KY"
    },
    {
        name: "Louisiana",
        abbreviation: "LA"
    },
    {
        name: "Maine",
        abbreviation: "ME"
    },
    {
        name: "Maryland",
        abbreviation: "MD"
    },
    {
        name: "Massachusetts",
        abbreviation: "MA"
    },
    {
        name: "Michigan",
        abbreviation: "MI"
    },
    {
        name: "Minnesota",
        abbreviation: "MN"
    },
    {
        name: "Mississippi",
        abbreviation: "MS"
    },
    {
        name: "Missouri",
        abbreviation: "MO"
    },
    {
        name: "Montana",
        abbreviation: "MT"
    },
    {
        name: "Nebraska",
        abbreviation: "NE"
    },
    {
        name: "Nevada",
        abbreviation: "NV"
    },
    {
        name: "New Hampshire",
        abbreviation: "NH"
    },
    {
        name: "New Jersey",
        abbreviation: "NJ"
    },
    {
        name: "New Mexico",
        abbreviation: "NM"
    },
    {
        name: "New York",
        abbreviation: "NY"
    },
    {
        name: "North Carolina",
        abbreviation: "NC"
    },
    {
        name: "North Dakota",
        abbreviation: "ND"
    },
    {
        name: "Ohio",
        abbreviation: "OH"
    },
    {
        name: "Oklahoma",
        abbreviation: "OK"
    },
    {
        name: "Oregon",
        abbreviation: "OR"
    },
    {
        name: "Pennsylvania",
        abbreviation: "PA"
    },
    {
        name: "Rhode Island",
        abbreviation: "RI"
    },
    {
        name: "South Carolina",
        abbreviation: "SC"
    },
    {
        name: "South Dakota",
        abbreviation: "SD"
    },
    {
        name: "Tennessee",
        abbreviation: "TN"
    },
    {
        name: "Texas",
        abbreviation: "TX"
    },
    {
        name: "Utah",
        abbreviation: "UT"
    },
    {
        name: "Vermont",
        abbreviation: "VT"
    },
    {
        name: "Virginia",
        abbreviation: "VA"
    },
    {
        name: "Washington",
        abbreviation: "WA"
    },
    {
        name: "West Virginia",
        abbreviation: "WV"
    },
    {
        name: "Wisconsin",
        abbreviation: "WI"
    },
    {
        name: "Wyoming",
        abbreviation: "WY"
    }
  ];
  selectedState: string = "CA";
  selectedYear: string;
  rankOptions = [
    "giving",
    "assets",
    "gifts_received"
  ]
  selectedRankby:string = "giving";
  orgTypes = [
    "all",
    "community",
    "corporate",
    "family",
    "independent",
    "operating"
  ]
  selectedOrgType:string = "all";
  foundationCenterResults:FCResults[];
  fcSearched:boolean = false;


  /****************************/
  /*  Class Constructor       */
  /****************************/
  constructor(private orgsService: OrgsService) { }

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
        this.gsSearched = true;
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

  getFoundationCenterResults() {
    let stringParam = ("&rank_by=" + this.selectedRankby + "&year=" + this.selectedYear + 
            "&funder_location=state:" + this.selectedState + "&organization_type=" + this.selectedOrgType);
    this.orgsService.getFoundationCenterAPI(this.FCQueryList, stringParam).subscribe(
      data => {
        this.foundationCenterResults = data["response"]["rankings"];
        // console.log(this.foundationCenterResults);
        this.fcSearched = true;
      },
      err => {
        console.error(err);
      })
  }
}

interface SearchResults {
  total_hits: number,
  showing: string,
  hits: GuideStarOrg[]
}

interface FCResults {
  assets:{
    amount:number,
    pct:number
  },
  gifts_received:{
    amount:number,
    pct:number
  },
  giving:{
    amount:number,
    pct:number
  },
  foundation:{
    name:string
  },
  state:{
    name:string
  },
  type:{
    name:string
  }
}