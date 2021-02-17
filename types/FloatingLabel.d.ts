import * as React from "react";

interface IProps {
	id?: string,
	labelId?: string,
	inputId?: string,
	onChange?: (event: React.FormEvent<HTMLInputElement>) => void,
	className?: string,
	labelClassName?: string,
	inputClassName?: string,
	type?: string,
	label?: string,
	style?: React.CSSProperties,
	labelStyle?: React.CSSProperties,
	inputStyle?: React.CSSProperties,
}
interface IState {
	isActive: boolean,
	text: string,
	id: string,
	labelId: string,
	inputId: string,
}

export declare class FloatingLabel extends React.Component<IProps, IState>{
	public constructor(props: IProps);
	public handleTextChange(event: React.FormEvent<HTMLInputElement>): void;
}