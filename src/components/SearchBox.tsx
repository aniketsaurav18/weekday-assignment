import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchBox({ options, setSelectedOption, label }: any) {
  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
      defaultValue={"All"}
      onChange={(_event, value) => {
        setSelectedOption(value);
      }}
      sx={{ width: 300 }}
    />
  );
}
