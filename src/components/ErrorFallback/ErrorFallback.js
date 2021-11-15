import React from "react";

import { Alert, Typography, Box } from "@mui/material";

const ErrorFallback = ({error, resetErrorBoundary}) => {

  return (
    
    <div role="alert" >
      <Typography variant="h6">Ouch! Something went wrong:</Typography>
      <Box sx={{mb:3}} />
      <Alert severity="error">{error.message}</Alert>
      <Box sx={{mb:3}} />
    </div>
  )
}

export default ErrorFallback;