import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ThumbSliderComponent } from './thumb-slider/thumb-slider.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { InstaImagesComponent } from './insta-images/insta-images.component';
import { ColorCubeComponent } from './color-cube/color-cube.component';

@NgModule({
  declarations: [ ProductListComponent, ThumbSliderComponent, ProductCardComponent, InstaImagesComponent, ColorCubeComponent ],
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    TooltipModule.forRoot(),
  ],
  exports: [ ProductListComponent, ThumbSliderComponent, ProductCardComponent, InstaImagesComponent, ColorCubeComponent ]
})
export class ComponentModule { }
