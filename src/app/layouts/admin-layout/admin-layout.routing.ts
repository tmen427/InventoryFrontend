import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';

import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ItemComponent } from 'app/items/item/item.component';
import { BarcodesComponent } from 'app/barcodes/barcodes.component';
import { ItemsPostingComponent } from 'app/items-posting/items-posting.component';
import { ItemTabsComponent } from 'app/item-tabs/item-tabs.component';
import { ItemsSearchComponent } from 'app/items-search/items-search.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
  
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'items', component: ItemComponent},
    { path: 'posting', component: ItemsPostingComponent}, 
    {path : 'barcodes', component: BarcodesComponent}, 
    {path: 'itemtabs', component: ItemTabsComponent},
     {path: 'itemssearch', component: ItemsSearchComponent}
];
