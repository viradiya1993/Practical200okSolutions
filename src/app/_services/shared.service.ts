import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { adjectives, colors, Config, uniqueNamesGenerator } from 'unique-names-generator';

const BACKEND_URL = environment.apiUrl + '';

const customConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: " ",
  length: 2
};

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private spinner: NgxSpinnerService,
    private router: Router, private http: HttpClient) { }
  // for show loader
  showLoader() {
    this.spinner.show();
  }

  // for hide loader
  hideLoader() {
    this.spinner.hide();
  }

  //for success message
  swalSuccess(successMessage: any) {
    Swal.fire('', successMessage, 'success')
  }

  //for error message
  swalError(errorMessage: any) {
    Swal.fire('', errorMessage, 'error')
  }

  //Get All Student Cards
  getAllStudents(take: number): string[] {
    return Array(take)
    .fill("")
    .map(e => uniqueNamesGenerator(customConfig));
  }
}
