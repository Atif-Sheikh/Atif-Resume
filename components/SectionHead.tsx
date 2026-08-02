import type { ReactNode } from 'react';

type Props = {
    no: string;
    label: string;
    children: ReactNode;
};

export default function SectionHead({ no, label, children }: Props) {
    return (
        <div className="section-head" data-reveal>
            <span className="section-no" aria-hidden="true">
                {no}
            </span>
            <div>
                <p className="section-label">// {label}</p>
                <h2 className="section-title">{children}</h2>
            </div>
        </div>
    );
}
