import styled from "styled-components"

const ThemeSwitch = ({ setDarkMode }) => {
  return (
    <SwitchLabel>
      <CheckBoxInput type="checkbox" onClick={() => setDarkMode(p => !p)} />
      <SliderSpan></SliderSpan>
    </SwitchLabel>
  )
}

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 62px;
  height: 23px;
  background-color: #414141; 
  border-radius: 23px;
`

const SliderSpan = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: "black";
  transition: 0.2s;
  border-radius: 23px;
  &:before {
    position: absolute;
    content: "";
    height: 17px;
    width: 17px;
    left: 4px;
    bottom: 3px;
    background-color: #ffffff;
    transition: 0.2s;
    border-radius: 50%;
  }
`

const CheckBoxInput = styled.input`
  background-color: ${p => p.theme.BTN.blue};
  opacity: 1;
  width: 0;
  height: 0;
  &:checked + ${SliderSpan}:before {
    transform: translateX(38px);
  }
  &:checked + ${SliderSpan} {
    background-color: ${p => p.theme.BTN.blue};
  }
`

export default ThemeSwitch