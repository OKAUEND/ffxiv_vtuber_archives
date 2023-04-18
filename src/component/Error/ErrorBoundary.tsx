import { Children, Component, ErrorInfo, ReactNode } from 'react';
import { Error } from '@/src/type';

interface Props {
    children: ReactNode;
    fallback: (status: number) => ReactNode;
}

interface State {
    hasError: boolean;
    status: number;
}

const defaultState: State = {
    hasError: false,
    status: 200,
};

/**
 * ErrorBoundary
 * @param Props
 * @param State
 * @returns ReactNode
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = defaultState;
    }

    static getDerivedStateFromError(error: Error) {
        //エラーステータスとともにセットすることで、エラーステータスで処理を分けれるようにする
        return { hasError: true, status: error.status };
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            //エラーステータスをフォールバックのコンポーネントへ渡すようにし、拡張性を持たせる
            return this.props.fallback(this.state.status);
        }

        return this.props.children;
    }
}

/**
 * ErrorBoundaryをステータスでレンダリング内容を分岐させる
 * @param status
 * @returns
 */
const ErrorBoundaryFallBack = (status: number) => {
    return <div></div>;
};

interface ExtendedProps {
    children: ReactNode;
}

/**
 * ErrorBoundaryをステータス毎にエラー画面を表示できるようにした機能拡張版
 * @param ExtendedProps
 * @returns
 */
export const ErrorBoundaryExtended = ({ children }: ExtendedProps) => {
    return (
        <ErrorBoundary fallback={ErrorBoundaryFallBack}>
            {children}
        </ErrorBoundary>
    );
};
