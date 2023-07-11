import { useEffect, useState } from "react";

interface Param {
  id: number;
  name: string;
  type: "string";
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}

interface ParamInputProps {
  paramValue: ParamValue;
  param: Param;
  onChange: (id: number, value: string) => void;
}

function ParamInput({ paramValue, param, onChange }: ParamInputProps) {
  const [value, setValue] = useState<string>(
    paramValue?.value ? paramValue.value : ""
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  useEffect(() => {
    onChange(param.id, value);
  }, [value, param.id]);

  return (
    <div
      style={{
        width: "300px",
        display: "flex",
        justifyContent: "space-between",
        margin: "10px 0",
      }}
    >
      <label
        htmlFor={param.id.toString()}
        style={{ width: "50%", textAlign: "center" }}
      >
        {param.name}
      </label>
      <input
        id={param.id.toString()}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

function App({ params, model }: Props) {
  const [modelState, setModelState] = useState<Model>(model);

  function getModel(): Model {
    return modelState;
  }

  function getParamValue(id: number): ParamValue | undefined {
    return modelState.paramValues.find((v) => v.paramId === id);
  }

  function changeParamValue(id: number, newValue: string): void {
    const newModel: Model = { ...modelState };
    if (modelState.paramValues.find((elem) => elem.paramId === id)) {
      newModel.paramValues = newModel.paramValues.map((paramValue) => {
        if (paramValue.paramId === id) {
          paramValue.value = newValue;
        }
        return paramValue;
      });
    } else {
      newModel.paramValues.push({ paramId: id, value: newValue });
    }

    setModelState(newModel);
  }

  useEffect(() => {
    console.log(getModel());
  }, [modelState]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {params.map((param) => {
        return (
          <ParamInput
            key={param.id}
            param={param}
            paramValue={getParamValue(param.id) as ParamValue}
            onChange={changeParamValue}
          />
        );
      })}
    </div>
  );
}

export default App;
