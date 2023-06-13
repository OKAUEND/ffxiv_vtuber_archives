import { vi, describe, test } from 'vitest';

import { getChannel } from '@/channels/_lib/api/getChannel';
import { createFetchMock, createFetchOffsetMock } from '@/_mock/fetch';
import { createHikasenVtuberData } from '@/channels/__tests__/_mock';
