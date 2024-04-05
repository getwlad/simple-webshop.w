import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../models/product-model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = "https://rest-api-products.up.railway.app/products";

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  showMsg(msg: string, isError: boolean = false) {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-sucess"],
    });
  }
  errorHandler(e: any): Observable<any> {
    this.showMsg("Ocorrou algum  erro", true);
    return EMPTY;
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  show(id: any): Observable<Product> {
    const pUrl = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(pUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: any): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  upload(formdata: FormData): Observable<any> {
    let client_id = "764b1680eee9ed4";
    const headers = new HttpHeaders({
      authorization: `Client-ID ${client_id}`,
    });
    const url = "https://api.imgur.com/3/image";
    return this.http
      .post<FormData>(url, formdata, {
        headers: headers,
      })
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }
}
