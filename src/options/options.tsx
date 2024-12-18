import React, { use, useEffect, useState } from "react";
import "fontsource-roboto";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@material-ui/core";
import { createRoot } from "react-dom/client";
import "./options.css";
import {
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from "../utils/storage";

type FormStae = "saving" | "ready";

function App() {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormStae>("ready");

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleHomeCityChange = (homeCity: string) => {
    console.log(homeCity);
    setOptions({ ...options, homeCity });
  };

  const handleSaveButtonClick = () => {
    setFormState("saving");
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState("ready");
      }, 1000);
    });
  };

  if (!options) {
    return null;
  }

  const isFieldDisabled = formState === "saving";

  return (
    <Box mx={"10%"} my={"2%"}>
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extension Option</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home City Name</Typography>
              <TextField
                fullWidth
                placeholder="Enter a home city"
                value={options.homeCity}
                onChange={(event) => handleHomeCityChange(event.target.value)}
                disabled={isFieldDisabled}
              />
            </Grid>
            <Grid item>
              <button
                style={{
                  backgroundColor: !isFieldDisabled ? "#e2434b" : "#ccc",
                  marginBottom: "20px",
                  padding: "10px",
                  color: "white",
                  borderRadius: "5px",
                  width: "100px",
                }}
                onClick={handleSaveButtonClick}
              >
                {formState === "saving" ? "Saving..." : "Save"}
              </button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

const root = document.createElement("div");
document.body.appendChild(root);

const rootElement = createRoot(root);
rootElement.render(<App />);

export default App;
