import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule, GridModule, TableModule, UtilitiesModule,  ButtonModule, ModalModule, PopoverModule, TooltipModule  } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../icons/icon-subset';

import { DocsComponentsModule } from '../../../components';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let iconSetService: IconSetService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [ModalModule, NoopAnimationsModule, GridModule, CardModule, PopoverModule, ButtonModule, DocsComponentsModule, RouterTestingModule, TooltipModule,GridModule, CardModule, TableModule, GridModule, UtilitiesModule, DocsComponentsModule, RouterTestingModule],
      providers: [IconSetService]
    }).compileComponents();;
  beforeEach(() => {   
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});