import { ButtonHTMLAttributes, ReactElement } from 'react';

import './Button.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactElement | string
    className?: string
}
export function Button(props: Props) {
    const {children, className, ...otherProps} = props;
    return <button className={`button ${className}`} {...otherProps}>{props.children}</button>
}