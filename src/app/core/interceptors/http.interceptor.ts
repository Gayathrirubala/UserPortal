import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoaderService } from '../../shared/services/loader.service';
import { ApiService } from '../services/api.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);
  const apiservice=inject(ApiService);

  loader.show();

  return next(req).pipe(
    catchError((error) => {
      console.error('API Error:', error);

      let errorMessage = 'Something went wrong!';
      if (error.status === 0) {
        errorMessage = 'Network error';
      } else if (error.status === 404) {
        errorMessage = 'Data not found';
      } else if (error.status === 500) {
        errorMessage = 'Server error';
      }

      apiservice.showErrorMsg(errorMessage);

      return throwError(() => error);
    }),
    finalize(() => {
      loader.hide(); 
    })
  );
};