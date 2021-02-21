import * as React from "react";

interface FloatingLabelIProps {
	id?: string,
	labelId?: string,
	inputId?: string,
	onChange?: (event: React.FormEvent<HTMLInputElement>) => void,
	onChangeDelay?: number,
	className?: string,
	labelClassName?: string,
	inputClassName?: string,
	type?: string,
	label?: string,
	style?: React.CSSProperties,
	labelStyle?: React.CSSProperties,
	inputStyle?: React.CSSProperties,
	loadingCog?: boolean,
	loadingCogSpinning?: boolean,
	loadingCogSize?: number,
	loadingCogStyle?: React.CSSProperties
}
interface FloatingLabelIState {
	isActive: boolean,
	text: string,
	id: string,
	labelId: string,
	inputId: string,
	queuedChangeTimeout: number | undefined
}

interface LoadingCogIProps{
	style?: React.CSSProperties,
	size?: number,
	rotating?: boolean
}

interface LoadingCogIState{
	rotateInterval?: number,
	id: string
}

declare module 'react-bootstrap-floating-label' {
	export default class FloatingLabel extends React.Component<FloatingLabelIProps, FloatingLabelIState>{
		public constructor(props: FloatingLabelIProps);
		public handleTextChange(event: React.FormEvent<HTMLInputElement>, force?: boolean): void;
	}
	export class LoadingCog extends React.Component<LoadingCogIProps, LoadingCogIState>{
		public constructor(props: LoadingCogIProps);
		public triggerRotate(): void;
	}
}
