import { TestBed } from '@angular/core/testing';

import { ShowChatCardService } from './show-chat-card.service';

describe('ShowChatCardService', () => {
  let service: ShowChatCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowChatCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
