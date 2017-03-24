import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrgsComponent} from './components/orgs.component';

const appRoutes: Routes = [
    {
        path: '',
        component: OrgsComponent
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);