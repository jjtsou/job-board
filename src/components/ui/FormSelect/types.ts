export interface Option {
	slug: string;
	label_el: string;
	label_en: string;
}

export interface FormSelectProps {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	allOptionLabel: string;
	options: Option[];
	ariaLabel?: string;
}
