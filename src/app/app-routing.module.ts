import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckSessionGuard } from './guards/check-session.guard';


//importar componentes
import { LoginComponent } from "./components/login/login.component";
import { ErrorComponent } from './components/error/error.component';
import { TestComponent } from './components/test/test.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
///manera extraña de autenticar la app mediante firebase
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, loggedIn } from '@angular/fire/compat/auth-guard';
import { TableroComponent } from './components/tablero/tablero.component';

const adminOnly = () => loggedIn;
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['items']);
//const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const routes: Routes = [
    { 
        path: '', 
        pathMatch: 'full', 
        redirectTo:'dashboard'
    },{ 
        path: 'login', 
        component: LoginComponent 
    },{ 
        path: 'dashboard', 
        component: DashboardComponent, 
        canActivate: [CheckSessionGuard],
        children: [
            {
                path: '', 
                pathMatch: 'full', 
                redirectTo: 'inicio'
            },{
                path: 'inicio',
                component: TableroComponent
            }
        ]
    },{ 
        path: 'test', 
        component: TestComponent
    },{ 
        path: '**', 
        component: ErrorComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
