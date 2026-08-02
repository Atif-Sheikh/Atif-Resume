type Props = {
    name: string;
    className?: string;
};

/** Pulls a symbol out of the inline sprite rendered once in the root layout. */
export default function Icon({ name, className }: Props) {
    return (
        <svg className={className ? `ico ${className}` : 'ico'} aria-hidden="true">
            <use href={`#${name}`} />
        </svg>
    );
}
