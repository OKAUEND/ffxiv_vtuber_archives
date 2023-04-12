import { describe, expect, test, vi } from 'vitest';
import { ChannelPanel } from '@/src/features/Channels/component/ChannelPanel';
import { HikasenVtuberResourceFactory } from '@/src/features/Channels/mock';
import { fireEvent, render, screen } from '@testing-library/react';

describe('ChannelPanel Component TEST', () => {
    const MockData = HikasenVtuberResourceFactory('Mock');
    test('DataがPropsで渡された場合、表示されているか', () => {
        const mockFn = vi.fn();
        render(<ChannelPanel channels={[MockData]} onhandler={mockFn} />);

        expect(screen.getByText('Mock')).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
    });
    test('buttonをクリックした時に、イベントを親へ伝えれているか', () => {
        const mockFn = vi.fn();
        render(<ChannelPanel channels={[MockData]} onhandler={mockFn} />);

        expect(mockFn.mock.calls.length).toBe(0);

        const button = screen.getAllByRole('button');
        fireEvent.click(button[0]);

        expect(mockFn.mock.calls.length).toBe(1);

        fireEvent.click(button[1]);

        expect(mockFn.mock.calls.length).toBe(2);
    });
    test('引数を正しく受け取れているか', () => {
        const mockFn = vi.fn((selectedId: string) => selectedId);
        render(<ChannelPanel channels={[MockData]} onhandler={mockFn} />);

        expect(mockFn.mock.calls.length).toBe(0);

        const button = screen.getAllByRole('button');
        fireEvent.click(button[0]);

        expect(mockFn.mock.calls.length).toBe(1);

        expect(mockFn.mock.results[0].value).toEqual('Mock');
    });
});
