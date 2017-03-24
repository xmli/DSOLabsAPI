import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Request, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {ProPublicaOrg} from '../components/propublica.model';
import {GuideStarOrg} from '../components/guidestar.model';
import { GuideStarSearchParams } from '../components/params.model';

import 'rxjs/add/operator/map';

@Injectable()
export class OrgsService {
    constructor(private _http: Http) {
        console.log('OrgsService initialized...');
    }

    private proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    private propublicaUrl = 'https://projects.propublica.org/nonprofits/api/v2/organizations/';
    private guidestarUrl = 'https://quickstartdata.guidestar.org/v1/quickstartdetail/';
    private guidestarSearchUrl = 'https://quickstartdata.guidestar.org/v1/quickstartsearch';

    getProPublicaAPI(ein:number): Observable<ProPublicaOrg> {
        let headers = new Headers();
        headers.append('X-Requested-With', 'XMLHttpRequest');
        return this._http.get(this.proxyUrl + this.propublicaUrl + ein + '.json', { headers: headers })
            .map(res => res.json())
            .retry(2)
            .catch(error => Observable.throw(error.json().error || 'Server error'));
    }

    getGuideStarAPI(id:number): Observable<GuideStarOrg> {
        let headers = new Headers();
        headers.append("Authorization", "Basic NjdiZDUwNmJlZjY1NDFjMTkyYmU4MWYxNThmNzI3YjU6");
        headers.append('X-Requested-With', 'XMLHttpRequest');
        return this._http.get(this.proxyUrl + this.guidestarUrl + id + '.json', { headers: headers })
            .map(res => res.json())
            .retry(3)
            .catch(error => Observable.throw(error.json().error || 'Server error'));
    }

    getGuideStarSearchAPI(params:string, pagenum:number=1) {
        console.log("String Param:" + params);
        let headers = new Headers();
        headers.append("Authorization", "Basic c2VhbmxpQGRzb2dsb2JhbC5vcmc6VzNkTjNzRDR5M0tLQDA5OA==");
        headers.append('X-Requested-With', 'XMLHttpRequest');
        let searchUrl = this.proxyUrl + this.guidestarSearchUrl + params + "&r=10" + "&p=" + pagenum;
        console.log(searchUrl);
        return this._http.get(searchUrl, { headers: headers })
            .map(res => res.json())
            .retry(3)
            .catch(error => Observable.throw(error.json().error || 'Server error'));
    }
}
