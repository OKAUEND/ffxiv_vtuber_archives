import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TestComponent from '../component/jest/jest_test';

it('TEST', () => {
    const { container } = render(<TestComponent />);
    expect(container.innerHTML).toMatch('Test');
});
