import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_) {
        return { hasError: true };
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return <div>Error Mode</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
