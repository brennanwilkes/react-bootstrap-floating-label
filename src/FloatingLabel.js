// Brennan Wilkes

// Imports
import React from "react";
import PropTypes from "prop-types";

import "./FloatingLabel.css";
import LoadingCog from "./LoadingCog.js";

/**
	A floating label input component.
	Cleanly transitions an input placeholder to a upper left floated label
	@class
	@extends React.Component
*/
class FloatingLabel extends React.Component {
	/**
		Initializes state and binds methods
		@param {any[]} props
		@constructor
	*/
	constructor(props) {
		super(props);
		this.handleTextChange = this.handleTextChange.bind(this);

		const ID =
			this.props.id ?? `floating-label${parseInt(Math.random() * 1000)}`;

		this.state = {
			isActive: !!this.props.initialValue,
			text: this.props.initialValue ?? "",
			id: ID,
			labelId: this.props.labelId ?? `${ID}-label`,
			inputId: this.props.inputId ?? `${ID}-input`,
			queuedChangeTimeout: undefined,
			cogId: `${ID}-cog`,
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.initialValue !== prevProps.initialValue) {
			this.setState({
				text: this.props.initialValue,
				isActive: !!this.props.initialValue,
			});
		}
	}

	/**
		Event callback for input changes.
		Updates state to comply with React standard
		controlled input elements
		@param {object} event
		@param {boolean} force
	*/
	handleTextChange(event, force = false) {
		this.setState({
			isActive: event.target.value !== "",
			text: event.target.value,
		});

		if (this.props.onChange) {
			if (this.props.onChangeDelay) {
				if (this.state.queuedChangeTimeout) {
					clearTimeout(this.state.queuedChangeTimeout);
				}

				if (force) {
					this.props.onChange(event);
				} else {
					const timeoutId = setTimeout(() => {
						this.props.onChange(event);
						this.setState({ queuedChangeTimeout: undefined });
					}, this.props.onChangeDelay);
					this.setState({ queuedChangeTimeout: timeoutId });
				}
			} else {
				this.props.onChange(event);
			}
		}
	}

	/**
		Renders a form input with all the required callback and id information
		nested within a div, and sibling to a label
	*/
	render() {
		const propDefault = {
			className: this.props.className ?? "",
			labelClassName: this.props.labelClassName ?? "",
			inputClassName: this.props.inputClassName ?? "",
			type: this.props.type ?? "text",
			label: this.props.label ?? "Floating Label",
			style: this.props.style ?? {},
			labelStyle: this.props.labelStyle ?? {},
			inputStyle: this.props.inputStyle ?? {},
		};

		return (
			<>
				<div
					className={`floating-label ${propDefault.className}`}
					id={this.state.id}
					style={propDefault.style}
				>
					<input
						className={propDefault.inputClassName}
						id={this.state.inputId}
						type={propDefault.type}
						value={this.state.text}
						onChange={this.handleTextChange}
						onBlur={(event) => {
							if (this.props.onBlur) {
								this.props.onBlur(event);
							}
						}}
						onFocus={(event) => {
							if (this.props.onFocus) {
								this.props.onFocus(event);
							}
						}}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								this.handleTextChange(event, true);
							}
						}}
						style={propDefault.inputStyle}
					/>

					<label
						id={this.state.labelId}
						className={`${propDefault.labelClassName}${
							this.state.isActive ? " floating-label-active" : ""
						}`}
						style={propDefault.labelStyle}
					>
						{propDefault.label}
					</label>
					{this.props.loadingCog ? (
						<LoadingCog
							id={this.state.cogId}
							rotating={this.props.loadingCogSpinning ?? false}
							size={this.props.loadingCogSize ?? 30}
							style={this.props.loadingCogStyle ?? {}}
						/>
					) : (
						<></>
					)}
				</div>
			</>
		);
	}
}

/**
 * Props may contain a classname, id, and style for the wrapper, input, and label.
 * They may also contain a callback method, label text, and input type.
 */
FloatingLabel.propTypes = {
	id: PropTypes.string,
	labelId: PropTypes.string,
	inputId: PropTypes.string,
	className: PropTypes.string,
	labelClassName: PropTypes.string,
	inputClassName: PropTypes.string,
	type: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	onChangeDelay: PropTypes.number,
	label: PropTypes.string,
	style: PropTypes.object,
	labelStyle: PropTypes.object,
	inputStyle: PropTypes.object,
	loadingCog: PropTypes.bool,
	loadingCogSpinning: PropTypes.bool,
	loadingCogSize: PropTypes.number,
	loadingCogStyle: PropTypes.object,
	initialValue: PropTypes.string,
};

export default FloatingLabel;
