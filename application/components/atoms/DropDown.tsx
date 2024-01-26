import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { defaultTheme } from 'react-select';
const { colors } = defaultTheme;

const DropDown = ({ label, listitems, required, className, onChange, isSearchable, isDisabled, isMulti, selected, selectedlabel }:any) => {

  const [open, setOpen] = useState(false);

  const [is_selected, setSelected] = useState(selected);

  const [is_selectedlabel, setSelectedLabel] = useState(selectedlabel);

  const [selectedOption, setSelectedOption] = useState(selected ? { label: selectedlabel, value: selected } : null);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const is_isSearchable =
    isSearchable !== undefined
      ? isSearchable
      : true;

  const is_isDisabled =
    isDisabled !== undefined
      ? isDisabled
      : false;

  const is_isMulti =
    isMulti !== undefined
      ? isMulti
      : false;

  const options = listitems.map((item:any, index:number) => {
    return {
      label: item.name,
      value: item.id,
      key: index
    }
  });

  const style = {
    control: (base:any, state:any) => ({
      ...base,
      minHeight: 50,
      width: '100%',
      maxWidth: '100%',
			minWidth: '256px',
      marginBottom: 10,
			background: `rgb(79,79,79)`,
			color: '#eaeaea',
			fontFamily: 'Avenir',
			boxShadow: 'none',
			borderWidth: 2,
			borderColor: state.isFocused ? "#000" : "transparent",
			"&:hover": {
				// Overwrittes the different states of border
				borderColor: state.isFocused ? "#000" : "transparent"
			}
    }),placeholder: (defaultStyles: any) => {
        return {
            ...defaultStyles,
            color: '#eaeaea',
        }
    },
		option: (provided:any, state:any) => ({
				...provided,
				fontFamily: 'Avenir',
				backgroundColor: state.isSelected ? "rgb(79,79,79)" : "",
				"&:hover": {
					backgroundColor: 'rgb(79,79,79)',
					color: '#fff'
				}
		}),
		singleValue: (provided:any) => ({
    ...provided,
    color: '#eaeaea'
  })
};

  const Blanket = (props:any) => (
    <div
      className="blanket-wrapper"
      {...props}
    />
  );

  const DropdownIndicator = () => (
    <div style={{ color: colors.neutral20, height: 24, width: 32 }}>
      <Svg>
        <path
          d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </Svg>
    </div>
  );

  const Svg = (p:any) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      focusable="false"
      role="presentation"
      {...p}
    />
  );

  useEffect(() => {
    if (is_selected !== selected || is_selectedlabel !== selectedlabel) {
      setSelected(selected);
      setSelectedLabel(selectedlabel);
      setSelectedOption({ label: selectedlabel, value: selected });
      setOpen(false);
    }
  }, [is_selected, is_selectedlabel]);

  return (
    <React.Fragment>
      {!isMulti ? (
        <div className={`${selectedOption && !label ? 'no-label wrapper-select isSelected' : selectedOption ? 'wrapper-select isSelected' : 'wrapper-select'} ${open && 'isOpen'} ${is_isDisabled && 'isDisabled'} ${!is_isSearchable && 'searchFalse'}`}>
          <label
            onClick={toggleOpen}
            className="label-wrapper-select">
            <div className="btn-wrapper">{selectedOption ? selectedOption.label : label}</div>
            {label && <span className="label-text">{label} {required && <em className="req">*</em>} </span>}
            <i className='icon-right material-icons'>{is_isDisabled ? 'lock' : 'keyboard_arrow_down'}</i>
          </label>
          {open && !is_isDisabled && (
            <Select
              autoFocus
              backspaceRemovesValue={false}
              className={className}
              components={{ DropdownIndicator, IndicatorSeparator: null }}
              value={selectedOption}
              onChange={onChange}
              options={options}
              // promptTextCreator={false}
              placeholder='search'
              styles={style}
              controlShouldRenderValue={is_isMulti ? true : false}
              hideSelectedOptions={false}
              isClearable={false}
              isSearchable={is_isSearchable}
              isDisabled={is_isDisabled}
              isMulti={is_isMulti}
              menuIsOpen
            />
          )}
          {open && !is_isDisabled ? <Blanket onClick={toggleOpen} /> : null}
        </div>
      ) : (
        <label className={`${is_isDisabled && "isDisabled"} wrapper-select select-multi`}>
          <Select
            autoFocus={is_isDisabled ? false : true}
            components={{ IndicatorSeparator: null }}
            backspaceRemovesValue={false}
            className={className}
            value={selected}
            onChange={onChange}
            options={options}
            // promptTextCreator={false}
            placeholder={label ? label : 'Search'}
            styles={style}
            controlShouldRenderValue={is_isMulti ? true : false}
            hideSelectedOptions={false}
            isClearable={false}
            isSearchable={true}
            isMulti={is_isMulti}
          />
        </label>
      )}
    </React.Fragment>
  );
};

export default DropDown;