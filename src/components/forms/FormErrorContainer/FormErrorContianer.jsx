import React from "react";

export const FormErrorContainer = ({ setErrors, serverErrors, children }) => {
  React.useEffect(() => {
    setErrors(serverErrors);
  }, [serverErrors]);

  return children;
};