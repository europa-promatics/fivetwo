import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './views/homepage/homepage.component';
import { LoginComponent } from './views/login/login.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DbInvestmentsComponent } from './views/db-investments/db-investments.component'
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
import { UserGuard } from  './user/user.guard';
import { OfficerGuard } from  './user/officer.guard';
import { ComplianceOfficerInvestmentsComponent } from './views/compliance-officer-investments/compliance-officer-investments.component';
import { ComplianceOfficerTasksComponent } from './views/compliance-officer-tasks/compliance-officer-tasks.component';
import { DbAddIdComponent } from './views/db-add-id/db-add-id.component';
import { DbAddDisclosureComponent } from './views/db-add-disclosure/db-add-disclosure.component';
import { DbAddRecordAdviceComponent } from './views/db-add-record-advice/db-add-record-advice.component';
import { DbAddRiskProfilerComponent } from './views/db-add-risk-profiler/db-add-risk-profiler.component';
import { SetPasswordComponent } from './views/set-password/set-password.component';
import { ComplianceOfficerSetPasswordComponent } from './views/compliance-officer-set-password/compliance-officer-set-password.component';

import { DbEditClientComponent } from './views/db-edit-client/db-edit-client.component';


import { DbDocumentsComponent } from './views/db-documents/db-documents.component';
import { TermsAndConditionComponent } from './views/terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './views/privacy-policy/privacy-policy.component';



const routes: Routes = [
	{
		path: '',
		component: HomepageComponent,

	},
	{
		path: 'login',
		component: LoginComponent,


	},
	{
		path: 'forgotPassword',
		component: ForgotPasswordComponent,
		// canActivate: [UserGuard]
	},
	{
		path: 'set-password/:id/:security_code',
		component: SetPasswordComponent,
		// canActivate: [UserGuard]
	},
	{
		path: 'officer-set-password/:id/:security_code',
		component: ComplianceOfficerSetPasswordComponent,
		// canActivate: [UserGuard]
	},
	{
		path: 'termsAndCondition',
		component: TermsAndConditionComponent
	},
	{
		path: 'privacyPolicy',
		component: PrivacyPolicyComponent
	},
	// {
	// 	path: 'dashboard',
	// 	component: DashboardComponent,
	// 	canActivate: [UserGuard]
	// },
	// {
	// 	path: 'dbInvestment',
	// 	component: DbInvestmentsComponent
	// },
	// {
	// 	path: 'reviews',
	// 	component: ReviewsComponent
	// },
	// {
	// 	path: 'leadList',
	// 	component: DbLeadListComponent
	// },
	// {
	// 	path: 'addInvestor',
	// 	component: DbAddInvestorComponent
	// },
	// {
	// 	path: 'welcomeLetter',
	// 	component: DbWelcomeLetterComponent
	// },
	// {
	// 	path: 'brokerAppointment',
	// 	component: DbBrokerAppointmentComponent
	// },
	// {
	// 	path: 'clientsList',
	// 	component: DbClientListComponent
	// },
	{
		path: 'officerLogin',
		component: ComplianceOfficerLoginComponent
	},
	{
		path: 'officerForgot',
		component: ComplianceOfficerForgotComponent
	},
	// {
	// 	path: 'brokersList',
	// 	component: DbBrokerListComponent
	// },
	// {
	// 	path: 'brokerDetails',
	// 	component: DbBrokerDetailComponent
	// },
	// {
	// 	path: 'clientProfile',
	// 	component: DbClientProfileComponent
	// },
	// {
	// 	path: 'dbBrokerClientProfile',
	// 	component: DbBrokerClientProfileComponent
	// },
	// {
	// 	path: 'dbInstructions',
	// 	component: DbInstructionsComponent
	// },
	{
		path: 'user',
		canActivate: [UserGuard],
		children: [
		            {
		                path: 'dashboard',
		                component: DashboardComponent,
		            },
		            {
		            	path: 'dbClients',
		            	component: DbInvestmentsComponent
		            },
		            {
		            	path: 'reviews',
		            	component: ReviewsComponent
		            },
		            {
		            	path: 'addLead',
		            	component: AddLeadListComponent
		            },
		            {
		            	path: 'leadList',
		            	component: DbLeadListComponent
		            },
		            {
		            	path: 'client_documents/:id',
		            	component: DbDocumentsComponent
		            },
		            {
		            	path: 'addClient',
		            	component: DbAddInvestorComponent
		            },
		            {
		            	path: 'welcomeLetter',
		            	component: DbWelcomeLetterComponent
		            },
		            {
		            	path: 'brokerAppointment',
		            	component: DbBrokerAppointmentComponent
		            },
		            {
		            	path: 'clientsList',
		            	component: DbClientListComponent
		            },


		            {
		            	path: 'clientProfile',
		            	component: DbClientProfileComponent
		            },
		            {
		            	path: 'edit-profile/:id',
		            	component: DbEditClientComponent
		            },
								{
		            	path: 'clientProfile/:client_id',
		            	component: DbClientProfileComponent
		            },

		            {
		            	path: 'dbInstructions',
		            	component: DbInstructionsComponent
		            },
		            {
		            	path: 'dbTasks',
		            	component: DbTasksComponent
		            },
		            {
		            	path: 'dbAddId',
		            	component: DbAddIdComponent
		            },
		            {
		            	path: 'dbAddDisclosure',
		            	component: DbAddDisclosureComponent
		            },
		            {
		            	path: 'dbAddRecordAdvice',
		            	component: DbAddRecordAdviceComponent
		            },
		            {
		            	path: 'dbAddRiskProfiler',
		            	component: DbAddRiskProfilerComponent
		            },






		]
		// component: DbInstructionsComponent
	},
	{
		path: 'officer',
		canActivate: [OfficerGuard],
		children: [


		            {
		            	path: 'brokersList',
		            	component: DbBrokerListComponent
		            },
		            {
		            	path: 'brokerDetails',
		            	component: DbBrokerDetailComponent
		            },

		            {
		            	path: 'dbBrokerClientProfile',
		            	component: DbBrokerClientProfileComponent
		            },
		            {
		            	path: 'dbClients',
		            	component: ComplianceOfficerInvestmentsComponent
		            },


		             {
		            	path: 'dbTasks',
		            	component: ComplianceOfficerTasksComponent
		            },




		]
		// component: DbInstructionsComponent
	},




];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
