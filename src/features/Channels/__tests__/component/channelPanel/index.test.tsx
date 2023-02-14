import { describe, expect, test, vi } from 'vitest';
import { ChannelPanel } from '@/src/features/Channels/component/ChannelPanel';
import { HikasenVtuberResourceFactory } from '@/src/features/Channels/mock';
import { render, screen } from '@testing-library/react';

describe('ChannelPanel Component TEST', () => {
    const MockData = HikasenVtuberResourceFactory('Mock');
    test('DataがPropsで渡された場合、表示されているか', () => {
        const mockFn = vi.fn();
        render(<ChannelPanel channels={[MockData]} onhandler={mockFn} />);

        expect(screen.getByText('Mock')).toBeInTheDocument();
    });
});
