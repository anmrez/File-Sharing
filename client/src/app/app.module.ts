import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache } from '@apollo/client/core'
import { MatTableModule } from '@angular/material/table'  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileComponent } from './components/file/file.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { DownloadButtonComponent } from './components/download-button/download-button.component';
import { UpdateButtonComponent } from './components/update-button/update-button.component';
import { InfinityIconComponent } from './components/infinity-icon/infinity-icon.component';
import { DescriptionFileComponent } from './components/description-file/description-file.component';
import { AlertComponent } from './components/alert/alert.component';
import { environment } from 'src/environments/environment';
import { UploadComponent } from './components/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    FileComponent,
    DeleteButtonComponent,
    UpdateButtonComponent,
    DownloadButtonComponent,
    InfinityIconComponent,
    DescriptionFileComponent,
    AlertComponent,
    UploadComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    MatTableModule,
  ],
  providers: [
    
    {
      provide: APOLLO_OPTIONS,
      useFactory( httpLink: HttpLink ) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.ipServer + '/graphql',
          }),
        }
      },
      deps: [ HttpLink ]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
