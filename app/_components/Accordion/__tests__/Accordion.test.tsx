import { describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';

import { Accordion } from '../Accordion';

describe('Accordion Component TEST', () => {
  const TestComponent = () => <div>Component TEST</div>;
  test('ボタンにPropsのTitleの要素が表示されているか', async () => {
    render(
      <RecoilRoot>
        <Accordion title="Accordion Button">
          <TestComponent />
        </Accordion>
      </RecoilRoot>
    );

    const ButtonTEXT = await screen.getByText('Accordion Button');
    expect(ButtonTEXT.textContent).toEqual('Accordion Button');
  });
  test('子のComponentは表示できているか', async () => {
    render(
      <RecoilRoot>
        <Accordion title="Accordion Button">
          <TestComponent />
        </Accordion>
      </RecoilRoot>
    );

    const ChildTEXT = await screen.getByText('Component TEST');
    expect(ChildTEXT.textContent).toEqual('Component TEST');
  });
});
