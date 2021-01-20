import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SignaturePadModule } from '@ng-plus/signature-pad';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { NgxAutocomPlaceModule } from 'ngx-autocom-place';



import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { LoginComponent } from './views/login/login.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DbHeaderComponent } from './common/db-header/db-header.component';
import { DbOfficerHeaderComponent } from './common/db-officer-header/db-officer-header.component';
import { DbSidebarComponent } from './common/db-sidebar/db-sidebar.component';
import { DbInvestmentsComponent } from './views/db-investments/db-investments.component';
import { ReviewsComponent } from './views/reviews/reviews.component';
import { DbLeadListComponent } from './views/db-lead-list/db-lead-list.component';
import { DbAddInvestorComponent } from './views/db-add-investor/db-add-investor.component';
import { DbWelcomeLetterComponent } from './views/db-welcome-letter/db-welcome-letter.component';
import { DbBrokerAppointmentComponent } from './views/db-broker-appointment/db-broker-appointment.component';
import { DbClientListComponent } from './views/db-client-list/db-client-list.component';
import { ComplianceOfficerLoginComponent } from './views/compliance-officer-login/compliance-officer-login.component';
import { ComplianceOfficerForgotComponent } from './views/compliance-officer-forgot/compliance-officer-forgot.component';
import { DbBrokerListComponent } from './views/db-broker-list/db-broker-list.component';
import { DbBrokerDetailComponent } from './views/db-broker-detail/db-broker-detail.component';
import { DbClientProfileComponent } from './views/db-client-profile/db-client-profile.component';
import { DbBrokerClientProfileComponent } from './views/db-broker-client-profile/db-broker-client-profile.component';
import { DbInstructionsComponent } from './views/db-instructions/db-instructions.component';
import { AddLeadListComponent } from './views/add-lead-list/add-lead-list.component';
import { DbTasksComponent } from './views/db-tasks/db-tasks.component';
import { DbOfficerSidebarComponent } from './common/db-officer-sidebar/db-officer-sidebar.component';
import { OfficerHeaderComponent } from './common/officer-header/officer-header.component';
import { ComplianceOfficerInvestmentsComponent } from './views/compliance-officer-investments/compliance-officer-investments.component';
import { ComplianceOfficerTasksComponent } from './views/compliance-officer-tasks/compliance-officer-tasks.component';
import { DbAddIdComponent } from './views/db-add-id/db-add-id.component';
import { DbAddDisclosureComponent } from './views/db-add-disclosure/db-add-disclosure.component';
import { DbAddRecordAdviceComponent } from './views/db-add-record-advice/db-add-record-advice.component';
import { DbAddRiskProfilerComponent } from './views/db-add-risk-profiler/db-add-risk-profiler.component';
import { SetPasswordComponent } from './views/set-password/set-password.component';
import { ComplianceOfficerSetPasswordComponent } from './views/compliance-officer-set-password/compliance-officer-set-password.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    DbHeaderComponent,
    DbSidebarComponent,
    DbInvestmentsComponent,
    ReviewsComponent,
    DbLeadListComponent,
    DbAddInvestorComponent,
    DbWelcomeLetterComponent,
    DbBrokerAppointmentComponent,
    DbClientListComponent,
    ComplianceOfficerLoginComponent,
    ComplianceOfficerForgotComponent,
    DbOfficerHeaderComponent,
    DbBrokerListComponent,
    DbBrokerDetailComponent,
    DbClientProfileComponent,
    DbBrokerClientProfileComponent,
    DbInstructionsComponent,
    AddLeadListComponent,
    DbTasksComponent,
    DbOfficerSidebarComponent,
    OfficerHeaderComponent,
    ComplianceOfficerInvestmentsComponent,
    ComplianceOfficerTasksComponent,
    DbAddIdComponent,
    DbAddDisclosureComponent,
    DbAddRecordAdviceComponent,
    DbAddRiskProfilerComponent,
    SetPasswordComponent,
    ComplianceOfficerSetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CarouselModule,
    MatTableModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule,
    SignaturePadModule,
    NgxAutocomPlaceModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    // NgbModule
  ],
  providers: [
    MatNativeDateModule,
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
