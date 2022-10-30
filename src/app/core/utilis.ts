import { HttpErrorResponse } from "@angular/common/http";

export class Utils {
  public static formatError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return 'An error occurred: ' + error.error.message;
    } else {
      let msg = "Unknown error";
      if (error.error && typeof error.error === 'string') {
        msg = <string>error.error;
      }
      else if (error.message) {
        msg = error.message;
      }
      return `Backend returned code ${error.status}, ${error.error}`;
    }
  };
}