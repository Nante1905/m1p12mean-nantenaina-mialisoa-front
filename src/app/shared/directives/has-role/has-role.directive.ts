import { Directive, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { RoleType } from '../../types/Auth';

@Directive({
  selector: '[hasRole]',
})
export class HasRoleDirective {
  hasRole = input.required<RoleType[]>();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.hasRole(this.hasRole())) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
