import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,CanDeactivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
    [x: string]: any;
    CanDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CreateRequestGuardService implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate, 
                  currentRoute: ActivatedRouteSnapshot, 
                  currentState: RouterStateSnapshot, 
                  nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate(); //the function will be called on the component, that's why we'll implement the function on the component.
    }   
}